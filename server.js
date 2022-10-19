require('dotenv').config()
//DEPENDENCIES
const express = require('express')

//CONFIGURATION
const PORT = process.env.PORT
const app = express()

//ROUTES
app.get(`/`, (req, res) => {
    res.send(`Welcome to an Awesome Application about bread!`)
})

//LISTEN
app.listen(PORT, () => {
    console.log(`listing on port`, PORT);
})