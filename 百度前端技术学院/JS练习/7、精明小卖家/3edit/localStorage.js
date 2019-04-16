function localStorageInit(sourceData){
	for(i in sourceData){
		var sale=sourceData[i].sale;
		localStorage.setItem(i,sale);//新建
	}
}
function lsToObj(){
	var products=['手机','笔记本','智能音箱'];
	var regions=['华东','华北','华南'];
	var sourceData=[];
	var k=0;
	for(i in products){
		for(j in regions){
			var obj=new Object();
			obj.product=products[i];
			obj.region=regions[j];
			var ss=localStorage.getItem(k).split(',');//读取
			for(p in ss){
				ss[p]=Number(ss[p]);
			}
			obj.sale=ss;
			k++;
			sourceData.push(obj);
		}
	}
	return sourceData;
}