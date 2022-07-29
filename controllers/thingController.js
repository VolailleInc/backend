//import fs from 'fs'
const fs = require('fs')
//import Thing from '../models/thing'
const Thing = require('../models/thing')

exports.createThing = (req, res, next) => {
  /* The front end add a file data as form-data as opposed to JSON. 
  The request body contains a  thing  string, which is simply a 
  stringified  thing  object. Therefore, you need to parse it using  JSON.parse()  
  to get a usable object. The below does that*/
  req.body.thing = JSON.parse(req.body.thing)
  /* We resolve the full url by extracting the file name segment 
  from req.file.filename. We use req.protocol to get first segment of 
  https in this case, we then add "://" and then use req.get('host')
  to resolve server host('localhost:3000'). Add "/images/" and the filename to complete your urL.
   */
  const url = req.protocol + '://' + req.get('host')
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.thing.title,
    description: req.body.thing.description,
    imageUrl: url + '/images/' + req.file.filename,
    price: req.body.thing.price,
    userId: req.body.thing.userId,
  })
  thing
    .save()
    .then(() => {
      res.status(201).json({
        message: 'Data saved successfully!',
      })
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

exports.findOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      res.status(200).json(thing)
    })
    .catch((error) => {
      res.status(404).json({ error })
    })
}

exports.updateOneThing = (req, res, next) => {
  /*
  First create a new instance of your  Thing  model with the 
  received  _id to prevent update problems when of your  Thing  
  in the database.
  */
  let thing = new Thing({ _id: req.params._id })
  if (req.file) {
    /* We resolve the full url by extracting the file name segment 
    from req.file.filename. We use req.protocol to get first segment of 
    https in this case, we then add "://" and then use req.get('host')
    to resolve server host('localhost:3000'). Add "/images/" and the filename to complete your urL.
     */
    const url = req.protocol + '://' + req.get('host')
    // capture the request body JSON
    req.body.thing = JSON.parse(req.body.thing)

    thing = {
      _id: req.params.id,
      title: req.body.thing.title,
      description: req.body.thing.description,
      imageUrl: url + '/images/' + req.file.filename,
      price: req.body.thing.price,
      userId: req.body.thing.userId,
    }
  } else {
    thing = {
      _id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      userId: req.body.userId,
    }
  }

  Thing.updateOne({ _id: req.params.id }, thing)
    .then(() => {
      res.status(201).json({
        message: 'Item updated sucessfully',
      })
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      })
    })
}

exports.deleteOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }).then((thing) => {
    const filename = thing.imageUrl.split('/images/')[1]
    fs.unlink('images/' + filename, () => {
      Thing.deleteOne({ _id: req.params.id })
        .then(() => {
          res.status(200).json({
            message: 'Item Deleted!',
          })
        })
        .catch((error) => {
          res.status(400).json({ error })
        })
    })
  })
}

exports.findAllThings = (req, res) => {
  Thing.find()
    .then((things) => {
      res.status(200).json(things)
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}
