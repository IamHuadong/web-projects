document.getElementById("input_name").oninput = function(){
	var name = document.getElementById("input_name");
	var disp = document.getElementById("name");
	if(name.value.charCodeAt(0) >= 48 && name.value.charCodeAt(0) <= 57){
		disp.innerHTML = "首字母不能为数字";
		disp.style.color = "red";
	}
	else if(name.value.length < 6 || name.value.length > 12){
		disp.innerHTML = "用户名要6-12位";
		disp.style.color = "red";
	}
	
	else{
		disp.innerHTML = "格式正确";
		disp.style.color = "#2D9900";
	}
}

document.getElementById("input_nickname").oninput = function(){
	var name = document.getElementById("input_nickname");
	var disp = document.getElementById("nickname");
	if(name.value.length < 2){
		disp.innerHTML = "昵称至少2位";
		disp.style.color = "red";
	}
	else{
		disp.innerHTML = "格式正确";
		disp.style.color = "#2D9900";
	}
}

document.getElementById("input_pwd").oninput = function(){
	var name = document.getElementById("input_pwd");
	var disp = document.getElementById("pwd");
	if(name.value.length < 6 || name.value.length > 12){
		disp.innerHTML = "密码要6-12位";
		disp.style.color = "red";
	}
	
	else{
		disp.innerHTML = "格式正确";
		disp.style.color = "#2D9900";
	}
}

document.getElementById("input_identifypwd").oninput = function(){
	var input_identifypwd = document.getElementById("input_identifypwd");
	var input_pwd = document.getElementById("input_pwd");
	var disp = document.getElementById("identifypwd");
	if(input_pwd.value != input_identifypwd.value){
		disp.innerHTML = "两次密码不一致";
		disp.style.color = "red";
	}
	else{
		disp.innerHTML = "正确";
		disp.style.color = "#2D9900";
	}
}

document.getElementById("input_phonenumber").oninput = function(){
	var input_phonenumber = document.getElementById("input_phonenumber");
	var phonenumber = document.getElementById("phonenumber");
	if(input_phonenumber.value.length != 11){
		phonenumber.innerHTML = "位数不对";
		phonenumber.style.color = "red";
	}
	else{
		phonenumber.innerHTML = "格式正确";
		phonenumber.style.color = "#2D9900";
	}
}

document.getElementById("gotnumber").oninput = function(){
	var gotnumber = document.getElementById("gotnumber");
	var disp = document.getElementById("mess");
	if(Number(gotnumber.value) != 1234){
		disp.innerHTML = "验证码不正确";
		disp.style.color = "red";
	}
	else{
		disp.innerHTML = "正确";
		disp.style.color = "#2D9900";
	}
}