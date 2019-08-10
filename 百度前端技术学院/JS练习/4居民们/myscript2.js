var btns = document.getElementsByTagName("button");
var press = document.getElementsByTagName("div")[1];
var a = document.getElementById("radio-a");
var b = document.getElementById("radio-b");
var str_a = document.getElementById("str-a");
var str_b = document.getElementById("str-b");
var num_a = document.getElementById("num-a");
var num_b = document.getElementById("num-b");
var tx = document.getElementById("result");
press.onclick = function(event){
	// 选择的内容
	var choosed,txele;
	if(a.checked){
		txele = str_a;
		choosed = str_a.value;
	}
	else if(b.checked){
		txele = str_b;
		choosed =str_b.value;
	}
	// 对应按钮按下
	switch(event.target){
		case btns[0]:// 获取长度
			tx.innerHTML = choosed.length;
			break;
		case btns[1]:// 获取第3个字符
			tx.innerHTML = choosed[2];
			break;
		case btns[2]:// 连接
			tx.innerHTML = str_a.value.concat(str_b.value);
			break;
		case btns[3]:// B在A首次出现位置
			tx.innerHTML = str_a.value.indexOf(str_b.value);
			break;
		case btns[4]:// A在B末次出现位置
			tx.innerHTML = str_b.value.lastIndexOf(str_a.value);
			break;
		case btns[5]:// 截取选中的内容
			tx.innerHTML = choosed.slice(num_a.value,num_b.value);
			break;
		case btns[6]:// 选中输入框的行数
			tx.innerHTML = Math.ceil(choosed.length/txele.cols);
			break;
		case btns[7]:// 截取子字符串
			tx.innerHTML = choosed.substr(num_a.value,num_b.value);
			break;
		case btns[8]:// 换大写
			tx.innerHTML = choosed.toUpperCase();
			break;
		case btns[9]:// 换小写
			tx.innerHTML = choosed.toLowerCase();
			break;
		case btns[10]:// 去除半角空格，正则表达式
			tx.innerHTML = choosed.replace(/ /g,"");
			break;
		case btns[11]:// 替换选中内容的a位另一框
			tx.innerHTML = choosed.replace(/a/g,str_b.value);
			break;
		default:
			break;
	}
}