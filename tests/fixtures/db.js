const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: "Barry Allen",
    email: "barry@example.com",
    password: "barry@123",
    age: 35,
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const superUserId = new mongoose.Types.ObjectId()
const superUser = {
    _id: superUserId,
    name: "Super User",
    email: "super@example.com",
    password: "super@123",
    age: 999,
    superuser: true,
    tokens: [{
        token: jwt.sign({ _id: superUserId }, process.env.JWT_SECRET)
    }]
}

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(superUser).save()
}

module.exports = {
    userOneId,
    userOne,
    superUserId,
    superUser,
    setupDatabase
}