document.getElementById("submit-btn").onclick = function(){
	alert(document.getElementById("name").value);
}
document.getElementById("name").onkeyup = function(event){
	// 按下enter
	if(event.keyCode == 13){
		alert(document.getElementById("name").value);
	}
	// 按下esc
	else if(event.keyCode == 27){
		document.getElementById("name").value="";
	}
}