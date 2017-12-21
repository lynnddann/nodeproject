$(document).ready(function(){
	showTime()
})	
function showTime(){	
	var nowdate = new Date();
	var endtime = new Date("2017/11/11,24:00:00");
	var lefttime = parseInt((endtime.getTime() - nowdate.getTime())/1000); //相差的秒数
	var d = parseInt(lefttime/(24*60*60))//天数
	var h = parseInt(lefttime/(60*60)%24) //小时
	var m = parseInt(lefttime/60%60) //分钟
	var s = parseInt(lefttime%60) //秒数
	$('#showtime').html(d+'天'+h+'小时'+m+'分'+s+'秒')
	setTimeout(showTime,500)
}
	


$.ajax({
	url:"/list",
	data:{limit:3,offset:0}//每次要三条数据，拿的是第一，第二，第三条数据
}).done(function(result){
	console.log(result)
	list(result.list)
	function list(list){
		var $html ="";
		for(var i = 0;i<list.length;i++){
			$html+=`
				<div class="col-sm-6 col-md-4">
			        <div class="thumbnail">
			        <a href="#" class="thumbnail">
			          <img data-src="holder.js/100%x200" alt="100%x200" src="http://localhost:3000${list[i].pathname}" style="display:block;width:100%;height:200px;"/>
			          </a>
			          <div class="caption">
			            <h3>商品名称：${list[i].title}</h3>
			            <p>店铺名字：${list[i].shopname}</p>
			            <p class="content">商品介绍：${list[i].introduce}</p>
			            <p>商品价格：￥${list[i].price}<span style="float:right">商品库存:${list[i].num}</span></p>
			            
			            <p><a href="/detail.html?id=${list[i]._id}" class="btn btn-primary" role="button">查看详情</a> </p>
			          </div>
			        </div>
	      		</div>
			`
		}
		$(".row").append($html);
	}
	//动态创建第一组数据
	

	//动态创建分页数量
	for(var i=0;i<result.total;i+=3){
		$li = $("<li>").html(`<a>${i/3+1}</a>`);
		$li.on('click',function(){//为每一分页添加点击事件
			//console.log($(this).index()) 当前的索引
				$.ajax({
					url:"/list",
					data:{limit:3,offset:$(this).index()*3}
				}).done(function(result){
						$('.row').empty()//清空
						list(result.list)//再次渲染页面
				})
			})	
		$(".pagination").append($li);
	}	
});

//点击搜索框渲染出相应的商品
$('.btn').on('click',function(){
	var inputval = $('.form-control').val()
	console.log(inputval)
	$.ajax({
		url:'/search',
		data:{
			title:inputval
		}
	}).done(function(result){
		console.log(result)
		if(result.length==0){ //长度为0时，表示不存在这个商品
			$(".row").empty()
			$('.nothing').html("亲，抱歉目前还没有该商品哦~试试搜一搜其他商品吧~")
		}else{
			var $html ="";
			for(var i = 0;i<result.length;i++){
				$html+=`
					<div class="col-sm-6 col-md-4">
				        <div class="thumbnail">
				        <a href="#" class="thumbnail">
				          <img data-src="holder.js/100%x200" alt="100%x200" src="http://localhost:3000${result[i].pathname}" style="display:block;width:100%;height:200px;"/>
				          </a>
				          <div class="caption">
				            <h3>商品名称：${result[i].title}</h3>
				            <p>店铺名字：${result[i].shopname}</p>
				            <p class="content">商品介绍：${result[i].introduce}</p>
				            <p>商品价格：￥${result[i].price}<span style="float:right">商品库存:${result[i].num}</span></p>
				            
				            <p><a href="/detail.html?id=${result[i]._id}" class="btn btn-primary" role="button">查看详情</a> </p>
				          </div>
				        </div>
		      		</div>
				`
			}
			$(".pagination").empty()
			$('.nothing').empty()
			$(".row").empty()
			$(".row").append($html);
		}
	})
})


