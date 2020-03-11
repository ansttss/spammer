let express = require('express');
let router = express.Router();
let User = require('../models/user');

let nodemailer = require('nodemailer').createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        clientId: '773320748944-mro3okvavk7uj2qd85cooiv54c92qgku.apps.googleusercontent.com',
        clientSecret: 'fYJmGH3ztjV8H76aabzSU7DA',
        refreshToken: '1//040TuQWkuSiZeCgYIARAAGAQSNwF-L9IrQD5Caf5kDnsWqFYplvpMhio1pqY26wycFetjbkv7PsAPz5bYuLKhgej8uubLEqFqBks',
        accessToken: 'ya29.Il_AB1MYD5VSKzg7mvqqYbH_IL35ntRLtORlz7wDBAT-ASptdMwrnyxasERG_ShqBiKkpa-h6IU_9WT9CoE4cMG9Wjjs3Dt0Erz51jy_XXZBSFZ4hzDcG0PhkOjqbxMFuA'
    }
});

/* GET home page. */
router.get('/', function (req, res, _next) {
    User.find().exec(function (err, data) {
        if (err)
            return callback(err);
        return res.render('index', {title: 'User dashboard', data: data});
    });
});

router.post('/sendMails', function (req, res) {
    User.find().exec(function (err, data) {
        if (err)
            return callback(err);
        data.forEach(function (item) {
            const mailOptions = {
                from: 'posvystak1977@gmail.com',
                to: item['email'],
                subject: 'Hello from Nastya 3rd lab',
                text: req.body.msg
            };

            nodemailer.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

        })
    });

    res.redirect('/')
});

module.exports = router;
