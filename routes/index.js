var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Topic = require('../models/topic')
var Quanly = require('../models/quanly')
var secret = require('../secret.js')
var Student = require('../models/student');
const path = require('path');
var mongoose = require('mongoose');
const multer = require('multer'); 
router.use(require("express-session")(secret.sessionSecret));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
// const bcrypt = require('bcrypt')
// const saltRounds = 10;
const moment = require('moment');
var isLoggedIn = require('../token.js')
/* GET home page. */
router.get('/',isLoggedIn, (req, res) => {
    Topic.find({isTopic:1},function (err,topic) {
      if (topic){
        var topiclist =[]
        for(i=0;i<topic.length;i++){
          topiclist.push({
                          id:topic[i].id,userid:topic[i].userid,
                          fullname:topic[i].fullname,
                          subject:topic[i].subject,
                          content:topic[i].content,
                          image:topic[i].image,
                          date_public:topic[i].date_public,
                          time_public:topic[i].time_public,
                          role:topic[i].role,
                          num_comment:topic[i].num_comment, 
                          code_youtube:topic[i].code_youtube,
                          userimg:topic[i].userimg})
        }
        for(x=0;x<topiclist.length-1;x++){
          for(z = 0; z< topiclist.length-x-1 ; z++){
            var swap_condition_1 = Date.parse(topiclist[z].date_public +" "+topiclist[z].time_public)
            var swap_condition_2 = Date.parse(topiclist[z+1].date_public +" "+topiclist[z+1].time_public)
            if(swap_condition_2 > swap_condition_1){
              var temp = topiclist[z+1]
              topiclist[z+1] = topiclist[z]
              topiclist[z] = temp
            }
          }
        }
        for(o=0;o<topiclist.length;o++){
          topiclist[o].stt = o+1
        }
        Comment.find({},function (err,comment) {
          if (comment){
            var commentlist =[]
            for(y=0;y<comment.length;y++){
              commentlist.push({stt:y+1,
                                id_comment:comment[y].id,
                                userid_comment:comment[y].userid,
                                fullname_comment:comment[y].fullname,
                                comment_content:comment[y].C_content,
                                topicid_comment: comment[y].topicid,
                                userrole_comment: comment[y].role,
                                userimg: comment[y].userimg})
            }
            //console.log(commentlist)
            Topic.find({isTopic:0},function (err,topicss){
              if(topicss){
                var notificate_all =[]
                for(p=0;p<topicss.length;p++){
                  notificate_all.push({id:topicss[p].id,userid:topicss[p].userid,
                                      fullname:topicss[p].fullname,
                                      subject:topicss[p].subject,
                                      content:topicss[p].content,
                                      image:topicss[p].image,
                                      date_public:topicss[p].date_public,
                                      time_public:topicss[p].time_public,
                                      role:topicss[p].role,
                                      num_comment:topicss[p].num_comment, 
                                      code_youtube:topicss[p].code_youtube,
                                      userimg:topicss[p].userimg,
                                      categories:topicss[p].categories,})
                }
                for(x=0;x<notificate_all.length-1;x++){
                  for(z = 0; z< notificate_all.length-x-1 ; z++){
                    var swap_condition_1 = Date.parse(notificate_all[z].date_public +" "+notificate_all[z].time_public)
                    var swap_condition_2 = Date.parse(notificate_all[z+1].date_public +" "+notificate_all[z+1].time_public)
                    if(swap_condition_2 > swap_condition_1){
                      var temp = notificate_all[z+1]
                      notificate_all[z+1] = notificate_all[z]
                      notificate_all[z] = temp
                    }
                  }
                }
                for(o=0;o<notificate_all.length;o++){
                  notificate_all[o].stt = o+1
                }
                res.render("index",{session: req.session.User,data:topiclist,comment:commentlist,notitopic:notificate_all})
              }              
            })
          }
        })  
      }
    })
});

