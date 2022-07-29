const mongoose = require('mongoose')
//import mongoose from 'mongoose'

/*
Create a data schema that contains the fields for each  Thing, 
their type, and whether or not they are a required field.
Export that schema as a Mongoose model, making it available for 
your Express app. This model allows you to enforce your data structure 
and makes read and write operations to the database far simpler, as 
you will see in the next chapters. 
*/
const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
})

module.exports = mongoose.model('Thing', thingSchema)
