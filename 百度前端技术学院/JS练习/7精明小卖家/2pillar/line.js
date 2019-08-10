function lineChart(dataPx,data,pointColor){
	var dataPxMax = Math.max.apply(Math,dataPx);//坐标最高
	var dataMax = Math.max.apply(Math,data);//1月数据最高值
	//数据点颜色，间距宽度
	var marginP = 10;//最高点上边距离
	// var pointColor='red';
	var pointSpace=35;//间距
	var pointRadius=3;
	//纵坐标刻度最高值
	yMax=dataMax.toString();
	var y='1';
	for(var i=0;i<yMax.length-1;i++){
		y=y+0;
	}
	y=Number(y);
	yMax= Math.ceil(yMax/y);
	yMax =y*yMax;
	//轴的坐标，宽度，高度、颜色
	var marginWidth=40;//轴的周围宽度
	var axesX=marginWidth;
	// var axesY=(yMax/dataMax)*dataPxMax+marginP+marginWidth; 
	var axesY=200+marginP+marginWidth;
	var axesWidth=pointSpace*13;
	// var axesHeight=(yMax/dataMax)*dataPxMax+marginP;
	var axesHeight=200+marginP;
	var axesColor='black';
	// 折线图的高度、宽度，背景颜色
	var canvasHeight=axesHeight+2*marginWidth;
	var canvasWidth=axesWidth+2*marginWidth;
	var canvasColor='rgb(240,240,240)';

	//新建canvas
	var canvas=document.createElement('canvas');
	canvas.height=canvasHeight;
	canvas.width=canvasWidth;
	canvas.style.backgroundColor=canvasColor;//背景色
	//画数据
	if(canvas.getContext){
		var ctx=canvas.getContext('2d');
		//画坐标轴
		axesCanvas(ctx,axesX,axesY,axesWidth,axesHeight,axesColor,2);
		//画数据点+折线
		pointsCanvas(ctx,dataPx,pointSpace,pointRadius,pointColor,1,
		marginWidth,pointSpace,axesHeight,dataMax,yMax);
		//纵坐标刻度
		var yPxPer=200/5;
		var yPer=yMax/5;
		for(var i=0;i<=5;i++){
			var yPx = yPxPer*i;
			var yHtml=yPer*i;
			ctx.beginPath();
			ctx.moveTo(marginWidth,axesHeight+marginWidth-yPx);
			ctx.lineWidth=2;
			ctx.strokeStyle='black';
			ctx.lineTo(marginWidth+5,axesHeight+marginWidth-yPx);
			ctx.stroke();
			ctx.fillStyle='black';
			ctx.font="16px Roman";
			ctx.fillText(yHtml,5,axesHeight+marginWidth-yPx+10);
			ctx.closePath();
		}
		//纵坐标刻度说明
		ctx.fillStyle='black';
		ctx.font="16px Roman";
		ctx.fillText('销量',5,marginWidth-10);		
		//横坐标刻度说明
		ctx.fillStyle='black';
		ctx.font="16px Roman";
		ctx.fillText('月份',canvasWidth-40,marginWidth+axesHeight+20);
		}
	
	return canvas;
}
//新建坐标轴
function axesCanvas(ctx,x,y,xLength,yLength,axesColor,lineWidth){
	//横坐标
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineWidth=lineWidth;
	ctx.strokeStyle=axesColor;
	ctx.lineTo(x+xLength,y);
	//纵坐标
	ctx.moveTo(x,y);
	ctx.lineTo(x,y-yLength);
	ctx.stroke();
	ctx.closePath();
}
function pointsCanvas(ctx,dataPx,pointSpace,pointRadius,color,lineWidth,
	marginWidth,pointSpace,axesHeight,dataMax,yMax){
	
	for(i in dataPx){
		//画点
		var pointX=pointSpace*(Number(i)+1)+marginWidth;
		var pointY=dataPx[i]*dataMax/yMax;
		pointY=marginWidth+axesHeight-pointY;
		ctx.beginPath();
		ctx.arc(pointX,pointY,pointRadius,0,Math.PI*2);
		ctx.fillStyle=color;
		ctx.fill();
		ctx.closePath();
		//连线
		if(i!=0){
			ctx.beginPath();
			ctx.moveTo(pointX-pointSpace,marginWidth+axesHeight-dataPx[i-1]*dataMax/yMax);
			ctx.lineWidth=lineWidth;
			ctx.strokeStyle=color;
			ctx.lineTo(pointX,pointY);
			ctx.stroke();
			ctx.closePath();
		}
		//横坐标刻度
		ctx.beginPath();
		ctx.moveTo(pointX,marginWidth+axesHeight);
		ctx.lineWidth=2;
		ctx.strokeStyle='black';
		ctx.lineTo(pointX,marginWidth+axesHeight-5);
		ctx.stroke();
		ctx.fillStyle='black';
		ctx.font="16px Roman";
		ctx.fillText(Number(i)+1,pointX-5,marginWidth+axesHeight+20);
		ctx.closePath();
	}
}