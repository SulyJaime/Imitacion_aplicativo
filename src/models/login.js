var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Login = new Schema({
    username: String,
    email: String,
    pass: String
});

module.exports = mongoose.model("Login", Login);
