//import express from 'express'
const express = require('express')
const router = express.Router()

const authMidleware = require('../middleware/authMidleware')
//import authMidleware from '../middleware/authMidleware'
//import multer from '../middleware/multer-config'
const multer = require('../middleware/multer-config')
//import thingRoute from '../controllers/thingController'
const thingRoute = require('../controllers/thingController')

//This router finds more all thing in the Database
router.get('/', authMidleware, thingRoute.findAllThings)
router.post('/', authMidleware, multer, thingRoute.createThing)
//The router below finds a single item and
//send a response to the client side
router.get('/:id', authMidleware, thingRoute.findOneThing)
//Updatese a single items in the database
router.put('/:id', authMidleware, multer, thingRoute.updateOneThing)
//Midleware that deletes an item from the database
router.delete('/:id', authMidleware, thingRoute.deleteOneThing)

module.exports = router
