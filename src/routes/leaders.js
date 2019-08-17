const express = require('express');
const Leader = require('../models/leader')
const auth = require('../middleware/auth')

const router = new express.Router();

router.route('/leaders')

    .get(async (req, res) => {
        try {
            const leaders = await Leader.find({})
            res.send(leaders);
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(auth, async (req, res) => {
        const leader = new Leader(req.body)
        try {
            await leader.save()
            res.status(201).send(leader)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .patch((req, res) => {
        res.status(405).send();
    })

    .delete(auth, async (req, res) => {
        try {
            await Leader.deleteMany()
            res.send('Removed all the leaders!')
        } catch (e) {
            res.status(500).send(e)
        }
    });

router.route('/leaders/:id')

    .get(async (req, res) => {
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

    .post((req, res) => {
        res.status(405).send()
    })

    .patch(auth, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'description', 'image', 'designation', 'abbr']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid leader fields!' })
        }

        try {
            const leader = await Leader.findById(req.params.id)

            if(!leader) {
                return res.status(404).send()
            }

            updates.forEach(update => leader[update] = req.body[update])
            await leader.save()

            res.send(leader)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .delete(auth, async (req, res) => {
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