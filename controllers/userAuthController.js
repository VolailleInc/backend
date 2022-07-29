const bcrypt = require('bcrypt')
//import bcrypt from 'bcrypt'
const User = require('../models/userDataSchema')
//import { User } from '../models/userDataSchema'
const jwt = require('jsonwebtoken')
//import jwt from 'jsonwebtoken'

//Signup authentication
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    })
    user
      .save()
      .then(() => {
        res.status(201).json({
          message: 'User successfully signup.',
        })
      })
      .catch((error) => {
        res.status(500).json({
          error,
        })
      })
  })
}
//Login Authentication
exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: new Error('User not found'),
        })
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: new Error('Incorrect password'),
            })
          }
          const token = jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
            expiresIn: '24h',
          })
          res.status(200).json({
            userId: user._id,
            token: token,
          })
        })
        .catch((error) => {
          res.status(500).json({
            error: error,
          })
        })
    })
    .catch((error) => {
      res.status(500).json({
        error,
      })
    })
}
