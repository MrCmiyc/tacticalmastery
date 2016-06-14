var isBack = true;
$(document).ready(function()
{
	var bModal = true;

	$(document).mousemove(function (e)
	{
		if (e.pageY <= 5 && bModal)
		{
			$("#popup").modal();
			// alert(isBack);
			isBack = false;
		}
	});

	$('#popup').on('hidden.bs.modal', function () {
		isBack = true;
	})

	$(".fullName").change(function ()
	{   //console.log($(this).val());
		consumerName = getFirstLast($(".fullName").val());
		//tempArray = consumerName.split(" ");
		$(".firstName").val(consumerName[0]);
		$(".lastName").val(consumerName[1]);
	});

	$(".kform_submitBtn").click(function ()
	{
		consumerName = $(".fullName").val();
		tempArray = consumerName.split(" ");

		$(".firstName").val(tempArray[0]);
		$(".lastName").val(tempArray[1]);
		$(".kform").submit();
	});

	$("#submitButton").click(function (e)
	{
		$(".kform").submit();
	});

	$('.form-control').keypress(function (e)
	{
		if (e.which == 13)
		{
			console.log("\n pressed enter");
			$(".kform").submit();
		}
	});
});

window.onbeforeunload = function (e) {
	if (isBack == true && false) {
		return "Are you sure to leave?";
	}
}