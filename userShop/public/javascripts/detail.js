$.ajax({
	url:"/detail",
	data:{
		id:window.location.search.substring(window.location.search.indexOf("?")+1).split("=")[1]
	}
}).done(function(result){
	var $html = "";
	for(var i = 0;i<result.length;i++){
		$html+=`
			<div class="panel-heading"><span>商品名称:</span>${result[i].title}</div>
			  <div class="panel-body">
			    <p>商品简介：${result[i].introduce}</p>
			  </div>

			  <ul class="list-group">
			  	<li class="list-group-item"><span>店铺名字：</span>${result[i].shopname}</li>
			  	<li class="list-group-item"><span>商品规格：</span>${result[i].type}</li>
			    <li class="list-group-item"><span>商品价格：</span>${result[i].price}</li>
			    <li class="list-group-item"><sapn>商品库存：</sapn>${result[i].num}</li>
			    <li class="list-group-item"><sapn style="float:left">商品图片：</sapn><img src="http://localhost:3000${result[i].pathname}"/></li>
			    <li class="list-group-item"><a href="/main.html">返回首页</a></li>
			  </ul>
		`
	}
	$('.panel').append($html)
})