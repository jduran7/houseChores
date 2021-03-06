// var moment = require('moment');

var people = [
  "Ben",
  "Chris",
  "Marco",
  "Fadi",
  "Lauren",
  "Lexi"
];

var tasks = [

"GC Agar / GC liquid media prep",
"Pipette tips and general refills",
"Trash/recycling",
"Dish washing",
"General cleaning/lab order",
"Update -to order- board (ALL)",
];

//Returns Monday and Sunday of a week
//format: dddd is day of the week (text), MMMM is month (text), DD is day of the month (number).
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
  var weekList = [];
  for(i=0;i<weeks/interval;i++){
    weekList.push(getWeek(moment().clone().add(i*interval,'week'),interval));
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

//generates an object with dates as keys and arrays of people as values
function assignChores(people, tasks, weeks, interval){
  people = shuffle(people);
  var myList = generateList(weeks, interval);
  var sequence = [];
  var sortedSequence = [];
  var finalSchedule = {};
  
  for(i=0;i<weeks/interval;i++){
    for(j=0;j<tasks.length;j++){
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


//writing the table
var source = assignChores(people, tasks, 52, 2);
var table = '';
var rows = Object.keys(source);
var cols = tasks.length;

table += '<thead><tr><td></td>' 
for(i=0;i<tasks.length;i++){
  table += '<td><b>' + tasks[i] + '</b></td>';
}
table+= '</tr></thead>'

for(r=0;r<rows.length;r++){
  table += '<tr><td>' + rows[r] + '</td>';
  for(c=0;c<cols;c++){
    table += '<td><div id="names">' + source[rows[r]][c] + '</div></td>'
  }
  table += '</tr>';
}
document.write(' <div id="main"><table class="striped centered">' + table + '</table></div>');

$(function(){
  $('#main').css('cursor','default');
  $("#main #names").click( function() {
    $(this).toggleClass("greenLetters"); 
  if ($(this).hasClass("greenLetters")) {
    $(this).append("<div class=\"checkmark\">&#10004</div>");
        } else {
            $(".checkmark").remove();
        }
    });
});