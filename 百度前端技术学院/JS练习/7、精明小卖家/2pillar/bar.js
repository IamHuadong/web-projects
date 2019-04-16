//绘制柱状图
function histogram(dataPx,data,pillarColor){
	var dataPxMax = Math.max.apply(Math,dataPx);//坐标最高
	var dataMax = Math.max.apply(Math,data);//1月数据最高值

	//柱子宽度、颜色，间距宽度
	var marginP = 10;//柱上边距离
	var pillarWidth=20;
	// var pillarColor='green';
	var pillarSpace=15;
	// 刻度y最高值
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
	var axesY=200+marginP+marginWidth; 
	var axesWidth=pillarWidth*12+pillarSpace*13;
	var axesHeight=200+marginP;
	var axesColor='black';
	// 柱状图的高度、宽度，背景颜色
	var barHeight=axesHeight+2*marginWidth;
	var barWidth=axesWidth+2*marginWidth;
	var barColor='rgb(240,240,240)';

	//创建svg
	var barSvg=document.createElementNS('http://www.w3.org/2000/svg','svg');
	barSvg.id='bar';
	barSvg.setAttribute('height',barHeight);
	barSvg.setAttribute('width',barWidth);
	barSvg.style.backgroundColor=barColor;
	//创建轴
	var axes = axesSvg(axesX,axesY,axesWidth,axesHeight,axesColor,2);
	barSvg.appendChild(axes);
	//创建柱
	for(i in data){
		//柱坐标，相对于轴(0,0)
		var px=pillarSpace+i*(pillarWidth+pillarSpace);
		var py=1;//轴线宽度
		var pillarHeight=dataPx[i]*dataMax/yMax;
		//实际坐标转换
		var pillarX=px+marginWidth;
		var pillarY=axesHeight+marginWidth-py-pillarHeight;
		//创建柱
		var rect= pillarSvg(pillarX,pillarY,pillarHeight,pillarWidth,pillarColor);
		//创建文本
		var num=Number(i)+1;
		var text = textCreate(pillarX,axesY+20,num);
		//加入svg
		barSvg.appendChild(rect);
		barSvg.appendChild(text);
	}
	//横坐标刻度说明
	var text = textCreate(barWidth-40,axesY+20,'月份');
	barSvg.appendChild(text);
	//纵坐标刻度
	var yPxPer=200/5;
	var yPer=yMax/5;
	for(var i=0;i<=5;i++){
		var yPx = yPxPer*i;
		var yHtml=yPer*i;
		var text = textCreate(5,axesHeight+marginWidth-yPx+10,yHtml);
		var linex=lineX(marginWidth,axesHeight+marginWidth-yPx,5,'black',2);
		barSvg.appendChild(text);
		barSvg.appendChild(linex);
	}
	//纵坐标刻度说明
	var text = textCreate(5,marginWidth-10,'销量');
	barSvg.appendChild(text);
	//创建片段
	var frag = document.createDocumentFragment();
	frag.appendChild(barSvg);
	return frag;
}
//画坐标轴（x,y）--原点位置
function axesSvg(x,y,xLength,yLength,axesColor,lineWidth){
	var frag = document.createDocumentFragment();
	//x轴
	var childxDom = document.createElementNS('http://www.w3.org/2000/svg','line');
	childxDom.setAttribute('x1',x);
	childxDom.setAttribute('y1',y);
	childxDom.setAttribute('x2',x+xLength);
	childxDom.setAttribute('y2',y);
	childxDom.style='stroke:'+axesColor+';stroke-width:'+lineWidth;
	//y轴
	var childyDom = document.createElementNS('http://www.w3.org/2000/svg','line');
	childyDom.setAttribute('x1',x);
	childyDom.setAttribute('y1',y);
	childyDom.setAttribute('x2',x);
	childyDom.setAttribute('y2',y-yLength);
	childyDom.style='stroke:'+axesColor+';stroke-width:'+lineWidth;
	//y轴
	frag.appendChild(childxDom);
	frag.appendChild(childyDom);
	return frag;
}
//画单个柱子(x,y)坐标
function pillarSvg(x,y,pillarHeight,pillarWidth,pillarColor){
	var rectDom = document.createElementNS('http://www.w3.org/2000/svg','rect');
	rectDom.setAttribute('x',x);
	rectDom.setAttribute('y',y);
	rectDom.setAttribute('height',pillarHeight);
	rectDom.setAttribute('width',pillarWidth);
	rectDom.setAttribute('style','stroke-width:1;stroke:black;');
	rectDom.style='fill:'+pillarColor;
	return rectDom;
}
//创建文本
function textCreate(x,y,htmlText){
	var text= document.createElementNS('http://www.w3.org/2000/svg','text');
	text.setAttribute('x',x);
	text.setAttribute('y',y);;
	text.innerHTML=htmlText;
	return text;
}
//画横线
function lineX(x,y,xLength,axesColor,lineWidth){
	//x轴
	var childxDom = document.createElementNS('http://www.w3.org/2000/svg','line');
	childxDom.setAttribute('x1',x);
	childxDom.setAttribute('y1',y);
	childxDom.setAttribute('x2',x+xLength);
	childxDom.setAttribute('y2',y);
	childxDom.style='stroke:'+axesColor+';stroke-width:'+lineWidth;
	return childxDom;
}
