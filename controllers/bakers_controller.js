const express = require('express')
const baker = express.Router()
const Baker = require(`../models/baker.js`)
const bakerSeedData = require(`../models/baker_seed.js`)

//baker seeding
baker.get(`/data/seed/`, async (req, res) => {
    await Baker.insertMany(bakerSeedData)
    res.redirect(`/breads`)
})

//baker index
baker.get('/', async (req, res) => {
    const foundBakers = await Baker.find()
        .populate('breads')
    res.send(foundBakers)
})

//show page
baker.get('/:id', async (req, res) => {
    const foundBaker = await Baker.findById(req.params.id)
        .populate('breads')
    res.render('bakerShow', {
        baker: foundBaker
    })
})

//DELETE bakers
baker.delete(`/:id`, async (req, res) => {
    const deletedBaker = await Baker.findByIdAndDelete(req.params.id)
    res.status(303).redirect(`/breads`)
})


module.exports = baker