// user topic detail
router.get('/topic/detail/:id',isLoggedIn, (req, res) => {
  let id=req.params.id;
  Topic.find({userid: id,isTopic:1},function (err,topic) {
    if (topic){
      var topiclist =[]
      for(i=0;i<topic.length;i++){
        topiclist.push({stt:i+1,
                        id:topic[i].id,userid:topic[i].userid,
                        fullname:topic[i].fullname,
                        subject:topic[i].subject,
                        content:topic[i].content,
                        image:topic[i].image,
                        date_public:topic[i].date_public,
                        time_public:topic[i].time_public,
                        role:topic[i].role,
                        num_comment:topic[i].num_comment, 
                        code_youtube:topic[i].code_youtube,
                        userimg:topic[i].userimg})
      }
      for(x=0;x<topiclist.length-1;x++){
        for(z = 0; z< topiclist.length-x-1 ; z++){
          var swap_condition_1 = Date.parse(topiclist[z].date_public +" "+topiclist[z].time_public)
          var swap_condition_2 = Date.parse(topiclist[z+1].date_public +" "+topiclist[z+1].time_public)
          if(swap_condition_2 > swap_condition_1){
            var temp = topiclist[z+1]
            topiclist[z+1] = topiclist[z]
            topiclist[z] = temp
          
          }
        }
        
      }
      Comment.find({},function (err,comment) {
        if (comment){
          var commentlist =[]
          for(y=0;y<comment.length;y++){
            commentlist.push({stt:y+1,
                              id_comment:comment[y].id,
                              userid_comment:comment[y].userid,
                              fullname_comment:comment[y].fullname,
                              comment_content:comment[y].C_content,
                              topicid_comment: comment[y].topicid,
                              userrole_comment: comment[y].role,
                              userimg: comment[y].userimg})
          }
          //console.log(commentlist)
          Topic.find({isTopic:0},function (err,topicss){
            if(topicss){
              var notificate_all =[]
              for(p=0;p<topicss.length;p++){
                notificate_all.push({id:topicss[p].id,userid:topic[p].userid,
                                    fullname:topicss[p].fullname,
                                    subject:topicss[p].subject,
                                    content:topicss[p].content,
                                    image:topicss[p].image,
                                    date_public:topicss[p].date_public,
                                    time_public:topicss[p].time_public,
                                    role:topicss[p].role,
                                    num_comment:topicss[p].num_comment, 
                                    code_youtube:topicss[p].code_youtube,
                                    userimg:topicss[p].userimg,
                                    categories:topicss[p].categories,})
              }
              for(x=0;x<notificate_all.length-1;x++){
                for(z = 0; z< notificate_all.length-x-1 ; z++){
                  var swap_condition_1 = Date.parse(notificate_all[z].date_public +" "+notificate_all[z].time_public)
                  var swap_condition_2 = Date.parse(notificate_all[z+1].date_public +" "+notificate_all[z+1].time_public)
                  if(swap_condition_2 > swap_condition_1){
                    var temp = notificate_all[z+1]
                    notificate_all[z+1] = notificate_all[z]
                    notificate_all[z] = temp
                  }
                }
              }
              for(o=0;o<notificate_all.length;o++){
                notificate_all[o].stt = o+1
              }
              res.render("index",{session: req.session.User,data:topiclist,comment:commentlist,notitopic:notificate_all})
            }              
          })
        }
      })   
    }
  })
})

router.get('/denied', (req, res) => {

  res.render("deny");
});
router.get('/profile',isLoggedIn, (req, res) => {
  res.render("profile",{user: req.user});
});

//student profile edit
router.get('/profile/edit',(req,res) => {
  //console.log(req.query.uid)
  Student.updateMany({_id: req.query.uid},{name:req.query.name,class:req.query.class,falculty:req.query.falculty},
    function(err,users){
      req.session.User.fullname =req.query.name;
      Topic.updateMany({userid: req.query.uid},{fullname: req.query.name},
        function(err,topics){
            if (err) return res.send(500, {error: err});
      })
      Comment.updateMany({userid: req.query.uid},{fullname: req.query.name},
        function(err,comments){
            if (err) return res.send(500, {error: err});
      })
      if (err) return res.send(500, {error: err});
  })
});

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/avatars');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload = multer({ //multer settings
  storage: storage,
  fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
})

var storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
})
 
var upload2 = multer({ //multer settings
  storage: storage2,
  fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(new Error('Only images are allowed'))
      }
      callback(null, true)
  },
  limits:{
      fileSize: 1024 * 1024
  }
})

