const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const keywordsSchema = new mongoose.Schema({
    keyword: {type: String},
    may_keyword: {type: String},
    no_keyword: {type: String},
    frequency: {type: Number}
})

const model = mongoose.model('keywords', keywordsSchema)

module.exports = model