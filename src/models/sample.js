const mongoose = require('mongoose')

const sampleSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true,
        min:3,
        max:200
    },
    possesor: {
        type:mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }
})



const Sample = mongoose.model('Sample', sampleSchema)

module.exports = Sample