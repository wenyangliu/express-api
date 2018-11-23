const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const userSchema = new mongoose.Schema({
    username: String,
    email: String
})

const model = mongoose.model('user', userSchema)

module.exports = model