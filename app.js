//import path from 'path'
const path = require('path')
//import express from 'express'
const express = require('express')
//import bodyParser from 'body-parser'
const bodyParser = require('body-parser')
//import mongoose from 'mongoose'
const mongoose = require('mongoose')
//import productsRouter from './routes/thingRoute'
const productsRouter = require('./routes/thingRoute')
//import userAuthRoute from './routes/userAuthRoute'
const userAuthRoute = require('./routes/userAuthRoute')

const app = express()

// Connection to our atlass database
mongoose
  .connect(
    'mongodb+srv://strivecode:JFUTJGcCeKpAoO6v@cluster0.5seq3.mongodb.net/?retryWrites=true&w=majority',
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
