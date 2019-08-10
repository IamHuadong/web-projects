//餐厅类
function Restaurant(obj){
	this.cash=obj.cash;
	this.seats=obj.seats;
	this.staff=obj.staff;
}
Restaurant.prototype.hire=function(staff){
	this.staff.push(staff);//招聘
	if(staff.ID==undefined){
		staff.ID=this.staff.length;//之前没有ID给ID
	}	
}
Restaurant.prototype.fire=function(staff){
	const index=this.staff.indexOf(staff);
	if(index!=-1){
		this.staff.splice(index,1);//开除
	}
	else{
		console.log('该员工不存在');
	}	
}
//职员类
function Staff(name,salary){
	this.ID=null;
	this.name=name;
	this.salary=salary;
}
// Staff.prototype.finishWork=function(){
// 	console.log('im staff');
// }
//服务员类
function Waiter(name,salary){
	Staff.call(this,name,salary);
	this.orderDish=null;
}
Waiter.prototype=Object.create(Staff.prototype);
Waiter.prototype.constructor=Waiter;
// 点菜服务
Waiter.prototype.helpDish=function(customer,menu){
	//顾客点菜
	var dishIndex=customer.order(menu);
	this.orderDish=menu[dishIndex];
	console.log('顾客点了<'+menu[dishIndex].name+'>');

}
//上菜
Waiter.prototype.serveDish=function(cook){
	if(cook.cooked){
		cook.cooked=false;
		console.log('上菜咯!<'+this.orderDish.name+'>到');
		return true;
	}
	else{
		console.log('菜还在做，请稍等');
		return false;
	}
}

//厨师类
function Cook(name,salary)
{
	Staff.call(this,name,salary);
	this.cooked=false;
}
Cook.prototype=Object.create(Staff.prototype);
Cook.prototype.constructor=Cook;
//做菜
Cook.prototype.cookDish=function(waiter,menu){
	var orderDish=waiter.orderDish;
	if(orderDish){
		console.log('厨师开始做<'+orderDish.name+'>');
		this.cooked=true;
		console.log('菜做好了');
	}
	else{
		return;
	}
}

//顾客类
function Customer(){
	this.eated=false;
}
Customer.prototype.order=function(menu){
	//随机点菜
	return menuRandom(menu);
}
//用餐
Customer.prototype.eat=function(){
	this.eated=true;
	console.log('吃完了');
}

//菜品类
function Dish(name,cost,price){
	this.name=name;
	this.cost=cost;
	this.price=price;
}
//随机点菜
function menuRandom(menu){
	var index=Math.floor(Math.random()*menu.length);
	return index;
}