const mongoose = require('mongoose')
const Comment = require('../../src/models/comment')

const commentOneId = new mongoose.Types.ObjectId()
const commentOne = {
    _id: commentOneId,
    rating: 4,
    comment: "Demo comment!",
}

const setupComments = async () => {
    await Comment.deleteMany()
    await new Comment(commentOne).save()
}

module.exports = {
    commentOneId,
    setupComments
}