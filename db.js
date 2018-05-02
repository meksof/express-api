var mongoose = require('mongoose');
var config = require('./config/env');
mongoose.connect(config.mongodbUrl);