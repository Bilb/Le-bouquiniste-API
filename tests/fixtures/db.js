const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Sample = require('../../src/models/sample')
const jwt = require('jsonwebtoken')

const setupDatabase = async () => {
    await User.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()

    await Sample.deleteMany()
    await new Sample(sampleOne).save()
    await new Sample(sampleTwo).save()
    await new Sample(sampleThree).save()
    await new Sample(sampleFour).save()

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
    password:'Azerty1234567',
    tokens: [
        { token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET) }
        
    ]
}

const sampleOneId = new mongoose.Types.ObjectId()
const sampleOne = {
    _id: sampleOneId, 
    title: 'My first sample title',
    possesor: userOneId
}

const sampleTwoId = new mongoose.Types.ObjectId()
const sampleTwo = {
    _id: sampleTwoId, 
    title: 'My second sample title',
    possesor: userOneId
}

const sampleThreeId = new mongoose.Types.ObjectId()
const sampleThree = {
    _id: sampleThreeId, 
    title: 'My Three sample title',
    possesor: userOneId
}

const sampleFourId = new mongoose.Types.ObjectId()
const sampleFour = {
    _id: sampleFourId, 
    title: 'My four sample title',
    possesor: userOneId
}


module.exports = {
    userOne,
    userTwo,
    userOneId,
    userTwoId,
    sampleOne,
    sampleTwo,
    sampleThree,
    sampleFour,
    setupDatabase
}