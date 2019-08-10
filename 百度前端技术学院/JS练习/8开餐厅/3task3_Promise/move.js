//图片左右移动函数
function imgMove(id,positionX,conts){
	var time=500;//500ms
	var img=document.getElementById(id);
	var left=img.offsetLeft;
	var length=positionX-left;
	var unitLength=Math.abs(length)/100;
	var unitTime=time/100;
	var waiterP=new Promise(function(resolve,reject){
		var words=img.getElementsByTagName('p')[0];
		words.innerHTML=conts;
		//向左移动
		if(length<0){
			var int=setInterval(function(){
					var left=img.offsetLeft;
					img.style.left=left-unitLength+'px';
					var left=img.offsetLeft;
					if(left<=positionX){
						img.style.left=positionX+'px';
						clearInterval(int);
						resolve();
					}
				},unitTime);
		}//向右移动
		else if(length>0){
			var int=setInterval(function(){
					var left=img.offsetLeft;
					if(left>=positionX){
						img.style.left=positionX+'px';
						clearInterval(int);
						resolve();
					}
					img.style.left=left+unitLength+'px';
				},unitTime);
		}
		else{
			resolve();
		}
	});
	return waiterP;
}
