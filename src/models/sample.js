const mongoose = require('mongoose')
const ISBN = require('isbn-validate')

mongoose.Schema = {
    title: {
        type:String,
        required: true,
        trim: true,
        validate(value) {
            if(!ISBN.validate(value)) {
                throw new Error('Invalid ISBN.')
            }
        }
    },
    possesor: {
        type:Schema.Types.ObjectID,
        ref: 'User'
    }
}