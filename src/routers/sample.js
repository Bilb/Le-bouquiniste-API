const express = require('express')
const Sample = require('../models/sample')
const auth = require('../middleware/auth')

const router = new express.Router()


router.get('/users/samples', auth, async (req,res) => {
    try {
        const samples = await Sample.find({possesor: req.user._id})
        res.send(samples)
    }
    catch (e) {
        console.log(e)
        res.status(400).send()
    }
})

router.post('/users/samples', auth, async (req,res) => {
    try {
        const sample = new Sample(req.body)

        sample.possesor = req.user._id
        await sample.save()
        res.send(sample)
    }
    catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})



module.exports = router