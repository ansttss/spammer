let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     res.send('respond with a resource');
// });

router.post('/add', function (req, res) {
    console.log(req.body);

    let userData = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    };
    User.create(userData, function (error, user) {
        if (error) {
            return next(error);
        } else {
            return res.redirect('/');
        }
    });
});

module.exports = router;
