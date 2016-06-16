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
