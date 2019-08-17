const express = require('express')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')

const router = new express.Router()

router.route('/dishes/:dish_id/comments')

    .get(async (req, res) => {
        try {
            const comments = await Comment.find({ dish_id: req.params.dish_id }).populate('author', 'name')
            res.send(comments)
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(auth, async (req, res) => {
        const comment = new Comment({
            ...req.body,
            dish_id: req.params.dish_id,
            author: req.user._id
        })

        try {
            await comment.save()
            res.status(201).send(comment)
        } catch (e) {
            res.status(400).send(e)
        }
    })

router.route('/comments/:comment_id')

    .patch(auth, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['rating', 'comment']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid update fields!' })
        }

        try {
            const comment = await Comment.findOne({ _id: req.params.comment_id, author: req.user._id })

            if (!comment) {
                return res.status(404).send()
            }

            updates.forEach(update => comment[update] = req.body[update])

            await comment.save()
            res.send(comment)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .delete(auth, async (req, res) => {
        try {
            const comment = await Comment.findOne({ _id: req.params.comment_id, author: req.user._id })

            if(!comment) {
                res.status(404).send()
            }

            await comment.remove()
            res.send(comment)
        } catch (e) {
            res.status(500).send(e)
        }
    })


module.exports = router