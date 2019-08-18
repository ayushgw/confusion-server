const express = require('express');
const Leader = require('../models/leader')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { cors, corsWithOptions } = require('../middleware/cors')

const router = new express.Router();

router.route('/leaders')

    .options(corsWithOptions, (req, res) => res.status(200).send())
    .get(cors, async (req, res) => {
        try {
            const leaders = await Leader.find({})
            res.send(leaders);
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(corsWithOptions, auth, admin, async (req, res) => {
        const leader = new Leader(req.body)
        try {
            await leader.save()
            res.status(201).send(leader)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .patch(corsWithOptions, (req, res) => {
        res.status(405).send();
    })

    .delete(corsWithOptions, auth, admin, async (req, res) => {
        try {
            await Leader.deleteMany()
            res.send([])
        } catch (e) {
            res.status(500).send(e)
        }
    });

router.route('/leaders/:id')

    .options(corsWithOptions, (req, res) => res.status(200).send())
    .get(cors, async (req, res) => {
        try {
            const leader = await Leader.findById(req.params.id)

            if (!leader) {
                throw new Error()
            }

            res.send(leader)
        } catch (e) {
            res.status(404).send()
        }
    })

    .post(corsWithOptions, (req, res) => {
        res.status(405).send()
    })

    .patch(corsWithOptions, auth, admin, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'description', 'image', 'designation', 'abbr']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid leader fields!' })
        }

        try {
            const leader = await Leader.findById(req.params.id)

            if (!leader) {
                return res.status(404).send()
            }

            updates.forEach(update => leader[update] = req.body[update])
            await leader.save()

            res.send(leader)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .delete(corsWithOptions, auth, admin, async (req, res) => {
        try {
            const leader = await Leader.findById(req.params.id)

            if (!leader) {
                res.status(404).send()
            }

            await leader.remove()
            res.send(leader)
        } catch (e) {
            res.status(500).send(e)
        }
    });


module.exports = router;