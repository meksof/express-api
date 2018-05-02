const express = require('express');
const app = express();

require('./db'); // make a db connection

const UserController = require('./controllers/user/UserController');
app.use('/api/users', UserController);
/**
 * AuthController: used to make local login authentication
 * /api/auth/login
 * /api/auth/register
 */
const AuthController = require('./controllers/auth/AuthController');
/**
 * SocialAuthController: used to make social login authentication
 * /api/auth/[provider]
 * /api/auth/[provider]/callback
 * WHERE: [provider] should be replaced by "facebook" or "google"
 */
const SocialAuthController = require('./controllers/auth/SocialAuthController');
app.use('/api/auth', [AuthController, SocialAuthController]);

app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
    res.sendFile('index.html');
    //It will find and locate index.html from View or Scripts
});
  
module.exports = app;