const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const UserModel = require('./models/user.model')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const foodsRouter = require('./routes/foods');
const keywordsRouter = require('./routes/keywords');
const alarmsRouter = require('./routes/alarms');
const apiRouter = require('./routes/api')

const app = express();

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true})
// mongoose.connect('mongodb://remotetest:abc123@119.29.33.237:27017/test', {useNewUrlParser: true})


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, PATCH, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// 验证token
// app.use(function (req, res, next) {
//     const url = req.originalUrl;
//     const secretOrPrivateKey = "wenyang";
//     const token = req.headers['authorization']
//     if (token) {
//         jwt.verify(token, secretOrPrivateKey, function (err, decode) {
//             if (err) {
//                 if (url.indexOf("/api") !== 0) {
//                     return res.status(401).send(err);
//
//                 } else {
//                     next();
//                 }
//             } else {
//                 req.decode = decode;
//                 const username = decode.username;
//                 UserModel.findOne({username: username}, function (err, user) {
//                     if (!err) {
//                         req.user = user;
//                         next();
//                     }
//                 });
//             }
//         });
//     } else {
//         if (url.indexOf("/api") !== 0) {
//             return res.status(401).send({msg: '无权限'});
//         }
//         next();
//     }
// });


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/foods', foodsRouter);
app.use('/keywords', keywordsRouter)
app.use('/alarms', alarmsRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
