const express = require('express')
const breads = express.Router()
const Bread = require(`../models/bread.js`)
const seeds = require('../models/seed.js')

//INDEX
breads.get(`/`, (req, res) => {
    Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                title: 'Index Page'
            })
        })
})

//NEW: getting the info
breads.get(`/new`, (req, res) => {
    res.render(`new`)
})

//CREATE: posting the got info
breads.post(`/`, (req, res) => {
    console.log(req.body)
    if (!req.body.image) {
        req.body.image = 'undefined'
    }
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
        .then(createdBread => { res.redirect('/breads') })
        .catch(err => {
            res.status(303).send(
                `I'm sorry, some of your information was invalid. Please read the instructions thoroughly and try again.`
            )
        })
})

//UPDATE - with info from EDIT
breads.put(`/:id`, (req, res) => {
    if (req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(updatedBread => {
            console.log(updatedBread)
            res.redirect(`/breads/${req.params.id}`)
        })
        .catch(err => {
            res.status(303).send(
                `I'm sorry, some of your information was invalid. Please read the instructions thoroughly and try again.`
            )
        })
})

//EDIT
breads.get(`/:id/edit`, (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            res.render(`edit`, {
                bread: foundBread
            })
        })

})

//SHOW
breads.get(`/:id`, (req, res) => {
    Bread.findById(req.params.id)
        .then(foundBread => {
            Bread.listBreadByBaker(foundBread.baker)
                .then(breadsByBaker => {
                    //breadsByBaker is now an array
                    //console.log(breadsByBaker)
                    res.render('show', {
                        bread: foundBread,
                        bakersBreads: breadsByBaker
                    })
                })
        })
        .catch(err => {
            console.log(err)
            res.status(404).render('page404')
        })
})

//DELETE
breads.delete(`/:id`, (req, res) => {
    Bread.findByIdAndDelete(req.params.id)
        .then(deletedBread => {
            console.log(deletedBread)
            res.status(303).redirect(`/breads`)
        })
})

//BONUS ROUTES
//creates seed data for testing
breads.get(`/data/seed/`, (req, res) => {
    Bread.insertMany(seeds)
        .then(createdBreads => {
            res.redirect(`/breads`)
        })
})

//show an index of only one baker's bread
// breads.get(`/:baker`,(req,res) => {
//     Bread.listBreadByBaker()
// })

module.exports = breads