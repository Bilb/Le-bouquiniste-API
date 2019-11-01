const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')


router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const existing = await User.findOne({email: user.email})
        if(existing) {
            throw new Error('A user already exists with this email')
        }
        const token = await user.generateAuthToken()
        await user.save()
        return res.status(201).send({user, token})
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.getByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        return res.status(200).send({user, token})
    }
    catch (e) {
        return res.status(400).send({error: "Failed to authenticate"})
    }
})

router.get('/users/me', auth, async (req,res) => {
    try {
        res.send(req.user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router