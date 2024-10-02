var express = require('express');
var router = express.Router();
const { Schema, model,Mongoose } = require("mongoose");


router.get('/', function(req, res, next) {
  //req: request: du lieu gui len
  //res: respone: du lieu tra ve cho client
User.find({}).then((users)=>{
    res.render('showInfoUser', { title: 'Danh sách các User',users:users });
  })
});


// Khai báo trường dữ liệu trong CSDL Mongo
const UserSchema = new Schema({
  email: String,
  password: String,
  nameUser: String,
});

// Tạo Model User
const User = model("User", UserSchema);

// Thêm người dùng
router.post('/users', function(req, res) {
  const { email, password, nameUser } = req.body;

  const newUser = new User({
    email: email,
    password: password,
    nameUser: nameUser,
  });

  newUser.save()
      .then(() => {
        // Trả về phản hồi dạng JSON cho frontend
        res.status(200).json({ success: true, message: 'Thêm thành công' });
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi thêm người dùng.' });
      });
});

// Trang thêm người dùng
router.get('/themUS', function(req, res) {
  res.render('themUser');
});

// Xóa người dùng
router.get('/xoa/:id', function(req, res) {
  const id = req.params.id;
  User.findByIdAndDelete(id)
      .then(() => {
        // Trả về phản hồi dạng JSON cho frontend
        res.status(200).json({ success: true, message: 'Xóa thành công' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi xóa người dùng.' });
      });
});

//Sua user
router.get('/sua/:id', function(req, res) {
  const id = req.params.id;
  User.findById(id).then((user)=>{
    res.render('suaUser',{user:user});
  })
})
//fill info on UI
router.post('/suaUser/:id',function(req,res){
  const id = req.params.id;
  const {email, password,nameUser} = req.body;
  User.findByIdAndUpdate(id,{
    email: email,
    password: password,
    nameUser: nameUser,
  }).then((user)=>{
    res.status(200).json({success:true, message: 'Sửa thành công'});
  }).catch((error)=>{
    console.error(error);
    res.status(500).json({ message: 'Đã xảy ra lỗi khi sửa người dùng.' });
  });
})
module.exports = router;
