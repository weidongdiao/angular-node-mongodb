'use strict';

var express = require('express');
var routes = require('./app/routes/routes.js');
// var mongo = require('mongodb').MongoClient;
var mongoose = require('mongoose')
var db = mongoose.connect('mongodb://localhost:27017/words');

require('./models/word_model');

var app = express();

// mongoose.connect('mongodb://localhost:27017/words',function(err,db) {
//     if(err) {
//         throw new Error('Database failed to connect!');
//     } else {
//         console.log('MongoDB successfully connected on port 27017.');
//     }
//
//
// });

// 使用html渲染模版
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html');

app.set('views', process.cwd() + '/views');

app.use('/views', express.static(process.cwd() + '/views'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
routes(app,db);
app.listen(3000, function() {
    console.log('Listening on port 3000...');
});