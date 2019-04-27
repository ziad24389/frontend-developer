/*!
  * Internet Speed v1.0
  * Copyright 2019 By Ziad Abuzayyad
  */

  function fileTime() {
  var internetSpeed = document.getElementById("Speed").value;
  var fileSize = document.getElementById("Size").value;
  var timeDownload = fileSize / (internetSpeed / 8) ;
  document.getElementById("Value").innerHTML = timeDownload.toFixed(2) + " " + "Seconds";
}

function secTime() {
var internetSpeed = document.getElementById("Speed").value;
var fileSize = document.getElementById("Size").value;
var timeDownload = fileSize / (internetSpeed / 8) ;
document.getElementById("Value").innerHTML = timeDownload.toFixed(2) + " " + "Seconds";
}


function minTime() {
    var internetSpeed = document.getElementById("Speed").value;
    var fileSize = document.getElementById("Size").value;
    var timeDownload = fileSize / (internetSpeed / 8) ;
    var Minutes = timeDownload / 60;
    document.getElementById("Value").innerHTML = Minutes.toFixed(2) + " " + "Minutes";
    }


    function hourTime() {
        var internetSpeed = document.getElementById("Speed").value;
        var fileSize = document.getElementById("Size").value;
        var timeDownload = fileSize / (internetSpeed / 8) ;
        var Hours = timeDownload / 60 / 60;
        document.getElementById("Value").innerHTML = Hours.toFixed(2) + " " + "Hours";
        }