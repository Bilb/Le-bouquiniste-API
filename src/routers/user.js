const express = require('express')
const router = new express.Router()
const User = require('../models/user')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const existing = await User.findOne({email: user.email})
        if(existing) {
            throw new Error('A user already exists with this email')
        }
        const token = await User.generateAuthToken(user.userID)
        user.tokens.concat({token})
        await user.save()
        return res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.getByCredentials(req.body.email, req.body.password)
        const token = await User.generateAuthToken(user.userID)
        await user.addToken(token)
        return res.status(200).send({user, token})
    }
    catch (e) {
        return res.status(400).send(e)
    }
})

router.get('/users/me', async (req,res) => {
    try {
        if(!req.headers || !req.headers.authorization) {
            throw new Error('These credentials are not valid')
        }
        var auth = req.headers.authorization
        if(!auth.startsWith('Bearer ')) {
            throw new Error('These credentials are not valid')
        }
        auth = auth.replace('Bearer ', '')
        const user = await User.getUserByToken(auth)
        if(!user) {
            throw new Error('These credentials are not valid')
        }
        res.send(user)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


module.exports = router