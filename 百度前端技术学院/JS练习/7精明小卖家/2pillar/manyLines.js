function linesPlot(sourceData){

	//归一化数据
	var [dataMax,yMax,dataPx]=dataNormal(sourceData);
	//数据点颜色，间距宽度
	var marginP = 10;//最高点上边距离
	var pointColor='red';
	var pointSpace=35;//间距
	var pointRadius=3;
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
		axessCanvas(ctx,axesX,axesY,axesWidth,axesHeight,axesColor,2);
		//画数据点+折线
		pointssCanvas(ctx,dataPx,pointSpace,pointRadius,1,
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
		//横坐标刻度
		for(var i=1;i<=12;i++){
			var pointX=pointSpace*i+marginWidth;
			ctx.beginPath();
			ctx.moveTo(pointX,marginWidth+axesHeight);
			ctx.lineWidth=2;
			ctx.strokeStyle='black';
			ctx.lineTo(pointX,marginWidth+axesHeight-5);
			ctx.stroke();
			ctx.fillStyle='black';
			ctx.font="16px Roman";
			ctx.fillText(i,pointX-5,marginWidth+axesHeight+20);
			ctx.closePath();		
		}
		
		//横坐标刻度说明
		ctx.fillStyle='black';
		ctx.font="16px Roman";
		ctx.fillText('月份',canvasWidth-40,marginWidth+axesHeight+20);
		}
	
	return canvas;
}
//新建坐标轴
function axessCanvas(ctx,x,y,xLength,yLength,axesColor,lineWidth){
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
function pointssCanvas(ctx,dataPx,pointSpace,pointRadius,lineWidth,
	marginWidth,pointSpace,axesHeight,dataMax,yMax){
	var colors=['green','blue','purple','red','brown','violet','orange','cyan','coral'];
	for(j in dataPx){
		var iPx=dataPx[j];
		for(i in iPx){
			//画点
			var pointX=pointSpace*(Number(i)+1)+marginWidth;
			var pointY=iPx[i];
			pointY=marginWidth+axesHeight-pointY;
			ctx.beginPath();
			ctx.arc(pointX,pointY,pointRadius,0,Math.PI*2);
			ctx.fillStyle=colors[j];
			ctx.fill();
			ctx.closePath();
			//连线
			if(i!=0){
				ctx.beginPath();
				ctx.moveTo(pointX-pointSpace,marginWidth+axesHeight-iPx[i-1]);
				ctx.lineWidth=lineWidth;
				ctx.strokeStyle=colors[j];
				ctx.lineTo(pointX,pointY);
				ctx.stroke();
				ctx.closePath();
			}
		}
		//线条说明
		ctx.arc(pointSpace*13+30,axesHeight+marginWidth-j*15-80,pointRadius,0,Math.PI*2);
		ctx.fillStyle=colors[j];
		ctx.fill();
		ctx.fillText(j,pointSpace*13+40,axesHeight+marginWidth-j*15-75);
	}
}