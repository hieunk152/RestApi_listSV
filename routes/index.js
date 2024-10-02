var express = require('express');
var router = express.Router();
const { connect, Schema, model, Mongoose} = require('mongoose');
const {log} = require("debug");
//ket noi mongoose db
const mongoURI = 'mongodb+srv://admin:jT8Rfd91YpoisQkO@cluster0.mbz9o.mongodb.net/';

connect(mongoURI,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log("Connected to MongoDB successfully!")
}).catch((err=>{
  console.log("Connected to MongoDB fail",err);
}));

/* GET home page. */
router.get('/', function(req, res, next) {
  //req: request: du lieu gui len
  //res: respone: du lieu tra ve cho client
  CoSo.find({}).then((cosos)=>{
    res.render('index', { title: 'Danh sách các cơ sở',cosos:cosos });
  })
});
module.exports = router;
//Creat Object
const CosoSchema = new Schema({
  chiNhanh:String,
  diaDiem:String,
  slSV:Number,
  slGV:Number,
})
const CoSo =model("CoSo",CosoSchema);
//them du lieu
router.post('/themCS',function (req,res){
  const chiNhanh = req.body.chiNhanh;
  const diaDiem = req.body.diaDiem;
  const slSV = req.body.slSV;
  const slGV = req.body.slGV;
  const newCoSo = new CoSo({
    chiNhanh:chiNhanh,
    diaDiem:diaDiem,
    slSV:slSV,
    slGV:slGV
  })
  newCoSo.save().then(()=>{
    res.send('Thêm thành công')
  }).catch((error=>{
    res.send(error);
  }))
  //
})


router.get('/them',function (req,res){
  res.render('themCS')
})
//Xoa du lieu
router.get('/xoa/:id',function (req,res){
  const  id =  req.params.id;
  CoSo.findByIdAndDelete(id).then((coso)=>{
    res.send('Xoa thanh cong');
  }).catch((error)=>{
    res.send(error);
  })
})
//sua
router.get('/sua/:id',function (req,res){
  const id = req.params.id;
  CoSo.findById(id).then((coso)=>{
    res.render('suaCS',{coso:coso});

  })
})
router.post('/suacs/:id',function (req,res){
  const id = req.params.id;
  const chiNhanh = req.body.chiNhanh;
  const diaDiem = req.body.diaDiem;
  const slSV = req.body.slSV;
  const slGV = req.body.slGV;
  CoSo.findByIdAndUpdate(id,{
    chiNhanh:chiNhanh,
    diaDiem:diaDiem,
    slSV:slSV,
    slGV:slGV
  }).then((coso)=>{
    res.send('Sua thanh cong');
  }).catch((error)=>{
    res.send(error);
  })
})



