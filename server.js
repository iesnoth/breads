//DEPENDENCIES
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

//CONFIGURATION
const PORT = process.env.PORT
const app = express()
const methodOverride = require('method-override')

//MIDDLEWARE
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `jsx`)
app.engine(`jsx`, require(`express-react-views`).createEngine())
app.use(express.static('public'))
//changes string into an object?
app.use(express.urlencoded({extended: true}))
//override
app.use(methodOverride(`_method`))

//ROUTES
app.get(`/`, (req, res) => {
    res.send(`Welcome to an Awesome Application about bread!`)
})

//Breads
const breadsController = require(`./controllers/breads_controller.js`)
app.use(`/breads`, breadsController)

//404 Page
app.get(`*`, (req,res) => {
    res.status(404).render(`page404`)
})


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, 
    () => { console.log('connected to mongo: ', process.env.MONGO_URI) }
  ) 
//LISTEN
app.listen(PORT, () => {
    console.log(`listing on port`, PORT);
})