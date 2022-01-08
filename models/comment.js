var mongoose = require('mongoose');
var commentSchema = new mongoose.Schema({
    userid: String,
    fullname: String,
    userimg: String,
    role: String,
    topicid: String,
    C_content: String,
    
});
// vacationSchema.method.getDisplayPrice = function(){
//     return '$' + (this.priceInCents / 100 ).toFixed(2);
// }
var Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;