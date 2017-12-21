var express = require("express");
var router = express.Router();
var User = require('../model/user');
var md5 = require("md5")
router.get('/',function(req,res){
	res.render('login', {title:'登录页面',isShow:false})
});

router.post('/',function(req,res){//post用req.body获取
	User.find({       //在数据库中找有没有匹配的数据
		name:req.body.username,
		password:md5(req.body.password)
	}).then(result=>{
		//console.log(req.body.username)
		//console.log(req.body.password)
		//console.log(result)
		if(result.length==0){//在数据库中找不到匹配的数据
			res.render('login', {title:'登录页面',isShow:true})
		}else{
			req.session.lynnInfo = result[0]//给钥匙设置属性，判断钥匙是否是有效的
			res.cookie('currentuser',result[0].name)//设置cookie，用来动态改变首页右边欢迎你xxx
			res.redirect('/')
		}
	})
})


module.exports = router;