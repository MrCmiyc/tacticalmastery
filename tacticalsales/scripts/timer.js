var sec   = 00;   // set the seconds
var min   = 00;   // set the minutes
var hours = 48;   // set the hours

function countDown() {
  sec--;
  if (sec == -01) {
    sec = 59;
    min--;
    if (min == -01) {
      min = 59;
      hours--;
    }
  } else {
   min = min;
  }
if (sec<=9) { sec = "0" + sec; }
  cdminutesvar = (min<=9 ? "0" + min : min);
  cdsecondsvar = sec;
  cdhoursvar   = (hours<=9 ? "0" + hours : hours);
if (document.getElementById) { cdminutes.innerHTML = cdminutesvar; cdseconds.innerHTML = cdsecondsvar; cdhours.innerHTML = cdhoursvar;}
  SD=window.setTimeout("countDown();", 1000);
if (min == '00' && sec == '00' && hours == '00') { sec = "00"; window.clearTimeout(SD); }
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

addLoadEvent(function() {
  countDown();
});