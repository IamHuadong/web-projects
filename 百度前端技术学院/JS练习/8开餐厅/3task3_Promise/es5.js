//餐厅类
function Restaurant(obj){
	this.cash=obj.cash;
	this.seats=obj.seats;
	this.staff=obj.staff;
	this.menu=obj.menu;
}
Restaurant.prototype.hire=function(staff){//招聘
	this.staff.push(staff);
	if(staff.ID==undefined){
		staff.ID=this.staff.length;//之前没有ID给ID
	}	
}
Restaurant.prototype.fire=function(staff){//开除
	const index=this.staff.indexOf(staff);
	if(index!=-1){
		this.staff.splice(index,1);
	}
	else{
		console.log('该员工不存在');
	}	
}
//顾客类
function Customer(){
	this.eated=false;
	this.name=null;
}
Customer.prototype.order=function(menu){
	var names=menu.dishes;
	//随机点菜
	var num=Math.floor(Math.random()*names.length)+1;//随机点菜个数，不能为0
	//随机点num个菜
	for(var i=0;i<num;i++){
		var index=Math.floor(Math.random()*names.length);
		var findIndex=menu.dishesSelected.indexOf(index);
		if(findIndex!=-1){
			i--;//重复的菜重新点
		}
		else{
			menu.dishesSelected.push(index);
		}
	}
}

//菜单类
function Menu(){
	//菜单
	this.dishes=[
					{name:'鱼香肉丝',price:30,time:3},
					{name:'红烧肘子',price:50,time:4},
					{name:'清蒸鲈鱼',price:65,time:4},
					{name:'霸王别姬',price:120,time:5},
					{name:'打卤面',price:239,time:5}
				];
	//顾客选中的菜
	this.dishesSelected=[];
	this.cooked=[];
}
