var isBack = true;

window.onbeforeunload = function (e) {
	if (isBack == true) {
		return "Are you sure to leave?";
	}
};

function validate() {
	isBack = false;
	return true;
}

$(document).ready(function() {
	$("a.a-prevent-back").click(function() {
		isBack = false;
	});
});

$('input[name=cardNumberSpace]').payment('formatCardNumber');
$('input[name=cardSecurityCode]').payment('formatCardCVC');