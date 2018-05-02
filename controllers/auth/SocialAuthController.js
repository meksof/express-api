/**
 * *****************
 *   SOCIAL LOGIN
 * *****************
 */
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bodyParser = require('body-parser');
const Token = require('../../helpers/Token');

// Generate the Token for the user authenticated in the request
function generateUserToken(req, res) {
    const accessToken = Token.generateAccessToken(req.user.id);
    res.status(200).send({
        auth: true,
        token: accessToken
    });
}

// Passport init
require('../../config/passport')(passport); // init passport strategies 
router.use(passport.initialize());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json()); 

/**
 * FACEBOOK LOGIN
 */
// send to facebook to do the authentication
router.get('/facebook', passport.authenticate('facebook', { session: false, scope: ['public_profile', 'email'] }));

// handle the callback after facebook has authenticated the user

router.get('/facebook/callback',
    passport.authenticate('facebook', {
            session: false
        }),
        generateUserToken
    );
/**
 * GOOGLE LOGIN
 */
// send to google to do the authentication
router.get('/google', passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));

// handle the callback after google has authorized the user
router.get('/google/callback',
    passport.authenticate('google', {
        session: false
        }),
        generateUserToken
    );




module.exports = router;