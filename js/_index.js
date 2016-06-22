var isBack = true;
var bModal = true;
var msgPrevent = "Are you sure to leave?";
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

    $.getJSON("locale/en/index.json", function(json) {
		$.each($("[data-trans]"), function(index, item) {
            var trans = $(item).text();
			if (json[trans] != undefined) {
				$(item).text(json[trans]);
			}
        });

		$.each($("[placeholder]"), function(index, item) {
			var trans = $(item).attr('placeholder');
			if (json[trans] != undefined) {
				$(item).attr('placeholder', json[trans]);
			}
		});

		msgPrevent = json[msgPrevent];
    });
});

window.onbeforeunload = function (e) {
    if (isBack == true) {
        return msgPrevent;
    }
};

function validate() {
    isBack = false;
    return true;
}