router.post('/profile', upload.single('file'), (req, res, next) => {
  //console.log('ENTER UPLOAD')
  let id = req.body.id;
  //console.log('parent',req.file)
  const file = req.file
  if (!file) {
    const error = new Error('Please upload an image')
    error.httpStatusCode = 400
    return next(error)
  }
  new_img= '/avatars/'+ req.file.filename
  console.log('new',new_img)
  Student.findById(id, function(err,a){
    if (err) return res.send(500, 'Error occured: database error.');
      a.image= new_img,
    a.save(function(err,a){
        if(err) return res.send(500,'Error occured: database error.');
        req.session.User.image =new_img;
        res.redirect('/profile');
    })
    Topic.updateMany({userid: id},{userimg: new_img},
      function(err,topics){
          if (err) return res.send(500, {error: err});
    })
    Comment.updateMany({userid: id},{userimg: new_img},
      function(err,comments){
          if (err) return res.send(500, {error: err});
    })

  })
});

// post topic
router.post('/ptopic', upload2.single('file'), (req,res) => {
  console.log('parent',req.file)
  if (!req.file) {
    console.log('NO IMAGE');
    new_img= 'mốt thêm sau';
  }
  else{
    new_img= '/images/'+ req.file.filename;
  }
  let id=req.query.id;
  let name_user_post = req.query.name;
  let topic_content = req.query.content;
  let user_role = req.query.role;
  let code_youtube = req.query.cy;
  let user_image = req.query.userimg;
  d = new Date();
  new Topic({
    _id: new mongoose.Types.ObjectId(),
    userid: id,
    fullname: name_user_post,
    subject: "none",
    content: topic_content,
    image: new_img,
    date_public: moment().format("YYYY-MM-DD"),
    time_public: moment().format("HH:mm:ss"),
    role: user_role,
    num_comment: 0,
    code_youtube:code_youtube,
    userimg: user_image,
    categories: "none",
    isTopic: 1,

}).save(function(err) {
    if (err) throw err;

    console.log('Topic successfully saved.');
});
    res.redirect('/');
})

// topic edit
router.get('/editopic',(req,res) => {
  Topic.updateMany({_id: req.query.idt,userid: req.query.userid,role:req.query.role},{content: req.query.contentedit,code_youtube:req.query.cy},
    function(err,topics){
        if (err) return res.send(500, {error: err});
  })
})
//topic delete
router.get('/deleteopic',(req,res) => {
  console.log(req.query.idt)
  Topic.remove({_id: req.query.idt},function (err,topics){
    if (err) throw err;
    console.log("Remove success: ",topics)
  })
})

// topic comment
router.get('/comment', (req,res) => {
  let topic_id=req.query.idt;
  let userid_post_comment = req.query.userid;
  let topic_content_comment = req.query.contentcomment;
  let userrole_post_comment = req.query.role;
  let userFN_post_comment = req.query.fullname;
  let userimage_post_comment = req.query.userimg;
  new Comment({
    _id: new mongoose.Types.ObjectId(),
    userid: userid_post_comment,
    fullname: userFN_post_comment,
    role: userrole_post_comment,
    topicid: topic_id,
    C_content: topic_content_comment,
    userimg: userimage_post_comment,

}).save(function(err) {
    if (err) throw err;

    console.log('Comment successfully saved.');
});
  
  Comment.find({topicid: req.query.idt},function(err,comments){
    var CL = comments.length
    console.log(CL)
    Topic.updateMany({_id: req.query.idt},{num_comment: CL+1},
      function(err,topics){
          if (err) return res.send(500, {error: err});
    })
  })

  
  res.redirect('/');
})

