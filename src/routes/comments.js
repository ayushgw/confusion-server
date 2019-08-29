const express = require('express')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
const { cors, corsWithOptions } = require('../middleware/cors')

const router = new express.Router()

router.route('/dishes/:dish_id/comments')

    .options(corsWithOptions, (req, res) => res.status(200).send())
    .get(cors, async (req, res) => {
        try {
            const comments = await Comment.find({ dish_id: req.params.dish_id }).populate('author', 'name')
            res.send(comments)
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(corsWithOptions, auth, async (req, res) => {
        const comment = new Comment({
            ...req.body,
            dish_id: req.params.dish_id,
            author: req.user._id
        })

        try {
            await comment.save()
            const retComment = await Comment.findById(comment._id).populate('author', 'name')
            res.status(201).send(retComment)
        } catch (e) {
            res.status(400).send(e)
        }
    })

router.route('/comments/:comment_id')

    .options(corsWithOptions, (req, res) => res.status(200).send())
    .patch(corsWithOptions, auth, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['rating', 'comment']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid update fields!' })
        }

        try {
            const comment = await Comment.findOne({ _id: req.params.comment_id, author: req.user._id }).populate('author', 'name')

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

    .delete(corsWithOptions, auth, async (req, res) => {
        try {
            const comment = await Comment.findOne({ _id: req.params.comment_id, author: req.user._id }).populate('author', 'name')

            if (!comment) {
                return res.status(404).send()
            }

            await comment.remove()
            res.send(comment)
        } catch (e) {
            res.status(500).send(e)
        }
    })


module.exports = router