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
  var database = firebase.database();
  var trains = {};
  var trainName = '';
  var destination = '';
  var time = '';
  var frequency = 0;
  displayFirebase();

  // console.log(trains);
  // var trainList = JSON.parse(localStorage.getItem('trains'));
  // if (!Array.isArray(trainList)) {
  //   trainList = []
  // }
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
    trains.fbTrain = trainName;
    trains.fbDestination = destination;
    trains.fbTime = time;
    trains.fbFrequency = frequency;
    database.ref().push({
      trains
    });
  });
  function displayFirebase() {
    database.ref().on('value', function(snapshot){
      $('#display-table').empty();
      snapshot.forEach(function(childSnapshot){
        var row = $('<tr>');
        row.append($('<td>').html(childSnapshot.val().trains.fbTrain));
        row.append($('<td>').html(childSnapshot.val().trains.fbDestination));
        row.append($('<td>').html(childSnapshot.val().trains.fbTime));
        row.append($('<td>').html(childSnapshot.val().trains.fbFrequency));
        $('#display-table').append(row);
        // console.log(snapshot.val());
        // console.log(childSnapshot);
    // }, function(errorObject) {
    //   console.log('read failed: ' + errorObject);
      }), function(errorObject) {
        console.log('read failed: ' + errorObject);
      }
    });
  }
    // console.log(trains.fbTrain);
    // console.log(trains.fbDestination);
    // displaying input fields into table, creating dynamic rows/columns
    // row.append($('<td>').html(trainName));
    // row.append($('<td>').html(destination));
    // row.append($('<td>').html(time));
    // row.append($('<td>').html(frequency));
    // $('#display-table').append(row);
    //clearing the local storage from previous visits
    // localStorage.clear();
    //setting local storage
    // localStorage.setItem('localTrain', trainName);
    // localStorage.setItem('localDestination', destination);
    // localStorage.setItem('localTime', time);
    // localStorage.setItem('localFrequency', frequency);
    // trainList.push(trainName);
    // trainlist.push(destination);
    // trainlist.push(time);
    // trainlist.push(frequency);
    // trainList.push(trains);
    // console.log(trainList);

  // var value = ["aa","bb","cc"]
  // will return: 'aa', 'bb', 'cc';
  // localStorage.setItem('testkey', JSON.stringify(saveData));
  // var test = JSON.parse(localStorage.getItem('trains'));
  // console.log(saveData);
  // console.log(test);
    // var lTrain = localStorage.getItem('localTrain');
    // var lDestination = localStorage.getItem('localDestination');
    // var lTime = localStorage.getItem('localTime');
    // var lfrequency = localStorage.getItem('localFrequency');

    // console.log(lTrain);
    // console.log(lDestination);
    // console.log(lTime);
    // console.log(lfrequency);
    // looping through saveData to display localStorage info to table
    // localStorage.setItem('test2', JSON.stringify(saveData));
    // var test2 = JSON.parse(localStorage.getItem('test2'));
    // looping through local storage
    // for (i = 0; i < trainList.length; i++){
    //   var row = $('<tr>');
    //   //grabbing info from local storage and displaying it, even on refresh
    //   row.append($('<td>').html(localStorage.getItem('localTrain')));
    //   row.append($('<td>').html(localStorage.getItem('localDestination')));
    //   row.append($('<td>').html(localStorage.getItem('localTime')));
    //   row.append($('<td>').html(localStorage.getItem('localFrequency')));
    //   $('#display-table').append(row);
    // }
});


