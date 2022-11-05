const express = require('express')
const baker = express.Router()
const Baker = require(`../models/baker.js`)
const bakerSeedData = require(`../models/baker_seed.js`)

//baker seeding
baker.get(`/data/seed/`, (req, res) => {
    Baker.insertMany(bakerSeedData)
        .then(
            res.redirect(`/breads`)
        )
})

//baker index
baker.get('/', (req, res) => {
    Baker.find()
        .populate('breads')
        .then(foundBakers => {
            res.send(foundBakers)
        })
})

//show page
baker.get('/:id', (req, res) => {
    Baker.findById(req.params.id)
        .populate('breads')
        .then(foundBaker => {
            res.render('bakerShow', {
                baker: foundBaker
            })
        })
})

//DELETE bakers
baker.delete(`/:id`,(req,res)=>{
    Baker.findByIdAndDelete(req.params.id)
    .then(deletedBaker =>{
        res.status(303).redirect(`/breads`)
    })
})


module.exports = baker