const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async(req,res, next) => {
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
            return res.status(400).send('Invalid token.')
        }

        req.user = user
        req.token = auth
        next()
    } catch(e) {
        res.status(403).send({error: 'Please login.'})
    }   
}

module.exports = auth
