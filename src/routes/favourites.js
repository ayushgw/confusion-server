const express = require('express')
const auth = require('../middleware/auth')
const Dish = require('../models/dish')
const Favourite = require('../models/favourite')

const router = new express.Router()

router.get('/favourites', auth, async (req, res) => {
    try {
        await req.user.populate('favourites').execPopulate()
        
        const favourites = await Favourite.populateFavouritesArray(req.user.favourites)

        res.send(favourites)
    } catch (e) {
        console.log(e);
    }
})

router.post('/favourites/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // Check if valid dish id
        const isValidId = await Dish.findById(_id)

        if (!isValidId) {
            throw new Error()
        }

        // Check if favourite already added
        const isAlreadyAdded = await Favourite.findOne({ user: req.user._id, dish: _id })

        if (isAlreadyAdded) {
            return res.send({ success: false, message: 'Favourite already added!' })
        }

        // Add favourite
        const favourite = new Favourite({ user: req.user._id, dish: _id })
        await favourite.save()

        res.status(201).send({ success: true, message: 'Favourite added!' })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

router.delete('/favourites/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const favourite = await Favourite.findOne({ user: req.user._id, dish: _id })
        await favourite.remove()

        res.status(200).send({ success: true, message: 'Favourite removed!' })
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})

module.exports = router