var express = require('express');
const Dish = require('../models/dish')
const Promo = require('../models/promo')
const Leader = require('../models/leader')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')

var router = new express.Router();

/* ADMIN OPERATIONS */
router.get('/', auth, admin, (req, res) => {
  const ops = ['/addDishes', '/addLeaders', '/addPromos']
  res.render('index', {
    title: 'Admin apis reference',
    operations: ops
  })
})

// Bulk Insertion Routes
router.post('/addDishes', auth, admin, async (req, res) => {
  try {
    await Dish.collection.insertMany(req.body)
    res.status(201).send('Success!')
  } catch (e) {
    res.status(400).send(e)
  }
});

router.post('/addPromos', auth, admin, async (req, res) => {
  try {
    await Promo.collection.insertMany(req.body)
    res.status(201).send('Success!')
  } catch (e) {
    res.status(400).send(e)
  }
});

router.post('/addLeaders', auth, admin, async (req, res) => {
  try {
    await Leader.collection.insertMany(req.body)
    res.status(201).send('Success!')
  } catch (e) {
    res.status(400).send(e)
  }
});

module.exports = router;
