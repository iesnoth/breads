const express = require('express')
const breads = express.Router()
const Bread = require(`../models/bread.js`)
const Baker = require(`../models/baker.js`)
const seeds = require('../models/seed.js')

//INDEX
breads.get(`/`, async (req, res) => {
    const foundBakers = await Baker.find()
    const foundBreads = await Bread.find()
    res.render('index', {
        breads: foundBreads,
        bakers: foundBakers,
        title: 'Index Page'
    })
})

//NEW: getting the info
breads.get(`/new`, async (req, res) => {
    const foundBakers = await Baker.find()
    res.render(`new`, {
        bakers: foundBakers
    })
})

//CREATE: posting the got info
breads.post(`/`, async (req, res) => {
    console.log(req.body)
    if (!req.body.image) {
        req.body.image = 'undefined'
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    const createdBead = await Bread.create(req.body)
    try {
        res.redirect('/breads')
    }
    catch (err) {
        res.status(303).send(
            `I'm sorry, some of your information was invalid. Please read the instructions thoroughly and try again.`
        )
    }
})

//UPDATE - with info from EDIT
breads.put(`/:id`, async (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    const updatedBread = await Bread.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    try {
        console.log(updatedBread)
        res.redirect(`/breads/${req.params.id}`)
    }
    catch (err) {
        res.status(303).send(
            `I'm sorry, some of your information was invalid. Please read the instructions thoroughly and try again.`
        )
    }
})

//EDIT
breads.get(`/:id/edit`, async (req, res) => {
    const foundBakers = await Baker.find()
    const foundBread = await Bread.findById(req.params.id)
    res.render(`edit`, {
        bread: foundBread,
        bakers: foundBakers
    })
})

//SHOW
breads.get(`/:id`, async (req, res) => {
    const foundBread = await Bread.findById(req.params.id)
        .populate(`baker`)

    const breadsByBaker = await Bread.listBreadByBaker(foundBread.baker)
    try {
        res.render('show', {
            bread: foundBread,
            bakersBreads: breadsByBaker
        })
    }
    catch (err) {
        console.log(err)
        res.status(404).render('page404')
    }
})


//DELETE breads
breads.delete(`/:id`, async (req, res) => {
    const deletedBread = await Bread.findByIdAndDelete(req.params.id)
    console.log(deletedBread)
    res.status(303).redirect(`/breads`)
})

//BONUS ROUTES
//creates seed data for testing
breads.get(`/data/seed/`, async (req, res) => {
    const createdBreads = await Bread.insertMany(seeds)
    res.redirect(`/breads`)
})

//show an index of only one baker's bread
// breads.get(`/:baker`,(req,res) => {
//     Bread.listBreadByBaker()
// })

module.exports = breads