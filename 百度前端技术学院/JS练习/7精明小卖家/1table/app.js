//表格初始化，创建表头
function tableInit([productsName,regionsName]){
	var data;
	var idFlag;
	productsName=productsName[0];
	regionsName=regionsName[0];
	for(i in sourceData){
		if(sourceData[i].product==productsName && sourceData[i].region==regionsName){
			data = sourceData[i];
			idFlag = i;
			break;
		}
		else{
			console.log('error');
		}
	}
	if(data!=undefined){
		var tableWrapper = document.getElementById('table-wrapper');
		//如果table存在就删除，新建
		if(tableWrapper.childNodes[0]){
			tableWrapper.childNodes[0].remove();
		}
		//新建table
		var frag = document.createDocumentFragment();
		var table = document.createElement('table');
		//第1行，表头
		var tr1 = document.createElement('tr');
		for(var i=1;i<15;i++){
			var th = document.createElement('th');
			if(i==1){
				th.innerHTML = '商品';
			}
			if(i==2){
				th.innerHTML = '地区';
			}
			if(i>2){
				th.innerHTML = (i-2) + '月';
			}
			tr1.appendChild(th);
		}
		//加入document
		table.appendChild(tr1);
		frag.appendChild(table);
		tableWrapper.appendChild(frag);
	}
		
}