const jwt = require('jsonwebtoken')
//import jwt from 'jsonwebtoken'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split('')[1]
    const decodeToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodeToken.userId
    /*The code below adds authorization object to the
    authenticated(decoded) userId to become available in the 
    rest of the middlewares. this object can be used to enforce
    intergrity of user operations*/
    req.authorization = { userId }
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID'
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({
      error: new Error('Invalid request'),
    })
  }
}
