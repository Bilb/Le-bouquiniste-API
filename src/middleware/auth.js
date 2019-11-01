const User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = async(req,res, next) => {
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
}

module.exports = auth
