var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var cors = require("cors")
var cor = cors();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
app.use(cor);
app.use(express.static(path.join(__dirname, "../public")));

var user = require('../model/user.js');

app.post('/api/user', urlencodedParser, jsonParser, function (req, res) {
    var useremail = req.body.useremail;
    var userpassword = req.body.userpassword;
    var username = req.body.username;

    user.addUsers(useremail, userpassword, username, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' record ditambahkan');
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    })
})
/* end routing POST register */

app.post('/login/user', urlencodedParser, jsonParser, function (req, res) {
    var useremail = req.body.useremail;
    var userpassword = req.body.userpassword;

    user.login(useremail, userpassword, function (err, result) {
        if (!err) {
            console.log(result);
            res.send(result.affectedRows + ' logged in');
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    })
})
/* end routing POST login */

module.exports = app