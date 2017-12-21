var express = require('express');
var router = express.Router();
var Shopgood = require('../model/shopgood');
var Shop = require('../model/shop')
/* GET home page. */
router.get('/', function(req, res, next) {
	var limit = req.query.limit;
	var offset = req.query.offset;
	Promise.all([Shopgood.count({shopname:req.query.id}),Shopgood.find({shopname:req.query.id},{},{limit:limit,skip:offset})])
	/*Shopgood.find({
		//shopname: req.cookies['shopname']
		shopname:req.query.id	
	},)*/.then(result=>{
		console.log(req.query.id)
		console.log(result)
		if(result.length==0){
			res.render('goodsdetail',{title:"商品列表信息",isEmpty:true,id:req.query.id})
		}else{
			res.render('goodsdetail',{title:"商品列表信息",info:result,isEmpty:false})
		}
		
	})		
});

router.get('/item', function(req, res, next) {
	Shopgood.find({
		//shopname: req.cookies['shopname']
		_id:req.query.id	
	}).then(result=>{
		//console.log(req.query.id)
		console.log(result)
		//console.log(req.cookies['shopname'] )
		res.render('item',{title:"商品详细信息",info:result[0]})
	})		
});


router.get("/deletegoods",function(req,res){
	Shopgood.findByIdAndRemove(req.query.id).then(result=>{
		//res.render('goodsdetail',{title:"商品详细信息",info:result})
		//console.log(result)
		res.redirect('/goodsdetail?id='+result.shopname+'')
	})
})


module.exports = router;
