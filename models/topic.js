var mongoose = require('mongoose');
var topicSchema = new mongoose.Schema({
    userid: String,
    fullname: String,
    userimg: String,
    subject: String,
    content: String,
    image: String,
    date_public: String,
    time_public: String,
    role: String,
    num_comment: Number,
    code_youtube: String,
    categories: String,
    isTopic: Number,
});

var Topic = mongoose.model('Topic', topicSchema);
module.exports = Topic;