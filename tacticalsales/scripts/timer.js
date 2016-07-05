var sec = 00;   // set the seconds
var min = 30;   // set the minutes

function countDown() {
  sec--;
  if (sec == -01) {
    sec = 59;
    min = min - 1;
  } else {
   min = min;
  }
if (sec<=9) { sec = "0" + sec; }
  cdminutesvar = (min<=9 ? "0" + min : min);
  cdsecondsvar = sec;
if (document.getElementById) { cdminutes.innerHTML = cdminutesvar; cdseconds.innerHTML = cdsecondsvar; }
  SD=window.setTimeout("countDown();", 1000);
if (min == '00' && sec == '00') { sec = "00"; window.clearTimeout(SD); }
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