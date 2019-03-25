const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const alarmsSchema = new mongoose.Schema({
    tel: {type: String},
    email: {type: String}
})

const model = mongoose.model('alarms', alarmsSchema)

module.exports = model