

//匹配用户名
$('#username').on('blur',function(){
	var $usernameF = $('#username').val();
	var reg1 = /[0-9A-Za-z\u4e00-\u9fa5]{6,20}/;
	if($usernameF==""){
		$('.span1').html("用户名不能为空");
		$('.span1').css("color","red");
	
	}else{
		if(reg1.test($usernameF)){
		$('.span1').html("√");
		$('.span1').css("color","green")
	
		}else{
			$('.span1').html("用户名格式错误");
			$('.span1').css("color","red")
			
		}
	}	
})



//匹配密码
$('#password').on('blur',function(){
	var $passwordF = $('#password').val();
	var reg2 = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
	if($passwordF==""){
		$('.span2').html("请输入密码");
		$('.span2').css("color","red");
		
	}else{
		if(reg2.test($passwordF)){
		$('.span2').html("√");
		$('.span2').css("color","green")
		bstop = false;
		}else{
			$('.span2').html("密码格式错误");
			$('.span2').css("color","red")
			

		}
	}	
})



//再次输入密码

$('#password2').on('blur',function(){
	var $password2F = $('#password2').val();
	if($password2F==""){
		$('.span3').html("请确认密码");
		$('.span3').css("color","red");
		
	}else{
		if($password2F==$('#password').val()){
		$('.span3').html("√");
		$('.span3').css("color","green");
		
		}else{
			$('.span3').html("密码不一致");
			$('.span3').css("color","red");
			
		}
	}	
})

function check(){
	var $passwordF = $('#password').val();
	var reg1 = /^([a-z0-9\.\@\!\#\$\%\^\&\*\(\)]){6,20}$/i;
	var $password2F = $('#password2').val();
    if(!reg1.test($passwordF) || $passwordF!=$password2F ){ //密码格式不正确或者两次密码输入不一致时，阻止跳转
        return false;
    }else{
        return true;//不写此返回值也行，此时就直接提交了
    }
}





