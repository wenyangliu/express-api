const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String}
})

const model = mongoose.model('users', userSchema)

module.exports = model