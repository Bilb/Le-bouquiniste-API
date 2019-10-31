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
        await user.save()
        res.status(201).send(user)

    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.getByCredentials(req.body.email, req.body.password)
        return res.status(200).send(user)
    }
    catch (e) {
        return res.status(400).send(e)
    }
})


module.exports = router