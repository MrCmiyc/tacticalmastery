
//function disableBack() { window.history.forward() }
//
//window.onload = disableBack();
//window.onpageshow = function(evt) { if (evt.persisted) disableBack() }

history.pushState(null, null, location.href);
window.onpopstate = function(event) {
    history.go(1);
}
