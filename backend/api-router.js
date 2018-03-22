var express = require('express');
var router = express.Router();
// var auth = require('./users/auth');
var passport = require('passport');

function apiVersion(req, res) {
    res.json({
        'version': 0.5
    })
}

router.get('/', apiVersion); // /api
router.use('/users', require('./users/router'));
// //TODO: Change to models:::
// router.use('/model', auth.isAuthenticated, require('./models/router')); // /api/models
// router.use("/engineTasks", auth.isAuthenticated, kue.app);

module.exports = router;