var mongoose = require('mongoose');
var CategoriesSchema = new mongoose.Schema({
    name_cate: String,
});

var Categories = mongoose.model('Categories', CategoriesSchema);
module.exports = Categories;