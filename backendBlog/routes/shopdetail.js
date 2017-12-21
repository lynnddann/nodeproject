var express = require('express');
var router = express.Router();
//var Shopgood = require('../model/shopgood');
var Shop = require('../model/shop')
/* GET home page. */
router.get('/', function(req, res, next) {
	Shop.find({
		_id:req.query.id	
	}).then(result=>{
		console.log(req.query.id)
		console.log(result)
		//console.log(req.cookies['shopname'] )
		res.render('shopdetail',{title:"店铺详细信息",info:result[0]})
	})		
});



module.exports = router;
