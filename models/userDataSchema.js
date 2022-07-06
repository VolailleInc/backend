const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

/*
bcrypt  is a secure encryption package you can install with  npm.
mongoose-unique-validator  is a package that improves error 
messages when validating unique data .
*/

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
