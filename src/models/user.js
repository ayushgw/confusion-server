const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetch = require('node-fetch')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowersace: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error('Invalid email!')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes("password") && value.length == 8) {
                throw Error('Please choose a different password!')
            }
        }
    },
    age: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw Error('Age must be a positive number!')
            }
        }
    },
    loginMethod: {
        type: String,
        default: 'password',
        required: true
    },
    facebookId: String,
    facebookToken: String,
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    admin: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true,
        strict: true
    })

// Remove sensitve data
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.admin
    delete userObject.facebookId
    delete userObject.facebookToken

    return userObject
}

// Generate Auth token using JWT
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    user.save()

    return token
}

// To verify login password
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login!')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login!')
    }

    return user
}

// To verify fb login
userSchema.statics.isFBVerified = async (facebookId, facebookToken) => {

    // Ensure valid user
    const fb = await fetch(`https://graph.facebook.com/v4.0/me?access_token=${facebookToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
    const fbObject = await fb.json()

    if (fbObject.id !== facebookId) {
        // Invalid User // Impersonating another user
        return false
    }

    return true
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

// Delete associated comments when user is removed
userSchema.pre('remove', async function (next) {
    const user = this

    await Comment.deleteMany({ author: user._id })

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User