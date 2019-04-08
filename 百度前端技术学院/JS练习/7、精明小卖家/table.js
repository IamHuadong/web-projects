//生成新表格
function createNewTable(sourceData){
	//获取选中项
	var nowRow = tableInfo();
	//新建行插入
	newInsert(nowRow,sourceData);
	//单元格合并
	tableCombine(nowRow);
}
//新建节点，插入表格
function newInsert(nowRow,data){
	//新建
	for(var i=0;i<nowRow.length;i++){
		var nowTable = document.getElementsByTagName('table')[0];
		//新行
		var newTr = document.createElement('tr');
		var rowNum = nowRow[i];
		newTr.id = rowNum;
		//新列插入行
		for(var j=1;j<15;j++){
			var td = document.createElement('td');
			if(j==1){

				td.innerHTML = data[rowNum].product;
			}
			if(j==2){
				td.innerHTML = data[rowNum].region;
			}
			if(j>2){
				td.innerHTML = data[rowNum].sale[j-3];
			}
			newTr.appendChild(td);
		}
		//新行插入table
		nowTable.appendChild(newTr);
	}
}
//选着性合并
function tableCombine(nowRow){
	var [productsName, regionsName] = getSelectedData();
	var productLength = productsName.length;
	var regionLength = regionsName.length;
	//获取表格数组
	//1个商品，多个地区
	if(productLength==1 && regionLength>1){
		//单元格合并
		cellsCombein(1,regionLength,regionLength);
	}
	//多个商品，1个地区
	else if(productLength>1 && regionLength==1){
		//交换商品和地区的位置
		swapNodes(nowRow);
		//单元格合并
		cellsCombein(1,productLength,productLength);
	}
	//多个商品，多个地区
	else if(productLength>1 && regionLength>1){
		//单元格合并
		var s=1;
		for(var i=0;i<productLength;i++){
			cellsCombein(s,s+regionLength-1,regionLength);
			s=s+regionLength;
		}
	}
}
//交换节点
function swapNodes(nowRow){
	for(var i=0;i<nowRow.length;i++){
		//获取存在商品的行id
		var pNode = document.getElementById(nowRow[i]);
		var aNode = pNode.getElementsByTagName('td')[0];
		var bNode = pNode.getElementsByTagName('td')[1];
		if(aNode && bNode){
			var aNodeClone = aNode.cloneNode(true);
			pNode.replaceChild(aNodeClone,bNode);
			pNode.replaceChild(bNode,aNode);
		}	
	}
}
/************************
把表格的哪几行的首列合并
**************************/
function cellsCombein(rowStart,rowEnd,Length){
	var table=document.getElementsByTagName('table')[0];
	var tr1=table.getElementsByTagName("tr")[rowStart];
	var td1=tr1.getElementsByTagName("td")[0];
	td1.rowSpan=Length;
	for(var j=rowStart+1;j<=rowEnd;j++){
		var tr2=table.getElementsByTagName("tr")[j];
		var td2=tr2.getElementsByTagName("td")[0];
		td2.remove();
	}
	
}