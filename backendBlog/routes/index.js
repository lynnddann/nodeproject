var express = require('express');
var router = express.Router();
var User = require('../model/user')
var Shop = require('../model/shop')
var Shopgood = require('../model/shopgood')
/* GET home page. */
router.get('/', function(req, res, next) {

	if(req.session.lynnInfo){ //判断钥匙是否存在，如果存在就跳转到首页
		User.find({
			name:req.cookies['currentuser'],		
		}).then(result=>{
			//console.log(result) 结果是数组
			Shop.find({
				sellor:result[0].name
			}).then(result=>{
				if(result.length==0){
					res.render('index', { title: '卖家管理系统页面',name:req.cookies['currentuser'],isEmpty:true });
				}else{

					res.render('index', { title: '卖家管理系统页面',name:req.cookies['currentuser'],list:result,isEmpty:false});//获取到浏览器中的cookie
				}
			})		
			
		})
		
	}else{
		res.redirect('/login')//重定向到登录页面
	}
  
});

//点击注销时，销毁钥匙，并且重定向到login页面
router.get('/logout',function(req,res){
	req.session.destroy(function(){
		res.redirect('/login')
	})
})

router.get("/delete",function(req,res){
	Shop.findByIdAndRemove(req.query.id).then(result=>{
		//res.redirect("/");
		Shopgood.remove({
			shopname:result.shopname
		}).then(result=>{
			res.redirect("/")
		})
	})
})

module.exports = router;
