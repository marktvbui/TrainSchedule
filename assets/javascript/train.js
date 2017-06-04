$(document).ready.(function(){
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    var trainName = $('#train-input').val().trim();
    var destination = $('#destination-input').val().trim();
    var time = $('#time-input').val().trim();
    var frequency = $('#frequency-input').val().trim();
    console.log(trainName);
    console.log(destination);
    console.log(time);
    console.log(frequency);

    var table = document.getElementById("display-table");
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = trainName;
    cell2.innerHTML = destination;
    cell3.innerHTML = time;
    cell4.innerHTML = frequency;
    $('#train-display').html(trainName);
    $('#destination-display').html(destination);
    $('#time-display').html(time);
    $('#frequency-display').html(frequency);

    localStorage.clear();
    localStorage.setItem("localTrain", trainName);
    localStorage.setItem('localDestination', destination);
    localStorage.setItem('localTime', time);
    localStorage.setItem('localFrequency', frequency);
  });

  $("#train-display").html(localStorage.getItem("localTrain"));
  $("#destination-display").html(localStorage.getItem("localDestination"));
  $("#time-display").html(localStorage.getItem("localTime"));
  $("#frequency-display").html(localStorage.getItem("localFrequency"));
});