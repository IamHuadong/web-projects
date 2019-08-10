//继承超类,寄生组合式继承
function extend(subType,superType){
	function F(){};
	F.prototype=superType.prototype;//继承超类方法
	var pro=new F();
	pro.constructor=subType;
	subType.prototype=pro;
}
//职业工厂
var FactoryProfession=function(){}; 
FactoryProfession.prototype={
	createPro:function(profession,name,salary){
		var pro;

		switch(profession){
			case 'waiter':
				extend(Waiter,Staff);//继承超类属性和方法
				pro=new Waiter(name,salary);
				break;
			case 'cook':
				extend(Cook,Staff);//继承超类属性和方法
				pro=new Cook(name,salary);
				break;
			default:
				alert('没有这个职业！');
		}
		return pro;
	}
};

//职员类
function Staff(name,salary){
	this.ID=null;
	this.name=name;
	this.salary=salary;
}
Staff.prototype.finishWork=function(){
	console.log('im'+this.name);
}
//服务员类
function Waiter(name,salary){
	Staff.call(this,name,salary);
	this.orderDish=null;
}

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

