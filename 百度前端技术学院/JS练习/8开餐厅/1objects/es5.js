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
Staff.prototype.finishWork=function(){
	console.log('im staff');
}
//服务员类
function Waiter(name,salary){
	Staff.call(this,name,salary);
}
Waiter.prototype=Object.create(Staff.prototype);
Waiter.prototype.constructor=Waiter;
Waiter.prototype.finishWork=function(){
	console.log('im waiter');
}
//厨师类
function Cook(name,salary)
{
	Staff.call(this,name,salary);
}
Cook.prototype=Object.create(Staff.prototype);
Cook.prototype.constructor=Cook;
Cook.prototype.finishWork=function(){
	console.log('im cook');
}
//顾客类
function Customer(){

}
Customer.prototype.order=function(){
	console.log('order');
}
Customer.prototype.eat=function(){
	console.log('eat');
}

//菜品类
function Dish(name,cost,price){
	this.name=name;
	this.cost=cost;
	this.price=price;
}