//单例模式
//服务员类
var CreateWaiter=(
	function(name,salary){
		var instance;
		return function(name,salary){
			if(!instance){
				instance=new Waiter(name,salary);
			}
			return instance;
		}
	})();

//厨师类
var CreateCook=(
	function(name,salary){
		var instance;
		return function(name,salary){
			if(!instance){
				instance=new Cook(name,salary);
			}
			return instance;
		}
	})();

