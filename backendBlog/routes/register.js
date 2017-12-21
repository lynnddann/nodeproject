var express = require("express");
var router = express.Router();
var User = require("../model/user"); //引入模型，可以访问users这张表
var md5 = require("md5"); //引入md5加密模块
router.get('/', function(req, res) {
    res.render('register', { title: '注册页面', isShow: false, isUser: false, isNone: false })
});

router.post('/', function(req, res) {

    if (req.body.username == "" || req.body.email == "" || req.body.password == "" ) {
        res.render('register', { title: '注册页面', isShow: false, isUser: false, isNone: true })
    } else {
        User.find({
        	name:req.body.username
        }).then(result=>{
        	console.log(result)
        	if(result.length==0){//该用户名在数据库中不存在，继续查找邮箱是否存在
        		User.find({
        			email:req.body.email
        		}).then(result=>{
        			if(result.length==0){//邮箱在数据库中不存在
 							User.create({
	        					name:req.body.username,
				    			email:req.body.email,
				    			password:md5(req.body.password)
	        				}).then(result=>{
	        					res.redirect('/login')
	        				})       				
        			}else{
        				res.render('register', { title: '注册页面', isShow: true, isUser: false, isNone: false })
        			}
        		})
        	}else{
        		res.render('register', { title: '注册页面', isShow: false, isUser: true, isNone: false })
        	}
        })
    }


    /*User.find({//在数据库中查找有没有这个数据
    	name:req.body.username,
    	email:req.body.email
    }).then(result=>{
    	console.log(result)
    	if(result.length==0){
    		User.create({
    			name:req.body.username,
    			email:req.body.email,
    			password:md5(req.body.password)
    		}).then(result=>{
    			res.redirect('/login')
    		})
    	}else{
    		res.render('register', {title:'注册页面',isShow:true,isUser:false})
    	}
    })*/

})
module.exports = router;