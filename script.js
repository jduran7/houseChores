var moment = require('moment');

var people = [
	"Person 1",
	"Person 2",
	"Person 3",
	"Person 4"
];

var tasks = ["Kitchen", "Living room + Hallway", "Bathroom 1", "Bathroom 2"];


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
		weekList.push(getWeek(moment().clone().add(i,'week'),interval));
	}
	return weekList;
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

function assignChores(people, tasks, weeks, interval){
  people = shuffle(people);
  var myList = generateList(weeks, interval);
  var slots = (tasks.length)*weeks/interval;
  var sequence = [];
  var sortedSequence = [];
  var finalSchedule = {};
  
  for(i=0;i<slots/interval;i++){
    // sequence.push(people[i%people.length]);
    for(j=0;j<people.length;j++){
      sequence.push(people[(i+j)%people.length]);
    }
    sortedSequence.push(sequence);
    sequence = [];
  }

  for(i=0;i<sortedSequence.length;i++){
  	finalSchedule[myList[i]] = sortedSequence[i];
  }

  return finalSchedule;
}


// console.log(generateList(5,2));
console.log(assignChores(people, tasks, 24, 2));