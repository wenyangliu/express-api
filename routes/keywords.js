var express = require('express');
var router = express.Router();
const KeywordsModel = require('../models/keywords.model')

// 列表
router.get('/', function(req, res, next) {
    console.log(req.user)
    KeywordsModel.find().exec(function(err, foods) {
        res.json(foods)
    })
})

// 创建
router.post('/', function(req, res, next) {
    console.log(req.body)
    KeywordsModel.create(req.body, function (err, result) {
        if (err) console.log(err)
        res.json(result)
    })
})

// 详情
router.get('/:id', function(req, res, next) {
    KeywordsModel.findById(req.params.id, function (err, result) {
        if (err) console.log(err)
        res.json(result)
    })
})

// 修改
router.patch('/:id', function(req, res, next) {
    KeywordsModel.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, result) {
        if (err) console.log(err)
        res.json(result)
    })
})

// 删除
router.delete('/:id', function(req, res, next) {
    KeywordsModel.findByIdAndRemove(req.params.id, function (err, result) {
        if (err) console.log(err)
        res.json(result)
    })
})


module.exports = router;
