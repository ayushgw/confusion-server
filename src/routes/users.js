const express = require('express')
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
  const isAuthPresent = req.body.password || (req.body.facebookId && req.body.facebookToken)

  if (!isAuthPresent) {
    return res.status(400).send({ error: 'No authetication provided! Either use password or sign in using facebook.' })
  }

  try {
    let user;

    if (req.body.password) {
      const { email, password } = req.body

      // findByCredentials defined on userSchema
      user = await User.findByCredentials(email, password)
    }

    else {
      const { facebookId, facebookToken } = req.body

      const verified = await User.isFBVerified(facebookId, facebookToken)
      if (!verified) {
        throw new Error({ error: 'Your IP address has been blacklisted!' })
      }

      // Check if user already registered
      user = await User.findOne({ facebookId })

      if (!user) {
        // Create new user
        user = new User({
          ...req.body,
          admin: false,
          loginMethod: 'facebook'
        })

        // Save user
        await user.save()
      }
    }

    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
    
  } catch (e) {
    console.log(e);
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
