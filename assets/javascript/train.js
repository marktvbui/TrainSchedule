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
  var trains = {};
  var trainName = '';
  var destination = '';
  var time = '';
  var frequency = 0;
  displayFirebase();

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
    // setting trains object
    trains.fbTrain = trainName;
    trains.fbDestination = destination;
    trains.fbTime = time;
    trains.fbFrequency = frequency;
    // pushing trains object into the database
    database.ref().push({
      trains
    });
  });
  function displayFirebase() {
    database.ref().on('value', function(snapshot){
      // emptys out the table before running through each loop, that way each child element will only show once instead of it piling on
      $('#display-data').empty();
      // forEach loop, looping through each child element
      snapshot.forEach(function(childSnapshot){
        // console.log(childSnapshot.val());
        // dynamically creating table rows
        var row = $('<tr>');
        row.append($('<td>').html(childSnapshot.val().trains.fbTrain));
        row.append($('<td>').html(childSnapshot.val().trains.fbDestination));
        row.append($('<td>').html(childSnapshot.val().trains.fbTime));
        row.append($('<td>').html(childSnapshot.val().trains.fbFrequency));
        $('#display-table').append(row);
        // console.log(snapshot.val());
      }), function(errorObject) {
        console.log('read failed: ' + errorObject);
      }
    });
  }
});


