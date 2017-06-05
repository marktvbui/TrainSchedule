$(document).ready(function(){
  var saveData = [];
  var data = {};
  var now = new Date(Date.now());
  // console.log('date/time is: ' + now);
  var formated = now.getHours() + ':' + now.getMinutes();
  // console.log('just the hours:minutes ' + formated);
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    //setting variables, table to target table from index
    var table = document.getElementById("display-table");
    var row = $('<tr>');
    //these variables saves the value from the input fields
    var trainName = $('#train-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var time = $('#time-input').val().trim();
    var frequency = $('#frequency-input').val().trim();
    //saving hash (key, value)
    data.Train = trainName;
    data.Destination = destination;
    data.Time = time;
    data.Frequency = frequency;
    //pushing the hash into the array
    saveData.push(data);
    console.log(data);
    // displaying input fields into table
    row.append($('<td>').html(trainName));
    row.append($('<td>').html(destination));
    row.append($('<td>').html(time));
    row.append($('<td>').html(frequency));
    $('#display-table').append(row);
    //clearing the local storage from previous visits
    localStorage.clear();
    //setting local storage
    localStorage.setItem("localTrain", trainName);
    localStorage.setItem('localDestination', destination);
    localStorage.setItem('localTime', time);
    localStorage.setItem('localFrequency', frequency);
  });
  // var value = ["aa","bb","cc"]
  // localStorage.setItem("testKey", JSON.stringify(value));
  // var test = JSON.parse(localStorage.getItem("testKey"));
  // console.log(test) will return: 'aa', 'bb', 'cc';
  //grabbing info from local storage and displaying it, even on refresh
  $("#train-display").html(localStorage.getItem("localTrain"));
  $("#destination-display").html(localStorage.getItem("localDestination"));
  $("#time-display").html(localStorage.getItem("localTime"));
  $("#frequency-display").html(localStorage.getItem("localFrequency"));
});