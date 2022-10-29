const express = require('express')
const breads = express.Router()
const Bread = require(`../models/bread.js`)

//INDEX
breads.get(`/`, (req, res) => {
    Bread.find()
    .then(foundBreads => {
        res.render('index',{
            breads: foundBreads,
            title: 'Index Page'
        })
    })
})

//NEW: getting the info
breads.get(`/new`,(req,res) => {
    res.render(`new`)
})

//CREATE: posting the got info
breads.post(`/`,(req,res) => {
    console.log(req.body)
    if (!req.body.image) {
        req.body.image = 'undefined'
      }
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread.create(req.body)
    res.redirect('/breads')
})

//UPDATE - with info from EDIT
breads.put(`/:arrayIndex`,(req,res) => {
    if(req.body.hasGluten === 'on') {
        req.body.hasGluten = 'true'
    } else {
        req.body.hasGluten = 'false'
    }
    Bread[req.params.arrayIndex] = req.body
    res.redirect(`/breads/${req.params.arrayIndex}`)
})

//EDIT
breads.get(`/:indexArray/edit`,(req,res) => {
    res.render(`edit`,{
        bread: Bread[req.params.indexArray],
        index: req.params.indexArray
    })
})

//SHOW
breads.get(`/:arrayIndex`, (req, res) => {
    Bread.findById(req.params.arrayIndex)
    .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
    })
    .catch(err=>{
        res.status(404).render('page404')
    })
})

//DELETE
breads.delete(`/:indexArray`,(req,res) => {
    Bread.splice(req.params.indexArray,1)
    res.status(303).redirect(`/breads`)
})

module.exports = breads