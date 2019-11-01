const mongoose = require('mongoose')
const express = require('express')

const Book = require('../models/book')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/books', auth, async(req, res) => {
    try {
        const book = new Book(req.body)
        const existing = await Book.findOne({ISBN: book.ISBN})
        if(existing) {
            return res.status(500).send({error: 'This ISBN number is already registered. Please update the current one if needed'})
        }
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

router.get('/books', auth, async(req, res) => {
    try {
        const match = {}

        if(req.query.title) {
            match.title = req.query.title
        }

        if(req.query.author) {
            match.author = req.query.author
        }
        
        var query = Book.find(match)
        // not optimized for large data sets
        
        if(req.query.limit) {
            query = query.limit(parseInt(req.query.limit))
        }
        if(req.query.skip) {
            query = query.skip(parseInt(req.query.skip))
        }
        const books = await query
        res.send(books)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})


module.exports = router