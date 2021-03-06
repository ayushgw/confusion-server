const mongoose = require('mongoose')
require('mongoose-currency').loadType(mongoose)
const Currency = mongoose.Types.Currency
const Comment = require('../models/comment')
const Favourite = require('../models/favourite')

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// Delete associated comments when dish is removed
dishSchema.pre('remove', async function(next) {
    const dish = this

    await Comment.deleteMany({ dish_id: dish._id })
    await Favourite.deleteMany({ dish: dish._id })

    next()
})

const Dish = mongoose.model('Dish', dishSchema)

module.exports = Dish