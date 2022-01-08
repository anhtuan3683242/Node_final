var mongoose = require('mongoose');
var express = require('express');
var app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
var User = require('../models/user');
var Categories = require('../models/categories');
var secret = require('../secret.js')
const mongoconnect = { 
    connectDB: function() {
        switch(app.get('env')){
            case 'development':
                    
                mongoose.connect(secret.mongo.dev.conn, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(()=>
                {
                    console.log('Database connected - Dev');
                });
                break;
                
            case 'production':
                mongoose.connect(secret.mongo.product.conn, { keepAlive: true, keepAliveInitialDelay: 300000 }).then(()=>
                {
                    console.log('Database connected - Product');
                });;
                break;
            default:
                throw new Error('Unknow execution environment: ' + app.get('env'));   
        }
    const CategoriesArray = [
        { _id: new mongoose.Types.ObjectId(), name_cate: "Phòng Công tác học sinh sinh viên (CTHSSV)" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Phòng Đại học" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Phòng Sau đại học" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Phòng điện toán và máy tính" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Phòng khảo thí và kiểm định chất lượng" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Phòng tài chính" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "TDT Creative Language Center" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Trung tâm tin học" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Trung tâm đào tạo phát triển xã hội (SDTC)" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Trung tâm phát triển Khoa học quản lý và Ứng dụng công nghệ (ATEM)" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Trung tâm hợp tác doanh nghiệp và cựu sinh viên" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Trung tâm ngoại ngữ - tin học – bồi dưỡng văn hóa" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Viện chính sách kinh tế và kinh doanh" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Luật" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Mỹ thuật công nghiệp" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Điện – Điện tử" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Công nghệ thông tin" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Quản trị kinh doanh" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Môi trường và bảo hộ lao động" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Lao động công đoàn" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa Tài chính ngân hàng" },
        { _id: new mongoose.Types.ObjectId(), name_cate: "Khoa giáo dục quốc tế" },
        ];

    Categories.find(function(err,users){
        if(users.length) return;
        const data = Categories.insertMany(CategoriesArray);
        if (err) {
            return res.render('error',{err})
            }
        console.log("data",data);
        console.log('Categories successfully saved.');
    })
        
    User.find(function(err,users){
        if(users.length) return;
        bcrypt.hash("admin", saltRounds).then(function(hash){
            new User({
              _id: new mongoose.Types.ObjectId(),
              username:"admin",
              password:hash,
              fullname: "admin1",
              role: "admin",
          }).save(function(err) {
              if (err) {
                return res.render('addUser',{err})
              }
        
              console.log('User successfully saved.');
          });
          
          })
    })

}}
module.exports = mongoconnect



