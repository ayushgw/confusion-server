const express = require('express');
const Promo = require('../models/promo')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { cors, corsWithOptions } = require('../middleware/cors')

const router = new express.Router();

router.route('/promos')

    .options(corsWithOptions, (req, res) => res.status(200).send())
    .get(cors, async (req, res) => {
        try {
            const promos = await Promo.find({})
            res.send(promos);
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(corsWithOptions, auth, admin, async (req, res) => {
        const promo = new Promo(req.body)
        try {
            await promo.save()
            res.status(201).send(promo)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .patch(corsWithOptions, (req, res) => {
        res.status(405).send();
    })

    .delete(corsWithOptions, auth, admin, async (req, res) => {
        try {
            await Promo.deleteMany()
            res.send('Removed all the promos!')
        } catch (e) {
            res.status(500).send(e)
        }
    });

router.route('/promos/:id')

    .options(corsWithOptions, (req, res) => res.status(200).send())
    .get(cors, async (req, res) => {
        try {
            const promo = await Promo.findById(req.params.id)

            if (!promo) {
                throw new Error()
            }

            res.send(promo)
        } catch (e) {
            res.status(404).send()
        }
    })

    .post(corsWithOptions, (req, res) => {
        res.status(405).send()
    })

    .patch(corsWithOptions, auth, admin, async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'description', 'image', 'label', 'price']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid promo fields!' })
        }

        try {
            const promo = await Promo.findById(req.params.id)

            if (!promo) {
                return res.status(404).send()
            }

            updates.forEach(update => promo[update] = req.body[update])
            await promo.save()

            res.send(promo)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .delete(corsWithOptions, auth, admin, async (req, res) => {
        try {
            const promo = await Promo.findById(req.params.id)

            if (!promo) {
                res.status(404).send()
            }

            await promo.remove()
            res.send(promo)
        } catch (e) {
            res.status(500).send(e)
        }
    });


module.exports = router;