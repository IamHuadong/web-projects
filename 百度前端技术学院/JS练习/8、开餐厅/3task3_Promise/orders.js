//顾客点菜
function startOrder(){
	var customerWords=document.getElementById('customerWords');
	var p = new Promise(function(resolve,reject){
		var time=3;
		var int=setInterval(function(){
			customerWords.innerHTML='点菜中，'+'还有'+time+'s点完';						
			if(time==0){
				customerWords.innerHTML='等上菜';
				//清楚定时
				clearInterval(int);
				customer.order(menu);				
				//显示点的菜list
				var customerLists=document.getElementById('customerLists');
				var frag=document.createDocumentFragment();
				for(var i=0;i<menu.dishesSelected.length;i++){
					var li=document.createElement('li');
					var index=menu.dishesSelected[i];
					li.id=index;
					li.innerHTML=menu.dishes[index].name+'><span>还未上</span>';
					frag.appendChild(li);
				}
				customerLists.appendChild(frag);
				resolve();	
			}
			time--;
		},1000);
	});
	return p;
}
//告诉服务员点了菜
function tellWaiter(){
	var dishes=[];
	for(i in menu.dishesSelected){
		dishes.push(menu.dishes[menu.dishesSelected[i]].name);
	}
	dishes.join(',');
	var conts='顾客点了：'+dishes;
	imgMove('waiter',200,conts);
	var p = new Promise(function(resolve,reject){	
		resolve(menu);
	});
	return p;
}
//厨师做饭
function cooking(){
	var unCooked=menu.dishesSelected.length;
	//在html显示
	var cookWords=document.getElementById('cookWords');
	var ul=document.getElementById('cookLists');
	//还有菜要做
	if(unCooked!=0){
		//在html显示待做的菜
		if(!ul.childNodes[0]){
			var frag=document.createDocumentFragment();
			for(var i=1;i<menu.dishesSelected.length;i++){
				var li=document.createElement('li');
				var index=menu.dishesSelected[i];
				li.innerHTML=menu.dishes[index].name;
				frag.appendChild(li);
			}
			ul.appendChild(frag);
		}
		//做菜
		var dishIndex=menu.dishesSelected[0];
		var dish=menu.dishes[dishIndex];
		var name=dish.name;
		var time=dish.time;
		//承诺
		var p=new Promise(function(resolve){
			var int=setInterval(function(){
				cookWords.innerHTML='正在做>'+name+',<br>还有'+time+'s做完';
				time--;
				if(time<0){
					clearInterval(int);
					var currentDish=menu.dishesSelected.shift();//做完移除，做下一道菜
					if(ul.childNodes[0]){
						ul.childNodes[0].remove();//要做的菜移除
					}		
					menu.cooked.push(currentDish);//加入做好的菜表
					//做好菜叫服务员
					var unCooked=menu.dishesSelected.length;
					if(menu.cooked.length==1 && unCooked!=0){
						holdDish(menu).then(function(){
							var li=document.getElementById(currentDish);
							var span=li.getElementsByTagName('span')[0];
							span.innerHTML='已上';
							holdDish(menu);
						}).then(function(){
							eating(currentDish);
						});
					}
					else{
						imgMove('waiter',600,'上菜：'+name).then(function(){
							var li=document.getElementById(currentDish);
							var span=li.getElementsByTagName('span')[0];
							span.innerHTML='已上';
						}).then(function(){
							imgMove('waiter',600,'全部菜上完');
							eating(currentDish).then(function(){
								pay(menu);//付钱
							});
						});
					}				
					resolve();
				}
			},1000);
		});
		//做下一道,递归实现
		return p.then(cooking);
	}
	else{//做完了
		var p2=new Promise(function(resolve){
			cookWords.innerHTML='空闲';
			ul.innerHTML='做完了';
			resolve();
		});
		return p2;
	}
}
//上菜
function holdDish(menu){
	if(menu.cooked.length!=0){
		var currentIndex=menu.cooked[0];
		var theDish=menu.dishes[currentIndex].name;
		menu.cooked.shift();
		return imgMove('waiter',600,'上菜：'+theDish).then(function(){
			imgMove('waiter',200,'取餐！');
		});
	}
	
}
//吃完，等厨师菜都做完才吃完
function eating(currentIndex){
	var p=new Promise(function(resolve,reject){
		var time=3;
		var li=document.getElementById(currentIndex);
		var span=li.getElementsByTagName('span')[0];
		var int=setInterval(function(){
				span.innerHTML='还有'+time+'s吃完';
				time--;
				if(time==0){
					clearInterval(int);
					span.innerHTML='吃完了';
					resolve();
				}
			},1000);
	});
		return p;
}
//付款
function pay(menu){
	var price=0;
	for(i in menu.cooked){
		var dish=menu.dishes[menu.cooked[i]];
		price=price+dish.price;
	}
	imgMove('waiter',600,'付款:'+price+'元');
	//饭店金额
	restaurant1.cash+=price;
}
