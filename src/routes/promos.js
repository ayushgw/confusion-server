const express = require('express');
const Promo = require('../models/promo')

const router = new express.Router();

router.route('/promos')

    .get(async (req, res) => {
        try {
            const dishes = await Promo.find({})
            res.send(dishes);
        } catch (e) {
            res.status(500).send(e)
        }
    })

    .post(async (req, res) => {
        const dish = new Promo(req.body)
        try {
            await dish.save()
            res.status(201).send(dish)
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
            res.send('Removed all the dishes!')
        } catch (e) {
            res.status(500).send(e)
        }
    });

router.route('/promos/:id')

    .get(async (req, res) => {
        try {
            const dish = await Promo.findById(req.params.id)

            if (!dish) {
                throw new Error()
            }

            res.send(dish)
        } catch (e) {
            res.status(404).send()
        }
    })

    .post((req, res) => {
        res.status(405).send()
    })

    .patch(async (req, res) => {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['name', 'description', 'image', 'category', 'label', 'price', 'featured']
        const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

        if (!isValidUpdate) {
            res.status(400).send({ error: 'Invalid dish fields!' })
        }

        try {
            const dish = await Promo.findById(req.params.id)
            updates.forEach(update => dish[update] = req.body[update])
            await dish.save()

            res.send(dish)
        } catch (e) {
            res.status(400).send(e)
        }
    })

    .delete(async (req, res) => {
        try {
            const dish = await Promo.findById(req.params.id)

            if (!dish) {
                res.status(404).send()
            }

            await dish.remove()
            res.send(dish)
        } catch (e) {
            res.status(500).send(e)
        }
    });


module.exports = router;