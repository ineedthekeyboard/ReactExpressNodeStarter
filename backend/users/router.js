const express = require('express');
const router = express.Router();
const db = require('../db/db-interface');
const authentication = require('./auth');

router.get('/:email', authentication.isAuthenticated, async function(req, res, next) {
    let email = req.params.email,
        user = await db.users.findByEmail(email);
    if (req.user.email === req.params.email) {
        const { password, salt, ...safeUser } = user._doc;
        res.json({status: 'ok', user: safeUser});
    } else {
        res.status(400).json({status: 'Authorization Failed'});
    }
    
})
router.post('/login', authentication.login);
router.post('/register', authentication.register);
module.exports = router;