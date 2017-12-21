var express = require('express');
var router = express.Router();
var Shop = require('../model/shop')
/* GET home page. */
router.get('/', function(req, res, next) {

	res.render('goods', { title: '店铺信息',isShow:false,isRepeat:false,isNew:true});//获取到浏览器中的cookie
 
});


router.post('/',function(req,res){
	Shop.find({
		shopname:req.body.shopname
	}).then(result=>{
		//console.log(result)
		if(result.length==0){
			Shop.create({
				sellor:req.cookies['currentuser'],
				shopname:req.body.shopname,
				content:req.body.content
			}).then(result=>{
				//console.log(result)
				res.redirect('/')//重定向到首页
			})
		}else{
			res.render('goods', { title: '店铺信息',isShow:false,isRepeat:true,isNew:true })
		}
	})	
})



router.get('/fixed', function(req, res, next) {
	Shop.find({
		_id:req.query.id
	}).then(result=>{
		//console.log(req.query.id)
		res.cookie('shopnameold',result[0].shopname)
		res.render('goods',{title:"更新店铺信息",isNew:false,isRepeat:false,info:result[0]})
	})
	
});

router.post("/fixed",function(req,res){
	//console.log(req.body.shopname);//设置一个隐藏的输入框，里面放入当前店铺的id值，方便更新时查找获取
	Shop.findByIdAndUpdate(req.body.id,{$set:{shopname:req.body.shopname,content:req.body.content}},{new:true}).then(result=>{
		console.log(result.shopname)
		var result1 = result
		console.log(result1)
		if(req.cookies["shopnameold"] == result.shopname){
			res.redirect('/')
		}else{
			Shop.find({
				shopname:result.shopname
			}).then(result=>{
				console.log(result)
				if(result.length==1){
					res.redirect("/")
				}else{
					res.render('goods',{title:"更新店铺信息",isNew:false,isRepeat:true,info:result1})
				}
			})
		}
		
	})
})
module.exports = router;
