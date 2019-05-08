//餐厅类
class Restaurant{
	constructor(obj){
		this.cash=obj.cash;
		this.seats=obj.seats;
		this.staff=obj.staff;
	}
	hire(staff){
		this.staff.push(staff);//招聘
		if(staff.ID==undefined){
			staff.ID=this.staff.length;//之前没有ID给ID
		}	
	}
	fire(staff){
		const index=this.staff.indexOf(staff);
		if(index!=-1){
			this.staff.splice(index,1);//开除
		}
		else{
			console.log('该员工不存在');
		}	
	}
}
//职员类
class Staff{
	constructor(name,salary){
		this.ID=null;
		this.name=name;
		this.salary=salary;
	}
	finishWork(){
		console.log('im staff');
	}
}
//服务员类
class Waiter extends Staff{
	constructor(name,salary){
		super(name,salary);
	}
	finishWork(){
		console.log('im waiter');
	}
}
//厨师类
class Cook extends Staff{
	constructor(name,salary){
		super(name,salary);
	}
	finishWork(){
		console.log('im cook');
	}
}
//顾客类
class Customer{
	order(){
		console.log('order');
	}
	eat(){
		console.log('eat');
	}
}
//菜品类
class Dish{
	constructor(name,cost,price){
		this.name=name;
		this.cost=cost;
		this.price=price;
	}
}