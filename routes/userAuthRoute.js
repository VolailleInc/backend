//import express from 'express'
const express = require('express')
//import userAuth from '../controllers/userAuthController'
const userAuth = require('../controllers/userAuthController')
const router = express.Router()

router.post('/signup', userAuth.signup)
router.post('/login', userAuth.login)

module.exports = router
