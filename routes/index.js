let express = require('express');
let router = express.Router();
let User = require('../models/user');

let nodemailer = require('nodemailer').createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

/* GET home page. */
router.get('/', function (req, res, _next) {
    let errorMsg = req.query.error;

    User.find().exec(function (err, data) {
        if (err)
            return callback(err);
        return res.render('index', {title: 'User dashboard', data: data, error: errorMsg});
    });
});

router.post('/sendMails', function (req, res) {
    if (!('msg' in req.body))
        return res.status(400).send("Required param was not passed");

    User.find().exec(function (err, data) {
        if (err)
            return res.status(500).send(err);
        data.forEach(function (item) {
            const mailOptions = {
                from: process.env.EMAIL,
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
