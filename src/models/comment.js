const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    rating: {
        type: Number,
        max: 5,
        min: 0,
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }
}, {
        timestamps: true
    })

// Remove data
commentSchema.methods.toJSON = function () {
    const comment = this
    const commentObject = comment.toObject()

    delete commentObject.dish_id

    return commentObject
}

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment