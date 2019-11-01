const mongoose = require('mongoose')
const User = require('../../src/models/user')
const jwt = require('jsonwebtoken')

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
}

const userOneId = new mongoose.Types.ObjectId()
const userOne = new User({
    _id: userOneId,
    name: 'Audric1 Ackermann1',
    email: 'audric1@example.org',
    password:'Azerty1234',
    tokens: [
        { token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET) }
    ]
})

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Audric2 Ackermann2',
    email: 'audric2@example.org',
    password:'Azerty1234567'
}


module.exports = {
    userOne,
    userTwo,
    userOneId,
    userTwoId,
    setupDatabase
}