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
        required: true
    },
    author: {
        type: String,
        required: true
    },
    dish_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Dish'
    }
}, {
        timestamps: true
    })

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment