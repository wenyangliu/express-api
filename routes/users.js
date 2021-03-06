const express = require('express');
const router = express.Router();
const UserModel = require('../models/user.model')
const utils = require('../utils')

/* GET users listing. */
router.get('/', function(req, res, next) {
    UserModel.find({}, {password: 0}).exec(function(err, questions) {
        res.json(questions)
    })
})

// 创建
router.post('/', function(req, res, next) {
    const {username, phone, password} = req.body
    UserModel.findOne({$or: [{username}, {phone}]}).exec(function(err, user) {
        console.log(user)
        if (user) {
            res.status(403).send({err: '用户名或手机号已存在！'})
        }
        req.body.password = utils.hashPwd(password) // 密码加密
        UserModel.create(req.body, function (err, result) {
            if (err) console.log(err)
            res.json(result)
        })
    })
})

router.patch('/:id', function(req, res, next) {
    UserModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, result) {
        if (err) console.log(err)
        res.json(result)
    })
})

// 删除
router.delete('/:id', function(req, res, next) {
    UserModel.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) console.log(err)
        res.json(result)
    })
})

module.exports = router;
