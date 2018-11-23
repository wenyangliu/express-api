var express = require('express');
var router = express.Router();
const UserModel = require('../models/user.model')

/* GET users listing. */
router.get('/', function(req, res, next) {
    UserModel.find().exec(function(err, questions) {
        res.json(questions)
    })
})

//
// router.post('/', function(req, res, next) {
//     UserModel.create({username: '刘祥', password: '123'})
//     res.send('respond with a resource');
// })

module.exports = router;
