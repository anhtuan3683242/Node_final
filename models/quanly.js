var mongoose = require('mongoose');
var QuanlySchema = new mongoose.Schema({
    user_id: String,
    cate_id: String,
    fullname: String,
    cate_name: String,
});

var Quanly = mongoose.model('Quanly', QuanlySchema);
module.exports = Quanly;