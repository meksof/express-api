var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    providerType: String,
    profile: {
        id: String,
        token: String,
        displayName: String,
        username: String,
        avatarUrl: String
    }
});
mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');