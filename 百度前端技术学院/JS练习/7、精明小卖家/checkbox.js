//选中事件逻辑函数
function logic(event,divId){
	var selected = document.getElementById(divId);
	var inputs = selected.getElementsByTagName('input');
	//全选事件
	if(event.target.value=='全选'){
		for(var i=0;i<inputs.length;i++){
			inputs[i].checked=true;
		}
	}//单个事件
	else{
		var selectedNumber=0;//选中个数
		for(var j=0;j<inputs.length-1;j++){
			if(inputs[j].checked==true){
				selectedNumber++;
			}
		}
		// 当前点击是否是唯一一个选中的
		if(selectedNumber==0){
			event.target.checked=true;
		}
		//是否满足全选
		if(selectedNumber==3){
			inputs[inputs.length-1].checked=true;
		}
		else{
			inputs[inputs.length-1].checked=false;
		}
	}
}
//获取选中的数据
function getSelectedData(){
	//商品选中
	var selectProduct = document.getElementById('product-radio-wrapper');
	var productsInputs = selectProduct.getElementsByTagName('input');
	var productsName = [];
	for(var i=0;i<productsInputs.length-1;i++){
		if(productsInputs[i].checked==true){
			productsName.push(productsInputs[i].value);
		}
	}
	//地区选中
	var selectRegion = document.getElementById('region-radio-wrapper');
	var regionsInputs = selectRegion.getElementsByTagName('input');
	var regionsName = [];
	for(var i=0;i<regionsInputs.length-1;i++){
		if(regionsInputs[i].checked==true){
			regionsName.push(regionsInputs[i].value);
		}
	}
	return [productsName,regionsName];
}
//返回选中信息
function tableInfo(){
	var tableRow = [];
	//选中内容
	var [productsName, regionsName] = getSelectedData();
	//销售信息编号
	
	for(i in productsName){
		for(j in regionsName){
			for(s in sourceData){
				if(productsName[i] == sourceData[s].product && regionsName[j]==sourceData[s].region){
					tableRow.push(s);
				}
			}
		}
	}
	return tableRow;
}
