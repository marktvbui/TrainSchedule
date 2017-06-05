$(document).ready(function(){
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    //setting variables, table to target table from index
    var table = document.getElementById("display-table");
    //these variables saves the value from the input fields
    var trainName = $('#train-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var time = $('#time-input').val().trim();
    var frequency = $('#frequency-input').val().trim();
    // console.log(trainName);
    // console.log(destination);
    // console.log(time);
    // console.log(frequency);
    //displaying input fields into table
    $('#train-display').html(trainName);
    $('#destination-display').html(destination);
    $('#time-display').html(time);
    $('#frequency-display').html(frequency);
    // for (var i = 0; i < 10; i ++) {
    //   var insertTable = document.getElementById('display-table').insertRow(i);
    //   for (var j = 0; j < 10; j ++) {
    //     var insert = insertTable.insertCell(j);
    //   }
    //   table.rows[i].cells[0].append = trainName;
    //   table.rows[i].cells[1].append = destination;
    //   table.rows[i].cells[2].append = time;
    //   table.rows[i].cells[3].append = frequency;
    // }
    //clearing the local storage from previous visits
    localStorage.clear();
    //setting local storage
    localStorage.setItem("localTrain", trainName);
    localStorage.setItem('localDestination', destination);
    localStorage.setItem('localTime', time);
    localStorage.setItem('localFrequency', frequency);
  });
  //grabbing info from local storage and displaying it, even on refresh
  $("#train-display").html(localStorage.getItem("localTrain"));
  $("#destination-display").html(localStorage.getItem("localDestination"));
  $("#time-display").html(localStorage.getItem("localTime"));
  $("#frequency-display").html(localStorage.getItem("localFrequency"));
});