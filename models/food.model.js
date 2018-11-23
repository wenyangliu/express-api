const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const userSchema = new mongoose.Schema({
    name: {type: String},
    price: {type: Number}
})

const model = mongoose.model('foods', userSchema)

module.exports = model