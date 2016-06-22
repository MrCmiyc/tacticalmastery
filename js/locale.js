$(document).ready(function() {
    var locale = window.navigator.userLanguage || window.navigator.language;
    locale = locale.substring(0, 2);
    if (locale != 'es') {
        locale = 'en';
    }
    $.getJSON("locale/" + locale + "/" + pageInfo.langFile + ".json", function (json) {
        $.each($("[data-trans]"), function (index, item) {
            var trans = $(item).text();
            if (json[trans] != undefined) {
                $(item).text(json[trans]);
            }
        });

        $.each($("[placeholder]"), function (index, item) {
            var trans = $(item).attr('placeholder');
            if (json[trans] != undefined) {
                $(item).attr('placeholder', json[trans]);
            }
        });

        $.each($("trans"), function (index, item) {
            var trans = $(item).text();
            if (json[trans] != undefined) {
                $(item).text(json[trans]);
            }
        });
    });
});
