
/*创建一个模型，建立对象与数据库中集合的一个映射*/
var mongoose = require("mongoose");

var Schema = mongoose.Schema;//概要计划，计划往数据库中准备存放哪些信息

var obj = {//存放的内容
	name:String,
	email:String,
	password:String
}

var model = mongoose.model("user",new Schema(obj));//建立一个模型，能访问数据库中users这张表的内容

module.exports = model;