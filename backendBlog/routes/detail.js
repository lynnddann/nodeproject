var express = require('express');
var fs = require("fs");
var path = require("path");
var router = express.Router();
var Shopgood = require('../model/shopgood');
var Shop = require('../model/shop');

//配置multer,设置存贮路径以及文件名字
//
var multer = require("multer")
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,"public/pictures")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })



/* GET home page. */
router.get('/', function(req, res, next) {
	Shop.find({
		shopname:req.query.id
	}).then(result=>{
		//console.log(req.query.id)
		res.cookie("shopname",req.query.id)
		res.render('detail',{title:"商品信息",shopname:result[0].shopname,isNew:true})
	})
	
});



router.post('/',upload.single('picture'),function(req,res){	//upload.single('picture')input输入框的name值
	//console.log(req.cookies['shopname'])
	//.log(req.file)
	//console.log(req.body)
		Shopgood.create({
		 	title:req.body.title,
			introduce:req.body.introduce,
			price:req.body.price,
			num:req.body.num,
			shopname:req.cookies['shopname'],
			pathname:`/pictures/${req.file.filename}`,
			type:req.body.type
	 }).then(result=>{
	 	console.log(result)
	 		res.redirect('/goodsdetail?id='+req.cookies['shopname']+'')
	 	})
})

router.get('/fixed', function(req, res, next) {
	Shopgood.find({
		_id:req.query.id
	}).then(result=>{
		//console.log(req.query.id)
		res.render('detail',{title:"更新商品信息",shopname:result[0].shopname,isNew:false,info:result[0]})
	})
	
});




router.post("/fixed",upload.single('picture'),function(req,res){
	//console.log(req.body.search)设置一个隐藏的输入框，里面放着原商品的路径
	//console.log(req.body.pp);//设置一个隐藏的输入框，里面放入当前商品的id值，方便更新时查找获取
	//console.log(req.file)
	if(req.file){ //如果存在req.file的话表示图片已经修改，删除原来的
		fs.unlink(path.join(__dirname,"../public/"+req.body.search))
	}
	Shopgood.findByIdAndUpdate(req.body.id,{$set:{
		title:req.body.title,
		introduce:req.body.introduce,
		price:req.body.price,
		num:req.body.num,
		//判断有没有req.file如果有的话就取输入框中的值，如果没有的话就取原商品的路径也就是隐藏的输入框里的值
		pathname: req.file ? `/pictures/${req.file.filename}`:req.body.search
	}}).then(result=>{
		//console.log(result.pathname)
		res.redirect('/goodsdetail?id='+result.shopname+'');		
	})
})

module.exports = router;
