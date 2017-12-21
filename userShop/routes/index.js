var express = require('express');
var router = express.Router();
var Shopgood = require(('../model/shopgood'))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list',function(req,res){
	var limit = req.query.limit; //前端在地址栏上返回的值，limit表示每次看的数量
	var offset = req.query.offset;//offset表示跳过的数量
	Promise.all([Shopgood.count(),Shopgood.find({},{},{limit:limit,skip:offset})]).then(result=>{
		res.send({
			total:result[0],
			list:result[1]
		})
	})
});

router.get('/detail',function(req,res){
	Shopgood.find({
		_id:req.query.id
	}).then(result=>{
		res.send(result)
	})
});

router.get('/search',function(req,res){

	Shopgood.find({
		title:req.query.title
	}).then(result=>{
		res.send(result)
	})
})

module.exports = router;
