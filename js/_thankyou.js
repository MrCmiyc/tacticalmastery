var isBack = true;

window.onbeforeunload = function (e) {
    if (isBack == true) {
        return "Are you sure to leave?";
    }
}

function validate() {
    isBack = false;
    return true;
}

$(document).ready(function () {
    $("a.a-prevent-back").click(function () {
        isBack = false;
    });
    var activeOrder = afGetGet('orderId', 'orderId');
    if (activeOrder === "" || activeOrder === null) {
        document.location = '/';
    }

});
