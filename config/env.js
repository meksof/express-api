module.exports = {
    mongodbUrl: 'mongodb://meksof:azert1.0@ds121889.mlab.com:21889/meksof-chat-app',
    host: "https://start-express-api.herokuapp.com",
    facebookAuth : {
        'clientID'        : '233401337403167', // your App ID
        'clientSecret'    : '1f44eeb4deed110b6664f98d6d197903', // your App Secret
        'callbackURL'     : this.host + ':5443/api/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields'   : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },
    googleAuth: {
        'clientID'        : '491063729806-71rk27j34j7c5n1t0kdj7okd3ag7g2le.apps.googleusercontent.com', // your App ID
        'clientSecret'    : 'P1x-igDbt5DWZrUuFukHnd_3', // your App Secret
        'callbackURL': this.host + ':5443/api/auth/google/callback'
    },
    jwt: {
        secretOrKey: 'themostpowerfulpassword',
        issuer: 'express-api',
        audience: 'express-api'
    }

}