var moment = require('moment');

var roomates = [
	"Carolina",
	"Michael",
	"Sean",
	"Cameron",
	"Jose"
];

var areas = ["Kitchen", "Living room + Hallway", "Bathroom 1", "Bathroom 2"];
var chores = {}


//Displays that week's Monday and Sunday
//format: dddd is day of the week in text, MMMM is month in text, DD is day of the month in number.
function getWeek(x,interval) {
	var firstDay = x.day(-6).format('MMMM DD');
	var lastDay = x.clone().add(6*interval+(interval-1),"day");
	if(lastDay.format('MMMM')!= x.format('MMMM')){
		lastDay = lastDay.format('MMMM DD');
	}
	else{
		lastDay = lastDay.format('DD');
	}
	return firstDay + " - " + lastDay;
}

//Sets a list of Mondays and Sundays for x number of upcoming weeks as the keys of the chores object
function generateList(weeks,interval){
	var calendar = {};
	var weekList = [];
	for(i=0;i<weeks;i++){
		calendar[getWeek(moment().clone().add(i,'week'),interval)] = [];
	}
	return calendar;
}

//implementing the Fisher-Yates shuffle to randomize arrays
function shuffle(array) {
  var copy = [], n = array.length, i;

  // While there remain elements to shuffle…
  while (n) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }

  return copy;
}


// console.log(generateList(21));
console.log(generateList(21,1));