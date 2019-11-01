const mongoose = require('mongoose')
const ISBN = require('isbn-validate')

const bookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true,
        trim:true,
        validate(value) {
            if(!ISBN.Validate(value)) {
                throw new Error('Invalid isbn.')
            }
        }
    },
    author: {
        type:String,
        trim:true,
    },
    title: {
        type:String,
        trim:true
    }
})


const Book = mongoose.model('Book', bookSchema)


module.exports = Book