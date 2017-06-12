$(document).ready(function(){
  var config = {
    apiKey: "AIzaSyCQ__vhHShTpCE-GENvH5K9jv8bX4iUdXg",
    authDomain: "marksinsaneasylum.firebaseapp.com",
    databaseURL: "https://marksinsaneasylum.firebaseio.com",
    projectId: "marksinsaneasylum",
    storageBucket: "marksinsaneasylum.appspot.com",
    messagingSenderId: "587854779697"
  }
  firebase.initializeApp(config);
  // setting variables
  var database = firebase.database();
  // setting initial variables to empty/0
  var trainName = '';
  var destination = '';
  var time = '';
  var frequency = '';
  var trains = {};
  var currentTime = moment();
  var firstTimeConverted = '';
  var diffTime = '';
  var tRemainder = '';
  var tMinutesTillTrain = '';
  var nextArrive = '';
  setTimeout(timer, 60000);

  // on click event on the add-train button
  $("#add-train").on("click", function(event) {
    event.preventDefault();
    //setting variables, table to target table from index
    var table = document.getElementById("display-table");
    var row = $('<tr>');
    //these variables saves the value from the input fields
    trainName = $('#train-input').val().trim();
    destination = $('#destination-input').val().trim();
    time = $('#time-input').val().trim();
    frequency = $('#frequency-input').val().trim();
    // converts string of time into time format
    firstTimeConverted = moment(time, "hh:mm");
    // calculates the difference in minutes between current time and  train time
    diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // determines how many minutes are left between each scheduled stop
    tRemainder = diffTime % frequency;
    // calculates how many minutes are left until arrival
    tMinutesTillTrain = frequency - tRemainder;
    nextArrive = moment().add(tRemainder, "minutes").format("hh:mm");
    console.log(nextArrive);

    // setting trains object
    trains = {
      fbTrain: trainName,
      fbDestination: destination,
      fbTime: nextArrive,
      fbFrequency: frequency,
      fbETA: tMinutesTillTrain
    }
    // trains.fbTrain = trainName;
    // trains.fbDestination = destination;
    // trains.fbTime = time;
    // trains.fbFrequency = frequency;
    // pushing trains object into the database
    database.ref('trains').push(trains);
  });
  function timer() {
    trains.forEach(function(train){
      var test = train.val();
      console.log(test);
      test.tMinutesTillTrain > 0 ? (test.tMinutesTillTrain --) : (test.tMinutesTillTrain = test.frequency - test.tRemainder);
      database.ref('trains').push(test.tMinutesTillTrain);
    });
  }
    database.ref('trains').on('child_added', function(snapshot){
      // child_added makes lines 48, 49, 50 irrelavant
      // emptys out the table before running through each loop, that way each child element will only show once instead of it piling on
      // $('#display-data').empty();
      // forEach loop, looping through each child element
      // snapshot.forEach(function(childSnapshot){
        // console.log(childSnapshot.val());
        // dynamically creating table rows
      var train = snapshot.val();
      // console.log(train);
      var row = $('<tr>');
      row.append($('<td>').html(train.fbTrain));
      row.append($('<td>').html(train.fbDestination));
      row.append($('<td>').html(train.fbFrequency));
      row.append($('<td>').html(train.fbTime));
      row.append($('<td id="eta">').html(train.fbETA));
      $('#display-table').append(row);
      // console.log(snapshot.val());
    }, function(errorObject) {
        console.log('read failed: ' + errorObject);
      })
});


