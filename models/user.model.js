const mongoose = require('mongoose')
mongoose.Promise = global.Promise


const userSchema = new mongoose.Schema({
    username: {type: String},
    realname: {type: String},
    password: {type: String},
    phone: {type: String},
    avatar: {type: String},
    createdAt: {type: Date}, // 创建时间
    updatedAt: {type: Date} // 更新时间
})

const model = mongoose.model('users', userSchema)

module.exports = model