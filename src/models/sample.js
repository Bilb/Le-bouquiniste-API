const mongoose = require('mongoose')

const sampleSchema = mongoose.Schema({
    possesor: {
        type:mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    book: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'Book',
        required: true
    },
    // state of the sample (good condition, bad condition)
    state: {
        type:String,
        trim:true
    },
    comments: {
        type:String,
        trim:true
    }
})



const Sample = mongoose.model('Sample', sampleSchema)

module.exports = Sample