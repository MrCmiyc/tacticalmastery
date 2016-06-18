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
$('input#js-txt-cardnumber').validateCreditCard(function(result) {
	if (result.card_type != null) {
		$("img#js-img-credit-card").attr('src', 'images/credit_card/' + result.card_type.name + '.png')
	} else {
		$("img#js-img-credit-card").attr('src', 'images/credit_card/blank.png')
	}
	$('input[name=cardNumber]').val($('input#js-txt-cardnumber').val().replace(/ /g, ''));
});
