const config = require('./env');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passportJwt = require('passport-jwt');
const User = require('../models/User');
module.exports = function (passport) {

    /**
     * FACEBOOK Strategy
     */
    const fbStrategyOptions = config.facebookAuth;
    passport.use(new FacebookStrategy(fbStrategyOptions,
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'profile.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.profile.token) {
                                user.profile.token = token;
                                user.name = profile.name.givenName + ' ' + profile.name.familyName;
                                user.email = (profile.emails[0].value || '').toLowerCase();

                                user.save(function (err) {
                                    if (err)
                                        return done(err);

                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();
                            newUser.name = profile.name.givenName + ' ' + profile.name.familyName;
                            newUser.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.providerType = "facebook";
                            newUser.profile.id = profile.id;
                            newUser.profile.token = token;

                            newUser.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    user.profile.id = profile.id;
                    user.profile.token = token;
                    user.name = profile.name.givenName + ' ' + profile.name.familyName;
                    user.email = (profile.emails[0].value || '').toLowerCase();

                    user.save(function (err) {
                        if (err)
                            return done(err);
                        return done(null, user);
                    });

                }
            });
        })
    );
    
    
    /**
     * GOOGLE Strategy
     */
    const googleStrategyOptions = config.googleAuth;
    passport.use(new GoogleStrategy(googleStrategyOptions,
        function (req, token, refreshToken, profile, done) {

            // asynchronous
            process.nextTick(function () {

                // check if the user is already logged in
                if (!req.user) {

                    User.findOne({ 'profile.id': profile.id }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {

                            // if there is a user id already but no token (user was linked at one point and then removed)
                            if (!user.profile.token) {
                                user.name = profile.displayName;
                                user.email = (profile.emails[0].value || '').toLowerCase();
                                user.profile.token = token;
                                user.profile.displayName = profile.displayName;
                                // get profile image
                                if( profile.image ){
                                    user.profile.avatarUrl = profile.image.url;
                                }else{
                                    if( profile.photos.length ){
                                        user.profile.avatarUrl = profile.photos[0].value;
                                    }
                                }
                                user.save(function (err) {
                                    if (err)
                                        return done(err);

                                    return done(null, user);
                                });
                            }

                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();
                            newUser.name = profile.displayName;
                            newUser.email = (profile.emails[0].value || '').toLowerCase();
                            newUser.providerType = "google";
                            newUser.profile.id = profile.id;
                            newUser.profile.token = token;
                            newUser.profile.displayName = profile.displayName;
                            // get profile image
                            if( profile.image ){
                                newUser.profile.avatarUrl = profile.image.url;
                            }else{
                                if( profile.photos.length ){
                                    newUser.profile.avatarUrl = profile.photos[0].value;
                                }
                            }

                            newUser.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }
                    });

                } else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session
                    
                    user.name = profile.name.displayName;
                    user.email = (profile.emails[0].value || '').toLowerCase();
                    user.profile.id = profile.id;
                    user.profile.token = token;
                    // get profile image
                    if( profile.image ){
                        user.profile.avatarUrl = profile.image.url;
                    }else{
                        if( profile.photos.length ){
                            user.profile.avatarUrl = profile.photos[0].value;
                        }
                    }
                    user.save(function (err) {
                        if (err)
                            return done(err);
                        return done(null, user);
                    });

                }
            });
        })
    );

    /**
     * JWT Strategy
     */
    const jwtStrategyOptions = config.jwt;
    // Get the JWT from the "Authorization" header.
    // By default this looks for a "JWT " prefix
    jwtStrategyOptions.jwtFromRequest = passportJwt.ExtractJwt.fromAuthHeader();
    passport.use(new passportJwt.Strategy(jwtStrategyOptions, function(payload, done) {
        User.findById(payload.sub, function (err, user) {
            if (user) {
                return done(null, user, payload);
            }
            return done(err);
        });
    }));
}
