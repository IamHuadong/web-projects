//解析hash
function getHash(){
	var hashIds=location.hash;
	var ids=hashIds.slice(1);
	return ids;
}
//渲染函数
function draw(sourceData){
	var ids=getHash();
	var nowRow=ids.split(',');

	//选中设置
	var selectP = document.getElementById('product-radio-wrapper');
	var inputsP = selectP.getElementsByTagName('input');
	var selectR = document.getElementById('region-radio-wrapper');
	var inputsR = selectR.getElementsByTagName('input');
	var s=0;
	for(var i=0;i<3;i++){
		for(var j=0;j<3;j++){
			for(k in nowRow){
				if(nowRow[k]==s){
					inputsP[i].checked=true;
					inputsR[j].checked=true;
				}
			}
			s++;
		}
	}
	//全选中
	var flagP=0,flagR=0;
	for(var i=0;i<3;i++){
		if(inputsP[i].checked==true)flagP++;
	}
	if(flagP==3)inputsP[3].checked=true;
	for(var j=0;j<3;j++){
		if(inputsR[j].checked==true)flagR++;
	}
	if(flagR==3)inputsR[3].checked=true;
	//表格渲染
	tableInit([['手机'],['华东']]);
	newInsert(nowRow,sourceData);
	//单元格合并
	tableCombine(nowRow);
	
}