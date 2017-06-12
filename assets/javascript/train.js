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
  // var currentTime = moment();
  // var firstTimeConverted = '';
  // var diffTime = '';
  // var tRemainder = '';
  // var tMinutesTillTrain = '';
  // var nextArrive = '';
  // setTimeout(timer, 10000);

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

    if ((trainName === '') || (destination === '') ||
      (time === '') || (frequency === '')) {
      alert('please fill in all fields');
    }

    // setting trains object
    trains = {
      fbTrain: trainName,
      fbDestination: destination,
      fbTime: time,
      fbFrequency: frequency
    }
    // trains.fbTrain = trainName;
    // pushing trains object into the database
    database.ref('trains').push(trains);
    // clearing input fields
    $('#train-input').val('');
    $('#destination-input').val('');
    $('#time-input').val('');
    $('#frequency-input').val('');
  });
  // function timer() {
  //   database.ref('trains').on('value',function(train){
  //     console.log(train.val());
  //     var trainee = train.val();
  //     trainee.forEach(function(testChildren){
  //       console.log(testchildren.val());
  //       var testChild = testChildren.val();
  //       testChild.fbETA > 0 ? (testChild.fbETA --) : (testChild.fbETA = testChild.frequency - testChild.tRemainder);
  //       database.ref('trains').push(testChild.fbETA);
  //     })
  //   });
  // }
    database.ref('trains').on('child_added', function(snapshot){
      // child_added makes lines 48, 49, 50 irrelavant
      // emptys out the table before running through each loop, that way each child element will only show once instead of it piling on
      // $('#display-data').empty();
      // forEach loop, looping through each child element
      // snapshot.forEach(function(childSnapshot){
        // console.log(childSnapshot.val());
        // dynamically creating table rows
        // converts string of time into time format
      var train = snapshot.val();

      var firstTimeConverted = moment(train.fbTime, "hh:mm").subtract(1, "years");
      console.log(firstTimeConverted);
      // calculates the difference in minutes between current time and  train time
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log('difference in time ' + diffTime);
      // determines how many minutes are left between each scheduled stop
      var tRemainder = diffTime % train.fbFrequency;
      console.log('remainder ' + tRemainder);
      // calculates how many minutes are left until arrival
      var tMinutesTillTrain = train.fbFrequency - tRemainder;
      var nextArrive = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
      // console.log(nextArrive);
      // console.log(tMinutesTillTrain);
      // var train = snapshot.val();

      var row = $('<tr>');
      row.append($('<td>').html(train.fbTrain));
      row.append($('<td>').html(train.fbDestination));
      row.append($('<td>').html(train.fbFrequency));
      row.append($('<td>').html(nextArrive));
      row.append($('<td id="eta">').html(tMinutesTillTrain));
      $('#display-table').append(row);
      // console.log(snapshot.val());
    }, function(errorObject) {
        console.log('read failed: ' + errorObject);
      })
});


