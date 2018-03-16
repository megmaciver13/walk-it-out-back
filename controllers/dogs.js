const express = require('express')
const router = express.Router()

const mongoose = require('../db/models/Dog')
const Dog = mongoose.model('Dog')

router.get('/', (req, res) => {
    Dog.find({})
        .then(dogs => res.json(dogs))
})

router.post('/', (req, res) => {
    Dog.create(req.body)
        .then(dog => res.json(dog))
})

router.get('/:id', (req, res) => {
    Dog.findOne({_id: req.params.id})
        .then(dog => res.json(dog))
})

router.delete('/:id', (req, res) => {
    Dog.findOneAndRemove({_id: req.params.id})
        .then(dog => res.json(dog))
})
router.put('/:id', (req, res) => {
    Dog.findOneAndUpdate({_id: req.params.id}, req.body)
        .then(dog => res.json(dog))
})

module.exports = router