// comment edit
router.get('/editcomment',(req,res) => {
  Comment.updateMany({_id: req.query.idc},{C_content: req.query.commentedit},
    function(err,comments){
        if (err) return res.send(500, {error: err});
  })
})
// comment delete
router.get('/deletecomment',(req,res) => {
  Comment.remove({_id: req.query.idc},function (err,comments){
    if (err) throw err;
    Comment.find({topicid: req.query.idt},function(err,comments){
      var CL = comments.length
      console.log(CL)
      Topic.updateMany({_id: req.query.idt},{num_comment: CL},
        function(err,topics){
            if (err) return res.send(500, {error: err});
      })
    })
    console.log("Remove success: ",comments)
  })
  
})
// noti topic render page
router.get('/Ntopic',isLoggedIn, (req, res) => {
  Topic.find({isTopic: 0},function (err,topic) {
    if (topic){
      var topiclist =[]
      for(i=0;i<topic.length;i++){
        topiclist.push({id:topic[i].id,userid:topic[i].userid,
                        fullname:topic[i].fullname,
                        subject:topic[i].subject,
                        content:topic[i].content,
                        image:topic[i].image,
                        date_public:topic[i].date_public,
                        time_public:topic[i].time_public,
                        role:topic[i].role,
                        num_comment:topic[i].num_comment, 
                        code_youtube:topic[i].code_youtube,
                        userimg:topic[i].userimg,
                        categories:topic[i].categories})
      }
      for(x=0;x<topiclist.length-1;x++){
        for(z = 0; z< topiclist.length-x-1 ; z++){
          var swap_condition_1 = Date.parse(topiclist[z].date_public +" "+topiclist[z].time_public)
          var swap_condition_2 = Date.parse(topiclist[z+1].date_public +" "+topiclist[z+1].time_public)
          if(swap_condition_2 > swap_condition_1){
            var temp = topiclist[z+1]
            topiclist[z+1] = topiclist[z]
            topiclist[z] = temp
          }
        }
      }
      for(o=0;o<topiclist.length;o++){
        topiclist[o].stt = o+1
      }
      Comment.find({},function (err,comment) {
        if (comment){
          var commentlist =[]
          for(y=0;y<comment.length;y++){
            commentlist.push({stt:y+1,
                              id_comment:comment[y].id,
                              userid_comment:comment[y].userid,
                              fullname_comment:comment[y].fullname,
                              comment_content:comment[y].C_content,
                              topicid_comment: comment[y].topicid,
                              userrole_comment: comment[y].role,
                              userimg: comment[y].userimg})
          }
          //console.log(commentlist)
          
          Quanly.find({user_id: req.session.User.id},function(err,quanly){
            if(quanly){
              var cate_all = []
              for(i=0;i<quanly.length;i++){
                cate_all.push({stt:i+1,
                                id:quanly[i].id,
                                name_cate:quanly[i].cate_name,
                                })
              }
              res.render("notitopic",{session: req.session.User,data:topiclist,comment:commentlist,cate_all})
            }
          })
        }
        
      })  
    }
  })
});
// noti topic post 
router.post('/pNtopic', upload2.single('file'), (req,res) => {
  console.log('parent',req.file)
  if (!req.file) {
    console.log('NO IMAGE');
    new_img= 'mốt thêm sau';
  }
  else{
    new_img= '/images/'+ req.file.filename;
  }
  let id=req.query.id;
  let name_user_post = req.query.name;
  let topic_content = req.query.content;
  let user_role = req.query.role;
  let code_youtube = req.query.cy;
  let user_image = req.query.userimg;
  let subject = req.query.subject;
  let cate_user = req.query.cateuser;
  d = new Date();
  new Topic({
    _id: new mongoose.Types.ObjectId(),
    userid: id,
    fullname: name_user_post,
    subject: subject,
    content: topic_content,
    image: new_img,
    date_public: moment().format("YYYY-MM-DD"),
    time_public: moment().format("HH:mm:ss"),
    role: user_role,
    num_comment: 0,
    code_youtube:code_youtube,
    userimg: user_image,
    categories: cate_user,
    isTopic: 0,

}).save(function(err) {
    if (err) throw err;

    console.log('Topic successfully saved.');
});
    res.redirect('/Ntopic');
})
// noti topic edit
router.get('/editNtopic',(req,res) => {
  Topic.updateMany({_id: req.query.idt,userid: req.query.userid,role:req.query.role},{content: req.query.contentedit,code_youtube:req.query.cy,subject: req.query.subjectedit},
    function(err,topics){
        if (err) return res.send(500, {error: err});
  })
})
// noti topic delete
router.get('/deleteNtopic',(req,res) => {
  console.log(req.query.idt)
  Topic.remove({_id: req.query.idt},function (err,topics){
    if (err) throw err;
    console.log("Remove success: ",topics)
  })
})
// noti topic detail
router.get('/Ntopic/detail/:id',isLoggedIn,(req,res) => {
  let id=req.params.id;
  Topic.find({isTopic: 0,_id:id},function (err,topic) {
    if (topic){
      var topiclist =[]
      for(i=0;i<topic.length;i++){
        topiclist.push({stt:i+1,
                        id:topic[i].id,userid:topic[i].userid,
                        fullname:topic[i].fullname,
                        subject:topic[i].subject,
                        content:topic[i].content,
                        image:topic[i].image,
                        date_public:topic[i].date_public,
                        time_public:topic[i].time_public,
                        role:topic[i].role,
                        num_comment:topic[i].num_comment, 
                        code_youtube:topic[i].code_youtube,
                        userimg:topic[i].userimg,
                        categories:topic[i].categories})
      }
      Comment.find({},function (err,comment) {
        if (comment){
          var commentlist =[]
          for(y=0;y<comment.length;y++){
            commentlist.push({stt:y+1,
                              id_comment:comment[y].id,
                              userid_comment:comment[y].userid,
                              fullname_comment:comment[y].fullname,
                              comment_content:comment[y].C_content,
                              topicid_comment: comment[y].topicid,
                              userrole_comment: comment[y].role,
                              userimg: comment[y].userimg})
          }
          //console.log(commentlist)
          
          Quanly.find({user_id: req.session.User.id},function(err,quanly){
            if(quanly){
              var cate_all = []
              for(i=0;i<quanly.length;i++){
                cate_all.push({stt:i+1,
                                id:quanly[i].id,
                                name_cate:quanly[i].cate_name,
                                })
              }
              res.render("detailNtopic",{session: req.session.User,data:topiclist,comment:commentlist,cate_all})
            }
          })
        }
        
      })  
    }
  })
})

