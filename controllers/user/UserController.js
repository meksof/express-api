const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const User = require('../../models/User');

const passport  = require('passport');
require('../../config/passport')(passport); // init passport strategies 

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURN ALL USERS FROM DATABASE
router.get('/',
    passport.authenticate(['jwt'], { session: false }),
    function (req, res) {
        User.find({}, { password: 0, __v: 0 }, function (err, users) {
            if (err) return res.status(500).send("There was a problem finding the users.");
            res.status(200).send(users);
        });
    });

// GET USER INFO BASED ON THE PROVIDED TOKEN
router.get('/me',
    passport.authenticate(['jwt'], { session: false }),
    function (req, res) {
        User.findById(req.user._id,{ password: 0, __v: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user: ", err);
            if (!user) return res.status(404).send("No user found.");
            
            res.status(200).send(user);
        });
        
    });
    
// GET A SINGLE USER FROM THE DATABASE
router.get('/:id',
    passport.authenticate(['jwt'], { session: false }),
    function (req, res) {
        User.findById(req.params.id, { password: 0, __v: 0 }, function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found with id: " + req.params.id);
            res.status(200).send(user);
        });
    });

// DELETES A USER FROM THE DATABASE
router.delete('/:id',
    passport.authenticate(['jwt'], { session: false }),
    function (req, res) {
        User.findByIdAndRemove(req.params.id, function (err, user) {
            if (err) return res.status(500).send("There was a problem deleting the user.");
            if(!user) return res.status(404).send("No user found with id: " + req.params.id);
            res.status(200).send("User " + user.name + " was deleted.");
        });
    });

// UPDATES A SINGLE USER IN THE DATABASE
router.put('/:id',
    passport.authenticate(['jwt'], { session: false }),
    function (req, res) {
        User.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, user) {
            if (err) return res.status(500).send("There was a problem updating the user.");
            user.password = user.__v = undefined; // remove these fields from response
            res.status(200).send(user);
        });
    });




/**
 * LOGOUT
 */
// facebook -------------------------------
// app.get('/unlink/facebook', passport.authenticate(['jwt'], { session: false }), function (req, res) {
//     var user            = req.user;
//     user.facebook.token = undefined;
//     user.save(function(err) {
//         res.redirect('/profile');
//     });
// });

module.exports = router;