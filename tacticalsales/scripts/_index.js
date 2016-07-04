var isBack = true;
var bModal = true;
var msgPrevent = "Are you sure to leave?";
$(document).ready(function() {
    $('div#js-div-popup').on('shown.bs.modal', function () {
        $("input#js-text-first-name").focus();
    });

    $('div#js-div-popup').on('hidden.bs.modal', function() {
        $("input#js-text-first-name, input#js-text-last-name, input#js-text-phone-number").val('');
    });

    $("a.a-prevent-back").click(function() {
        isBack = false;
    });


    var modalForm = new tingle.modal();
    var signupform = '<div class="offer-off"><p class="title">Enter Your Name and Telephone number To INSTANTLY Receive 75% Off The XT808 Flashlight!</p>'
        + '<form action="checkout.html" method="GET" id="js-form-lead" name="formLead">'
        + '<input type="text" class="form-control half-size" id="js-text-first-name" name="firstName" placeholder="Enter Your First Name">'
        + '<input type="text" class="form-control half-size" id="js-text-last-name" name="lastName" placeholder="Your Last Name">'
        + '<input type="tel" class="form-control full-size" id="js-text-phone-number" name="phoneNumber" placeholder="Your Phone Number">'
        + '<button type="submit" id="js-btn-confirm" class="btn btn-block btn-submit kform_submitBtn" onclick="return validate();">'
        + '<i class="fa fa-check"></i><span trans>YES! Instantly Apply My 75% Discount</span>'
        + '</button>'
        + '<p class="no-spam">* we will not spam, rent, or sell your information... *</p>'
        + '</form></div>';
    modalForm.setContent(signupform);

    function modFormBtnClick(e)
    {
        console.log("cluck");
        modalForm.open();
    };


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
