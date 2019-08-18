const express = require('express');
const User = require('../models/user')
const auth = require('../middleware/auth')
const { corsWithOptions } = require('../middleware/cors')

const router = new express.Router();

router.post('/users', corsWithOptions, async (req, res) => {
  const user = new User({ 
    ...req.body,
    admin: false
  })

  try {
    await user.save()
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    console.log(e);
    res.status(400).send(e)
  }
})

router.post('/users/login', corsWithOptions, async (req, res) => {
  try {
    // findByCredentials defined on userSchema
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/logout', corsWithOptions, auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => req.token !== token)

    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send(e)
  }
})

router.get('/users/me', corsWithOptions, auth, async (req, res) => {
  res.send(req.user)
})


module.exports = router;
