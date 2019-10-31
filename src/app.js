const express = require('express')
require('./db/mongoose')
const user = require('./routers/user')


const app = express()
app.use(express.json())

app.use(user)



module.exports = app