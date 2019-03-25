const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const formidable = require('formidable'),
    fs = require('fs'),
    gm = require('gm')
    TITLE = 'formidable上传示例',
    AVATAR_UPLOAD_FOLDER = '/avatar/',
    domain = "http://localhost:3000";

// 登录
router.post('/login', function (req, res, next) {
    const username = req.body.username, password = req.body.password;
    console.log(req.body)
    UserModel.findOne({username}, function (err, user) {
        if (err) return res.send(err)

        if (!user) return res.status(401).send({msg: "未找到此人"})
        // 缺少密码比对
        let isMatch = true
        if (password !== user.password) isMatch = false
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
            return res.status(401).send({
                success: false,
                msg: '密码错误'
            })
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







router.post('/upload', function (req, res, next) {
    const form = new formidable.IncomingForm()
    form.encoding = 'utf-8';        //设置编辑
    form.uploadDir = 'public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
    form.keepExtensions = true;     //保留后缀
    form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

    form.parse(req, function (err, fields, files) {
        console.log('=========err============', err)
        console.log('=========fields============', fields)
        console.log('=========files============', files)
        if (err) {
            res.locals.error = err;
            res.render('index', { title: TITLE });
            return;
        }
        let extNameMap = {
            'image/jpeg': 'jpg',
            'image/png': 'png'
        }
        console.log('=========type=======', files.file.type)
        const avatarName = Math.random() + '.' + extNameMap[files.file.type];
        //图片写入地址；
        const newPath = form.uploadDir + avatarName;
        //显示地址；
        const showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        // console.log("=====newPath=========",newPath);
        // fs.renameSync(files.file.path, newPath);  //重命名
        gm(files.file.path)
            .resize(240, 240)
            .noProfile()
            .write(newPath, function (err) {
                if (err) console.log('==============gmError=========', err)
                if (!err) console.log('done');
            });

        res.json({
            "newPath": showUrl
        });
    })
})


module.exports = router;
