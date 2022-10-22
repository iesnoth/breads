require('dotenv').config()
//DEPENDENCIES
const express = require('express')

//CONFIGURATION
const PORT = process.env.PORT
const app = express()

//MIDDLEWARE
app.set(`views`, __dirname + `/views`)
app.set(`view engine`, `jsx`)
app.engine(`jsx`, require(`express-react-views`).createEngine())
app.use(express.static('public'))

//ROUTES
app.get(`/`, (req, res) => {
    res.send(`Welcome to an Awesome Application about bread!`)
})

//Breads
const breadsController = require(`./controllers/breads_controller.js`)
app.use(`/breads`, breadsController)

//404 Page
app.get(`*`, (req,res) => {
    res.send(`404`)
})

//LISTEN
app.listen(PORT, () => {
    console.log(`listing on port`, PORT);
})