// noti each cate topic
router.get('/Ntopic/categories/:cate',isLoggedIn, (req, res) => {
  let cate=req.params.cate;
  Topic.find({categories: cate},function (err,topic) {
    if (topic){
      var topiclist =[]
      for(i=0;i<topic.length;i++){
        topiclist.push({id:topic[i].id,userid:topic[i].userid,
                        fullname:topic[i].fullname,
                        subject:topic[i].subject,
                        content:topic[i].content,
                        image:topic[i].image,
                        date_public:topic[i].date_public,
                        time_public:topic[i].time_public,
                        role:topic[i].role,
                        num_comment:topic[i].num_comment, 
                        code_youtube:topic[i].code_youtube,
                        userimg:topic[i].userimg,
                        categories:topic[i].categories})
      }
      for(x=0;x<topiclist.length-1;x++){
        for(z = 0; z< topiclist.length-x-1 ; z++){
          var swap_condition_1 = Date.parse(topiclist[z].date_public +" "+topiclist[z].time_public)
          var swap_condition_2 = Date.parse(topiclist[z+1].date_public +" "+topiclist[z+1].time_public)
          if(swap_condition_2 > swap_condition_1){
            var temp = topiclist[z+1]
            topiclist[z+1] = topiclist[z]
            topiclist[z] = temp
          }
        }
      }
      for(o=0;o<topiclist.length;o++){
        topiclist[o].stt = o+1
      }
      Comment.find({},function (err,comment) {
        if (comment){
          var commentlist =[]
          for(y=0;y<comment.length;y++){
            commentlist.push({stt:y+1,
                              id_comment:comment[y].id,
                              userid_comment:comment[y].userid,
                              fullname_comment:comment[y].fullname,
                              comment_content:comment[y].C_content,
                              topicid_comment: comment[y].topicid,
                              userrole_comment: comment[y].role,
                              userimg: comment[y].userimg})
          }
          //console.log(commentlist)
          
          Quanly.find({user_id: req.session.User.id},function(err,quanly){
            if(quanly){
              var cate_all = []
              for(i=0;i<quanly.length;i++){
                cate_all.push({stt:i+1,
                                id:quanly[i].id,
                                name_cate:quanly[i].cate_name,
                                })
              }
              res.render("detailNoti",{session: req.session.User,data:topiclist,comment:commentlist,cate_all})
            }
          })
        }
        
      })  
    }
  })
});
module.exports = router;
