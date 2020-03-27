let express = require('express');
let router = express.Router();
let User = require('../models/user');


router.post('/add', function (req, res) {
    if (!('email' in req.body && 'firstName' in req.body && 'lastName' in req.body)) {
        return res.status(400).send("Required params were not passed");
    }

    User.countDocuments({email: req.body.email}, function (err, count) {
        if (count > 0) {
            let errorMsg = encodeURIComponent('User with this email already exists');
            return res.redirect('/?error=' + errorMsg);
        }

        let userData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };

        User.create(userData, function (error, _user) {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.redirect('/');
            }
        });
    });
});

router.post('/delete', function (req, res) {
    if (!('id' in req.body)) {
        res.status(400).send("Required param was not passed");
    }

    User.findOneAndRemove({_id: req.body.id}, function (error, _user) {
        if (error) {
            res.status(500).send(error);
        } else {
            res.redirect('/');
        }
    });
});

router.post('/update', function (req, res) {
    if (!('email' in req.body && 'firstName' in req.body && 'lastName' in req.body && 'id' in req.body)) {
        return res.status(400).send("Required params were not passed");
    }

    User.countDocuments({_id: req.body.id}, function (err, count) {
        if (count === 0) {
            let errorMsg = encodeURIComponent('This User doesn\'t exist');
            return res.redirect('/?error=' + errorMsg);
        }

        let userData = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        };

        User.findOneAndUpdate({_id: req.body.id}, userData, function (error, _user) {
            if (error) {
                return res.status(500).send(error);
            } else {
                return res.redirect('/');
            }
        });
    });
});

module.exports = router;
