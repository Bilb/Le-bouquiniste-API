const express = require('express')
require('./db/mongoose')
const user = require('./routers/user')
const sample = require('./routers/sample')


const app = express()
app.use(express.json())

app.use(user)
app.use(sample)



module.exports = app