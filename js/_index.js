var isBack = true;
var bModal = true;
$(document).ready(function() {
	$(document).mousemove(function(e) {
		if (e.pageY <= 5 && bModal) {
			$("div#js-div-popup").modal();
		}
	});

	$('div#js-div-popup').on('shown.bs.modal', function () {
		$("input#js-text-first-name").focus();
	});

	$('div#js-div-popup').on('hidden.bs.modal', function() {
		$("input#js-text-first-name, input#js-text-last-name, input#js-text-phone-number").val('');
		$("div#js-div-notification").hide();
	});

	$("input#js-text-phone-number").keyup(function(e) {
		$("div#js-div-notification").fadeIn();
	});

	$("a.a-prevent-back").click(function() {
		isBack = false;
	});
});

window.onbeforeunload = function (e) {
	if (isBack == true) {
		return "Are you sure to leave?";
	}
}

function validate() {
	isBack = false;
	return true;
}
