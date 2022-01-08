var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    fullname: String,
    img     : String,
    role    : String,
});

var User = mongoose.model('User', userSchema);
module.exports = User;