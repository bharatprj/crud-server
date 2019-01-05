var express = require('express');
var bodyParser = require('body-parser');
// var mongo = require("mongoose");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//allowig cross origin, headers, Methods  
app.use(function (req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader('Access-Control-Allow-Methods', '*');
   res.setHeader('Access-Control-Allow-Headers', "*");
   res.setHeader('Access-Control-Allow-Credentials', true);
   next();
});

module.exports = app;