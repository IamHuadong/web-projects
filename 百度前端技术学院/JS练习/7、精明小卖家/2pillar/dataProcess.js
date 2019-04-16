//归一化
function dataNormal(sourceData){
	//取最大值
	var dataMax=0;
	for(i in sourceData){
		var iMax=Math.max.apply(Math,sourceData[i].sale);
		if(dataMax<iMax){
			dataMax=iMax;
		}
	}
	//纵坐标刻度最高值
	var yMax=ceilRound(dataMax);
	//归一化后折算
	var dataPx=[];
	for(i in sourceData){
		var iPx = [];
		for(j in sourceData[i].sale){
			//归一化后折算最高px是200
			var ijPx = sourceData[i].sale[j]/yMax*200;
			iPx.push(ijPx);
		}
		dataPx.push(iPx);
	}
	return [dataMax,yMax,dataPx];
}
//向上取整数，保留最高位
function ceilRound(dataMax){
	yMax=dataMax.toString();
	var y='1';
	for(var i=0;i<yMax.length-1;i++){
		y=y+0;
	}
	y=Number(y);
	yMax= Math.ceil(yMax/y);
	yMax =y*yMax;
	return yMax;
}