const express = require('express');
const Promo = require('../models/promo')

const router = new express.Router();

router.route('/promos')

    .get(async (req, res) => {
        try {
            const promos = await Promo.find({})
            res.send(promos);
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(async (req, res) => {
        const promo = new Promo(req.body)
        try {
            await promo.save()
            res.status(201).send(promo)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .patch((req, res) => {
        res.status(405).send();
    })

    .delete(async (req, res) => {
        try {
            await Promo.deleteMany()
            res.send('Removed all the promos!')
        } catch (e) {
            res.status(500).send(e)
        }
    });

router.route('/promos/:id')

    .get(async (req, res) => {
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

    .post((req, res) => {
        res.status(405).send()
    })

    .patch(async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'description', 'image', 'label', 'price']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            return res.status(400).send({ error: 'Invalid promo fields!' })
        }

        try {
            const promo = await Promo.findById(req.params.id)
            updates.forEach(update => promo[update] = req.body[update])
            await promo.save()

            res.send(promo)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .delete(async (req, res) => {
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