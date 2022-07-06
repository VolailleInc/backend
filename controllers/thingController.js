const thing = require('../models/thing')
const Thing = require('../models/thing')

exports.createThing = (req, res, next) => {
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.ImageUrl,
    price: req.body.price,
    userId: req.body.userId,
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
  const thing = new Thing({
    _id: req.params.id,
    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId,
  })
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
    if (!thing) {
      return res.status(404).json({
        error: new Error('Thing does not exist'),
      })
    }
    /* We verify the userId of the delete request against the decoded
authorization objected created in authMidleware before we allow for 
deleting  */
    if (thing.userId !== req.authorization.userId) {
      return res.status(400).json({
        error: new Error('Unauthorized request'),
      })
    }
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
