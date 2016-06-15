var isBack = true;
var bModal = true;
$(document).ready(function() {
	$(document).mousemove(function(e) {
		if (e.pageY <= 5 && bModal) {
			$("div#js-div-popup").modal();
		}
	});

	$('div#js-div-popup').on('shown.bs.modal', function () {
		$("input#js-text-first-name, input#js-text-last-name, input#js-text-phone-number").val('');
		isBack = false;
		$("input#js-text-first-name").focus();
	});

	$('div#js-div-popup').on('hidden.bs.modal', function() {
		isBack = true;
	});

	$('div#js-div-modal-notification').on('hidden.bs.modal', function() {
		bModal = true;
	});

	$("button#js-btn-submit").click(function() {
		$("form#js-form-lead").submit();
	});

	$("input.form-control").keyup(function(e) {
		if (e.keyCode == 13 && $(this).attr('id') == 'js-text-first-name') {
			$("input#js-text-last-name").focus();
		} else if (e.keyCode == 13 && $(this).attr('id') == 'js-text-last-name') {
			$("input#js-text-phone-number").focus();
		} else if (e.keyCode == 13 && $(this).attr('id') == 'js-text-phone-number') {
			$("button#js-btn-confirm").click();
		}
		return false;
	});
});

window.onbeforeunload = function (e) {
	if (isBack == true && false) {
		return "Are you sure to leave?";
	}
}

function validate() {
	$("div#js-div-popup").modal('hide');
	$("div#js-div-modal-notification").modal();
	bModal = false;
	return false;
}
