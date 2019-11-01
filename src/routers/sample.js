const express = require('express')
const Sample = require('../models/sample')
const auth = require('../middleware/auth')

const router = new express.Router()


router.get('/users/samples', auth, async (req,res) => {
    try {
        var match = {}
        if(req.query.title) {
            match.title = req.query.title
        }
        await req.user.populate({
            path: 'samples',
            match,
            options: {
                limit : parseInt(req.query.limit),
                skip: parseInt(req.query.skip)
            }
        }).execPopulate()

        res.send(req.user.samples)
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

router.get('/users/samples/:id', auth, async(req, res) => {
    try {
        const sample = await Sample.findOne({_id:req.params.id, possesor:req.user._id})
        if(!sample) {
            return res.status(404).send()
        }
        res.send(sample)
    } catch(e) {
        console.log(e)
        res.status(400).send()
    }
})



module.exports = router