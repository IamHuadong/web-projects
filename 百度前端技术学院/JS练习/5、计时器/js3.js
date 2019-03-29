var eles = document.getElementsByTagName("body")[0];
var years = document.getElementById("year-select");
var months = document.getElementById("month-select");
var days = document.getElementById("day-select");//天
var hour = document.getElementById("hour-select");
var minute = document.getElementById("minute-select");
var second = document.getElementById("second-select");
years.appendChild(creates(2000,2032,'option'));
months.appendChild(creates(1,12,'option'));
days.appendChild(creates(1,31,'option'));//天
hour.appendChild(creates(0,23,'option'));
minute.appendChild(creates(0,59,'option'));
second.appendChild(creates(0,59,'option'));

//选择事件
eles.onchange = function(event){
	var indexyear = years.selectedIndex;
	var valyear = years.options[indexyear].value;//年份
	
	var indexmonth = months.selectedIndex;
	var valmonth = months.options[indexmonth].value;//月份


	var indexhour = hour.selectedIndex;
	var valhour = hour.options[indexhour].value;//时

	var indexminute = minute.selectedIndex;
	var valminute = minute.options[indexminute].value;//分

	var indexsecond = second.selectedIndex;
	var valsecond = second.options[indexsecond].value;//秒
	//年份和月份改变，则新建日数
	if(event.target == months || event.target == years){
		//31天的月份
		if(isMonth(valmonth,[1,3,5,7,8,10,12])){
			days.options.length = 0;
			days.appendChild(creates(1,31,'option'));
		}
		//30天的月份
		if(isMonth(valmonth,[4,6,9,11])){
			days.options.length = 0;
			days.appendChild(creates(1,30,'option'));
		}
		//2月
		if(valmonth==2){
			days.options.length = 0;
			//闰年
			if(isRun(valyear)){
				days.appendChild(creates(1,29,'option'));
			}
			//平年
			else{
				days.appendChild(creates(1,28,'option'));
			}
			
		}
	}
		
	var indexday = days.selectedIndex;
	var valday = days.options[indexday].value;//日

	var ptx = document.getElementById("result-wrapper");
	//返回时间格式
	var timeform = txTime(valyear,valmonth,valday,valhour,valminute,valsecond);
	//返回相差天数
	var timesub = subday(valyear,valmonth,valday,valhour,valminute,valsecond);
	ptx.innerHTML = '现在距离'+' '+timeform+' '+timesub;
		
};

//批量创建新节点并加入片段
function creates(start,end,elementName){
	var frag = document.createDocumentFragment();
	for(var i = start;i<=end;i++){
		var ele = document.createElement(elementName);
		ele.value = i;
		ele.innerHTML = i;
		frag.appendChild(ele);
	}
	return frag;
}
//判断是否闰年，是return1
function isRun(year){
	if((year % 4 == 0) && (year % 100 != 0)){
		return 1;
	}
	else{
		return 0;
	}
}
//判断是否等于某些月份
function isMonth(month,months){
	var flg = 0;
	for(var i=0;i<months.length;i++){
		if(month==months[i]){
			flg = 1;
			break;
		}
	}
	return flg;
}
//返回时间格式
function txTime(year,month,day,hour,minute,second){
	var mydate = new Date();
	mydate.setFullYear(year,month-1,day);
	var weekday = new Array(7);
	weekday[0] = "天";
	weekday[1] = "一";
	weekday[2] = "二";
	weekday[3] = "三";
	weekday[4] = "四";
	weekday[5] = "五";
	weekday[6] = "六";
	var nowday = weekday[mydate.getDay()];
	return year+'年'+month+'月'+day+'日'+' '+'星期'+nowday+' '+hour+':'+minute+':'+second; 
}

//返回相差天数
function subday(year,month,day,hour,minute,second){
	var nowdate = new Date();
	//设置时间
	var mydate = new Date();
	mydate.setFullYear(year,month-1,day);
	mydate.setHours(hour);
	mydate.setMinutes(minute);
	mydate.setSeconds(second);
	var sub = nowdate-mydate;
	var sign;
	if(sub<0){
		sign=0;//还有
	}
	else{
		sign=1;//已经过去
	}
	//计算相差时间
	sub = Math.abs(sub);
	var oneday = 24*60*60*1000;
	var onehour = 60*60*1000;
	var oneminute = 60*1000;
	var day = Math.floor(sub/oneday);
	var hour = Math.floor(sub%oneday/onehour);
	var minute = Math.floor(sub%oneday%onehour/oneminute);
	var second = Math.floor(sub%oneday%onehour%oneminute/1000);
	//显示格式
	var distime = day+'天'+hour+'小时'+minute+'分'+second+'秒';
	if(sign==0){
		return '还有'+distime;
	}
	else if(sign==1){
		return '已经过去'+distime;
	}
}