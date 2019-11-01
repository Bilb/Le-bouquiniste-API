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


const bookOneId = new mongoose.Types.ObjectId()
const bookOne = {
    _id: bookOneId,
    title: 'My first book title',
    author: 'My first author',
    ISBN: '2844661084'
}

const bookTwoId = new mongoose.Types.ObjectId()
const bookTwo = {
    _id: bookTwoId,
    title: 'My second book title',
    author: 'My second author',
    ISBN: '2844661084'
}


const sampleOneId = new mongoose.Types.ObjectId()
const sampleOne = {
    _id: sampleOneId, 
    possesor: userOneId,
    book: bookOneId
}

const sampleTwoId = new mongoose.Types.ObjectId()
const sampleTwo = {
    _id: sampleTwoId, 
    possesor: userOneId,
    book: bookOneId
}

const sampleThreeId = new mongoose.Types.ObjectId()
const sampleThree = {
    _id: sampleThreeId, 
    possesor: userOneId,
    book: bookTwoId
}

const sampleFourId = new mongoose.Types.ObjectId()
const sampleFour = {
    _id: sampleFourId, 
    possesor: userOneId,
    book: bookTwoId
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
    bookOne,
    bookTwo,
    setupDatabase
}