window.onload = function(){
 	document.getElementById("client").oninput = function(){
 		inprove("client");
 	}
 	document.getElementById("mima").oninput = function(){
 		inprove("mima");
 	}
} 


 function inprove(attr) {
 	var disp = document.getElementById("disp");
 	var got = document.getElementById(attr);
 	if(got.value==""){
 		disp.innerHTML = "请输入用户名和密码！";
 	}
 	else if(got.value.length < 6 || got.length > 12){
 		disp.innerHTML = "用户名和密码要6-12位";
 	}
 	else{
 		disp.innerHTML = "格式正确";
 	}
 }









