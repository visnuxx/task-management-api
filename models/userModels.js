const mongoose = require('mongoose')

userSchema = mongoose.Schema({
    name: String,
    email: String,
    hashedPassword: String,
    role: String
})

const Users=mongoose.model('users',userSchema)

module.exports=Users