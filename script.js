var moment = require('moment');

var roomates = [
	"Carolina",
	"Marissa",
	"Sean",
	"Cameron",
	"Jose"
];

var chores = ["Kitchen", "Living room + Hallway", "Bathroom 1", "Bathroom 2"];


//format: dddd is day of the week in text, MMMM is month in text, DD is day of the month in number.
function getWeek(x) {
	var firstDay = x.day(-6).format('MMMM DD');
	var lastDay = x.clone().add(6,"day");
	if(lastDay.format('MMMM')!= x.format('MMMM')){
		lastDay = lastDay.format('MMMM DD');
	}
	else{
		lastDay = lastDay.format('DD');
	}
	return firstDay + " - " + lastDay;
}

function generateList(weeks){
	var weekList = [];
	for(i=0;i<weeks;i++){
		weekList.push(getWeek(moment().clone().add(i,'week')));
	}
	return weekList;
}


console.log(generateList(21));