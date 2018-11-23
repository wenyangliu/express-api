const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

// 登录
router.post('/login', function (req, res, next) {
    const username = req.body.username, password = req.body.password;
    console.log(req.body)
    UserModel.findOne({username}, function (err, user) {
        if (err) return res.send(err)

        if (!user) return res.status(401).send({msg: "未找到此人"})
        // 缺少密码比对
        let isMatch = true
        if (isMatch) {
            const content = {username} // 要生成token的主题信息
            const secretOrPrivateKey = "wenyang";
            const token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 24  // 24小时过期
            })
            res.json({
                success: true,
                access_token: token,
                user: user
            })
        } else {
            return res.status(401).send("密码错误")
        }
    })
})


// 注册
router.post('/register', function (req, res, next) {
    const username = req.body.username, password = req.body.password;
    console.log(req.body)
    UserModel.findOne({username}, function (err, user) {
        if (err) return res.send(err)
        if (user) return res.status(403).send({msg: "已注册"})
        UserModel.create(req.body, function (err, user) {
            res.json({
                success: true,
                msg: '注册成功'
            })
        })
    })
})


module.exports = router;
