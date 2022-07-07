const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const productsRouter = require('./routes/thingRoute')
const userAuthRoute = require('./routes/userAuthRoute')

const app = express()

// Connection to our atlass database
mongoose
  .connect(
    'mongodb+srv://strivecode:@cluster0.5seq3.mongodb.net/?retryWrites=true&w=majority',
  )
  .then(() => {
    console.log('Successfully connected to mongoDB Atlas')
  })
  .catch((error) => {
    console.log('Unable to connect to the database')
    console.error(error)
  })

/*
  This will allow requests from all origins to 
  access your API
  */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization',
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,DELETE,PATCH,OPTIONS',
  )
})

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/stuff', productsRouter)
app.use('/api/auth', userAuthRoute)
module.exports = app
