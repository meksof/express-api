var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Token = require('../../helpers/Token');
var User = require('../../models/User');

var bcrypt = require('bcryptjs');

/**
 * ****************
 *   LOCAL LOGIN
 * ****************
 */
// LOGIN A USER
router.post('/login', function (req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(404).send({ error: true, message: "You should provide an email and password" })
    }
    User.findOne({ email: req.body.email, providerType: "local"}, function (err, user) {
        if (err) return res.status(500).send({ error: true, message: 'Error on the server.'});
        if (!user) return res.status(404).send({ error: true, message: 'No user found.'});

        // Validate password
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ error: true, message: "password is invalid" });
        // Generate token
        var token = Token.generateAccessToken(user._id);
        // send result
        res.status(200).send({ auth: true, token: token });
    });
});

// REGISTER A NEW USER
router.post('/register', function (req, res) {

    /**
     * Your input validation should go here
     */
    if( !req.body.email || !req.body.password ) {
        return res.status(404).send({ error: true, message: "You need to provide an email and a password" });
    }
    // password encryption
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.findOne({'email': req.body.email}, function(err, user){
        if (err) return res.status(500).send({error: true, message: err});
        if(user){
            return res.status(404).send({ error: true, message: 'This email is already in use'});
        }else{
            User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
                providerType: "local",
            },
                function (err, user) {
                    if (err) return res.status(500).send({error: true, message: err})
                    // generate a token
                    
                    var token = Token.generateAccessToken(user._id);
                    // Send success result
                    return res.status(200).send({ auth: true, token: token });
                });
        }
    })
    
});


module.exports = router;

