var myDate = new Date();
var greeting = document.getElementById("greeting");
hours = myDate.getHours();
console.log(typeof hours,hours);
if(hours>=7 && hours <= 9){
	greeting.innerHTML = "Good Morning!";
}
else if(hours>12 && hours<=14){
	greeting.innerHTML = "Good Afternoon!";
}
else if(17<=hours && hours<=24){
	greeting.innerHTML = "Good Evening!";
}
else{
	greeting.innerHTML = "Hello!";
}