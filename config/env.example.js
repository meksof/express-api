module.exports = {
    mongodbUrl: 'mongodb://localhost',
    facebookAuth : {
        'clientID'        : 'your_App_ID', // your App ID
        'clientSecret'    : 'your_App_Secret', // your App Secret
        'callbackURL'     : 'https://localhost/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },
    googleAuth: {
        'clientID'        : 'your_App_ID', // your App ID
        'clientSecret'    : 'your_App_Secret', // your App Secret
        'callbackURL': 'https://localhost/api/auth/google/callback'
    },
    jwt: {
        secretOrKey: 'themostpowerfulpassword',
        issuer: 'express-api',
        audience: 'express-api'
    }

}