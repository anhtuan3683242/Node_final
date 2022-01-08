var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Categories = require('../models/categories')
var Quanly = require('../models/quanly')
var secret = require('../secret.js')
//passport 28/12
var mongoose = require('mongoose');
router.use(require("express-session")(secret.sessionSecret));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const bcrypt = require('bcrypt')
const saltRounds = 10;

var isLoggedIn = require('../token.js')
var isAdminLoggedIn = require('../admintoken.js')
/* GET users listing. */
router.get('/',isLoggedIn, function(req, res, next) {
  res.send('respond with a resource');
});

router.get('  ', (req, res) => {
  res.render('index', { title: 'USER_LIST' });
});


router.get('/login', function(req, res) {
  if (req.session.User) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});
router.post('/login',(req,res)=>{
  
  User.find({ username: req.body.username},function (err,user) {
    if (err || !user){
      req.session.flash = {
        msg:" khong tim thay username trong du lieu"
      }
    }
    console.log(user[0])
    
    bcrypt.compare(req.body.password,user[0].password).then(function(result){
      if(result){
        req.session.User = {
          id: user[0].id,
          fullname: user[0].fullname,
          role: user[0].role
        }
        res.redirect("/")
      }
      req.session.flash ={
        msg:"Sai username hoac mat khau"
      }
      return res.redirect("/users/login")
    })
 
 })
})



// 2 cái router addUser dùng để add Phòng Khoa mới
router.get('/userlist/addUD',isAdminLoggedIn, (req, res) => {
  
  res.render('addUser', {session: req.session.User});

})
router.post('/userlist/addUD', (req, res) => {

  bcrypt.hash(req.body.password, saltRounds).then(function(hash){
    new User({
      _id: new mongoose.Types.ObjectId(),
      username:req.body.username,
      password:hash,
      fullname: req.body.fullname,
      role: req.body.role,
  }).save(function(err) {
      if (err) {
        return res.render('addUser',{err})
      }

      console.log('User successfully saved.');
  });
  res.redirect('/users/userlist');
  })
      
  
})
// hiện tất cả user trong userlist
router.get('/userlist',isAdminLoggedIn,(req,res)=>{

  User.find({},function (err,user) {
    if (user){
      var userlist =[]
      // console.log(user[0])
      for(i=0;i<user.length;i++){
        userlist.push({stt:i+1,id:user[i].id,name:user[i].fullname,username:user[i].username,role:user[i].role})
      }
      // console.log(userlist)
      res.render("userlist", {session: req.session.User,data:userlist})
    }
})

})
// add chuyên mục
router.get('/addCategories',isAdminLoggedIn,(req,res) => {
  res.render("addUser");
})

router.post('/addCategories',(req,res) =>{
  User.updateMany({_id: req.query.uid},{/* đặt biến chuyên mục ở đây*/},
  function(err,users){
      if (err) return res.send(500, {error: err});
    })
})
// delete user
router.get('/delete', (req, res)=>{
  console.log(req.query.uid)
  User.remove({_id: req.query.uid},function (err,users){
    if (err) throw err;
    console.log("Remove success: ",users)
})
  
})

// user detail
router.get('/userlist/detail/:id',isLoggedIn,(req,res) => {
  if (req.session.User.role =="student") {
    res.redirect('/');
  }
  let id=req.params.id;
  User.find({_id: id},function (err,user) {
    if (user){
      var userdetail =[]
      
      for(i=0;i<user.length;i++){
        userdetail.push({id:user[i].id,name:user[i].fullname,username:user[i].username,role:user[i].role})
      }
      // console.log(userdetail[0])
      Categories.find({},function(err,categories){
        if (categories){
          var categories_list = []
          for(i=0;i<categories.length;i++){
            categories_list.push({stt:i+1,
                            id:categories[i].id,
                            name_cate:categories[i].name_cate,
                            })
          }
          Quanly.find({user_id: id},function(err,quanly){
            if(quanly){
              var cate_all = []
              for(i=0;i<quanly.length;i++){
                cate_all.push({stt:i+1,
                                id:quanly[i].id,
                                name_cate:quanly[i].cate_name,
                                })
              }
              res.render("profile--",{session: req.session.User,userdetail,categories_list,cate_all})
            }
          })
          
        }
      })
    }
  })
})
// add chuyên mục cho phòng/khoa
router.get('/userlist/addcate',(req,res) => {
  let idu = req.query.idu
  let add_cate = req.query.catechoose
  User.find({_id: idu},function(err,users){
    if(users){
      var user_fullname = users[0].fullname
      Categories.find({name_cate: add_cate},function(err,categories){
        if(categories){
          var id_cate = categories[0].id
          var name_cate = categories[0].name_cate
          console.log(id_cate)
          new Quanly({
            _id: new mongoose.Types.ObjectId(),
            user_id: idu,
            cate_id: id_cate,
            cate_name : name_cate,
            fullname: user_fullname,
            
        }).save(function(err) {
            if (err) throw err;
        
            console.log('Quanly successfully saved.');
        });
            res.redirect('/users/userlist/detail/'+idu);
        }
        
      })
    }
  })
  
})

// xóa chuyên mục phòng/khoa
router.get('/userlist/delete',(req,res) => {
  Quanly.remove({_id: req.query.idcate},function (err,quanly){
    if (err) throw err;
    console.log("Remove success: ",quanly)
  })
  
})

// user edit
router.get('/userlist/edit',(req,res) => {
  console.log(req.query.uid)
  User.updateMany({_id: req.query.uid},{fullname:req.query.name,username:req.query.username,role:req.query.role},
    function(err,users){
        if (err) return res.send(500, {error: err});
  })
});

// đổi mật khẩu phòng/khoa
router.get('/userlist/changepass',(req,res) => {
  let user_id = req.query.idu
  let current_password = req.query.cpassword
  let new_password = req.query.npassword
    User.find({_id: user_id},function(err,users){
      if(users){
        var user_database_currentpassword = users[0].password
        bcrypt.compare(current_password,user_database_currentpassword).then(function(result){
          if(result){
            //console.log("thanh cong")
            bcrypt.hash(new_password, saltRounds).then(function(hash){
              User.updateMany({_id: user_id},{password:hash},
                function(err,users){
                    if (err) return res.send(500, {error: err});
              })
            })
            res.redirect('/auth/logout')
          }
          res.redirect('/users/userlist/detail/'+user_id)
        })
      }
    })
  
});


module.exports = router;
