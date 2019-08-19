var express = require('express');
const Dish = require('../models/dish')
const Promo = require('../models/promo')
const Leader = require('../models/leader')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const { cors, corsWithOptions } = require('../middleware/cors')

var router = new express.Router();

/* ADMIN OPERATIONS */
router.route('/')

  .options(corsWithOptions, (req, res) => res.status(200).send())

  .get(cors, (req, res) => {
    const ops = ['/addDishes', '/addLeaders', '/addPromos']
    res.render('index', {
      title: 'ConFusion Node.js Server',
      operations: ops
    })
  })


// Bulk Insertion Routes
router.route('/addDishes')

  .options(corsWithOptions, (req, res) => res.status(200).send())

  .post(corsWithOptions, auth, admin, async (req, res) => {
    try {
      await Dish.collection.insertMany(req.body)
      res.status(201).send('Success!')
    } catch (e) {
      res.status(400).send(e)
    }
  });


router.route('/addPromos')

  .options(corsWithOptions, (req, res) => res.status(200).send())

  .post(corsWithOptions, auth, admin, async (req, res) => {
    try {
      await Promo.collection.insertMany(req.body)
      res.status(201).send('Success!')
    } catch (e) {
      res.status(400).send(e)
    }
  });

  
router.route('/addLeaders')

  .options(corsWithOptions, (req, res) => res.status(200).send())

  .post(corsWithOptions, auth, admin, async (req, res) => {
    try {
      await Leader.collection.insertMany(req.body)
      res.status(201).send('Success!')
    } catch (e) {
      res.status(400).send(e)
    }
  });

module.exports = router;
