document.getElementById("school").onclick = function() {
	document.getElementById("school-select").style.display = "block";
	document.getElementById("company-select").style.display = "none";
}
document.getElementById("company").onclick = function() {
	document.getElementById("school-select").style.display = "none";
	document.getElementById("company-select").style.display = "block";
}