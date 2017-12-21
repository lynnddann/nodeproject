
/*创建一个模型，建立对象与数据库中集合的一个映射*/
var mongoose = require("mongoose");

var Schema = mongoose.Schema;//概要计划，计划往数据库中准备存放哪些信息

var obj = {//存放的内容
	title:String,
	introduce:String,
	price:String,
	num:String,
	shopname:String,
	pathname:String,
	type:String
}

var model = mongoose.model("shopgood",new Schema(obj));//建立一个模型，能访问数据库中shops这张表的内容

module.exports = model;