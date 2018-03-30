const crypto = require('crypto');
const config = require('../../config/config');
const db = require('../db/db-interface');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const ExtractJwt = require('passport-jwt').ExtractJwt;
//Important Crypto Constants
const iterations = 50;
const keySize = 2048;
var authentication = {};

authentication.jwtOptions = {
    "jwtFromRequest": ExtractJwt.fromAuthHeaderAsBearerToken(),
    "secretOrKey": config.secretJWTKey
};
//For authorization on each protected endpoint:
authentication.JWTStrategy = async function (jwt_payload, done) {
    let username = jwt_payload.id,
        user = await db.users.findByEmail(username);

    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
};
authentication.login = async function(req, res, next) {
    return authentication.issueJWT(req, res, next);
};
authentication.register = async function (req, res, next) {
    try {
        let userExists = await authentication.checkUsersExistance(req.body.email);
        if (userExists) {
            res.json({status: "Error: User already exists."});
        } else {
            let newUser = {},
                email = req.body.email,
                password = req.body.password,
                randomId, userExists = false,
                saltHash;
            if (!email || !password) {
                return res.status(400).json({ status: 'Incorrect Params' }); //Don't actually use different statuss in production
            }
            //Add User to *DB*
            saltHash = await authentication.generateSecureHash(password);
            newUser.fullname = req.body.fullname;
            newUser.username = req.body.username;
            newUser.address = req.body.address;
            newUser.occupation = req.body.occupation;
            newUser.age = req.body.age;
            newUser.email = email;
            newUser.password = saltHash.hash;
            newUser.salt = saltHash.salt;
            user = await db.users.create(newUser);
            authentication.issueJWT(req, res, next);
        }
    } catch (err) {
        return next(err);
    }
};
//For login after registration and just plain login:
authentication.issueJWT = async function(req, res, next) {
    if(req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
    }
    if (!email || !password) {
        return res.status(400).json({ status: 'Incorrect Params' }); //Don't actually use different statuss in production
    }
    user = await db.users.findByEmail(email);
    if (user) {
        //Verify email and pass
        isCorrect = await authentication.compareHash(password, user.salt, user.password);
        if (isCorrect) {
            var payload = { id: user.email };
            var token = jwt.sign(payload, config.secretJWTKey, { expiresIn: '60m' });
            let { password, salt, ...nonSens } = user._doc;
            user = Object.assign({}, { token: token }, nonSens);
            return res.json({status: "ok", user: user});
        } else { //Failed verification check
            return res.status(403).json({ status: 'Incorrect email or password.' });
        }
    } else { //User does not exist: failed
        return res.status(403).json({ status: 'User does not exist.' });
    }
};

authentication.isAuthenticated = function (req, res, next) {
    return passport.authenticate('jwt', {
        session: false
    })(req, res, next);
};

authentication.checkUsersExistance = async function (userEmail) {
    return new Promise(async function (resolve, reject) {
        try {
            let user = await db.users.findByEmail(userEmail);
            if (!user) {
                resolve(false);
            } else {
                resolve(true);
            }
        } catch (err) {
            reject(err);
        }
    });
};
authentication.generateSecureHash = async function (passwordPlain) {
    return new Promise(async function (resolve, reject) {
        try {
            var salt = crypto.randomBytes(keySize).toString('base64'), hash;
            var hash = await authentication.calculateHash(passwordPlain, salt);
            hash = hash.toString('base64');
            resolve({ salt: salt, hash: hash });
        } catch (err) {
            reject(err);
        }
    });
}
authentication.calculateHash = function (passwordPlain, salt) {
    return new Promise(function (resolve, reject) {
        crypto.pbkdf2(passwordPlain, salt, iterations, keySize, 'sha512', (err, derivedKey) => {
            if (err) {
                reject(err);
            }
            hash = derivedKey.toString('base64');
            resolve(hash);
        });
    });
}
authentication.compareHash = async function (passwordPlain, saltFromDB, hashFromDB) {
    return new Promise(async function (resolve, reject) {
        try {
            var inComingHash = await authentication.calculateHash(passwordPlain, saltFromDB);
            inComingHash = inComingHash.toString('base64');
            if (hashFromDB === inComingHash) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (err) {
            reject(err);
        }
    });
}
module.exports = authentication;