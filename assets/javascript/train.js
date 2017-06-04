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
    $('#train-display').td(trainName);
    $('#destination-display').td(destination);
    $('#time-display').td(time);
    $('#frequency-display').td(frequency);

    localStorage.clear();
    localStorage.setItem("localTrain", trainName);
    localStorage.setItem('localDestination', destination);
    localStorage.setItem('localTime', time);
    localStorage.setItem('localFrequency', frequency);
  });

  $("#train-display").td(localStorage.getItem("localTrain"));
  $("#destination-display").td(localStorage.getItem("localDestination"));
  $("#time-display").td(localStorage.getItem("localTime"));
  $("#frequency-display").td(localStorage.getItem("localFrequency"));
});