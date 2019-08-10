//服务顾客用餐
function service(customer,waiter,cook,menu){
	console.log('.........................');	
	if(customer.eated){
		console.log('已经吃了');
	}
	else{
		console.log('还没吃，开始点菜');
		//点菜服务
		waiter.helpDish(customer,menu);
		// 告诉厨师做菜
		cook.cookDish(waiter,menu);
		//服务员上菜
		var served=waiter1.serveDish(cook);
		//顾客用餐
		if(served){
			customer.eat();
		}
		else{
			console.log('还没吃完');
		}
	}
	
}