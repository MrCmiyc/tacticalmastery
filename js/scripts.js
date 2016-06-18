String.prototype.sprtf = function()
{
    var args, pattern;
    pattern = /\{\d+\}/g;
    args = arguments;
    return this.replace(pattern, function(capture)
    {
        return args[capture.match(/\d+/)];
    });
};

function args(elem) {
	// Return an object of element attributes
	var newAttrs = {};
	var rinlinejQuery = /^jQuery\d+$/;
	$.each(elem.attributes, function(i, attr) {
		if (attr.specified && !rinlinejQuery.test(attr.name)) {
			newAttrs[attr.name] = attr.value;
		}
	});
	return newAttrs;
}

function api(endpoint,data,element)
{
	var url = 'https://api.tacticalmastery.com';
	var jqxhr = $.ajax(
	{
		type: 'GET',
		url: url + "/" + endpoint + "/",
		data: data,
		contentType: "application/json",
		success: function(e)
		{
			//console.log('api success');
			if(typeof e.result != "undefined")
			{
			}
			element(e);
		},
		error: function(e)
		{
			console.log("error");
		}
	});
}

function getQueryVariable(variable) 
{
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) 
	{
		var pair = vars[i].split('=');
		
		if (decodeURIComponent(pair[0]) == variable) 
		{
			return decodeURIComponent(pair[1]);
		}
	}
	
	return "";
}	

function randString(x)
{
	var s = "";
	
	while(s.length<x&&x>0)
	{
		var r = Math.random();
		s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
	}
	
	return s;
}

function getSetSet(field,value,qsfield)
{

	value = value || '';
	qsfield = qsfield || field;

	var sField = value;

	if(typeof(Storage) !== "undefined")
	{
		sField = localStorage.getItem(field);
		if(sField==null) sField = getQueryVariable(qsfield);
		
		localStorage.setItem(field,sField);
	}
	
	$("input[name="+field+"]").val(sField);
}

function getFirstLast(instring) {
	var parts = instring.split(' ');
	var fn = parts[0];
	parts.shift(); // parts is modified to remove first word
	var ln = '';
	if (parts instanceof Array) {
		ln = parts.join(' ');
	}
	else {
		ln = parts;
	}
	return [fn,ln];
}


function afGetGet(field,qsfield)
{
	qsfield = qsfield || false;
	var returnThis;

	if(typeof(Storage) !== "undefined")
	{
		returnThis = localStorage.getItem(field);
	}
	//if (returnThis == undefined) {
		if(qsfield) {

			qParam = getQueryVariable(qsfield);
			if (qParam) {
				//TODO: this is buggy, no check for local storage, lets just define our own getter setter method for ls, then gracefully fall back to a cookie
				localStorage.setItem(field,qParam);
				returnThis = qParam;
			}
		//} else {
		//	returnThis = '';
		}
	//}
	if (returnThis) return returnThis.replace(/[+]/g, ' ');
	return returnThis

}

function afSetSet(field,value)
{

	if(typeof(Storage) !== "undefined")
	{
		localStorage.setItem(field,value);
	}
}


/*  Page borne stuffs
  todo: this needs serious refactoring to perform as intended.
   todo:  messages/next/prev shoudl flow into a function that just handles success events and responds accordingly
   todo: need to clousure this mess
 */
function SubmitSubmit(this_form) {
//"/api/order/?firstName=danner-3&lastName=omerick&address1=123+main+street&city=sarasota&state=fl&postalCode=34202&phoneNumber=551-587-8328&emailAddress=zedzedbeta5@yahoo.com&orderId=B2DF48140C&cardNumber=0000000000000000&cardSecurityCode=100&month=06&year=17&campaignId=3&product1_id=3&product1_qty=1
	$("div#js-div-loading-bar").show();
	var apiFields = [];
	if (pageInfo.type == "orderform") {
		apiFields = ['firstName', 'lastName', 'emailAddress', 'phoneNumber','address1','address2','city','state','postalCode','cardNumber','cardSecurityCode','month','year','campaignId','product1_id','product1_qty']
	}
	//console.log("sumbitted: "+$(this_form).attr('name'));
	paramString = 'campaignId=3&product1_qty=1';

	$( this_form ).find('input').each(function() {
			if ($.inArray($(this).attr('name'),apiFields) != -1) {
				uVal = $(this).val();
				if (uVal) {
					uVal = encodeURIComponent(uVal);
					if ($(this).is(':radio')) {
						if ($(this).is(':checked')){
						if (paramString != '') paramString += '&';
						paramString += $(this).attr('name') + "=" + uVal;}
					} else {
						if (paramString != '') paramString += '&';
						paramString += $(this).attr('name') + "=" + uVal;
					}
				}
			}
			//console.log($(this).attr('name') +"="+ $(this).val());
	});

	$( this_form ).find('select').each(function() {
		if ($.inArray($(this).attr('name'),apiFields) != -1) {
			uVal = $(this).val();
			if (uVal) {
				if (paramString != '') paramString += '&';
				paramString +=$(this).attr('name') + "=" + uVal;
			}
		}
		//console.log($(this).attr('name') +"="+ $(this).val());
	});
	if (window.myOrderID) paramString += "&orderId=" + window.myOrderID;


	//console.log(paramString);
	//just do the order right meow and get a response
	api("order",paramString,function(e)
	{
		json = JSON.parse(e);

		//console.log(json);
		switch(json.result) {
			case 'SUCCESS':
				if(typeof json.message.orderId != 'undefined') {
					window.myOrderID = json.message.orderId;
					afSetSet("orderId", myOrderID);
				}
				document.location = '//secure.tacticalmastery.com/us_hlmp.html?orderId=' + window.myOrderID;
				break;
			case 'ERROR':
				if (json.message) {
					if (json.message == 'Order is already completed') {
						document.location = '//secure.tacticalmastery.com/us_hlmp.html?orderId=' + window.myOrderID;
					} else {
						$("#popModalHead").html('Problem with your order');
						$("#popModalBody").html(json.message);
						$("#popModal").modal();
					}
				}
				$("div#js-div-loading-bar").hide();
				break;
			default:
				//todo: reply back to our api instead of logging here
				break;
		}
	});

	$( this_form ).find('input.af').each(function(){
		if ($(this).val() != "") {
			f_name = "f_" + $( this ).attr('name');
			afSetSet(f_name, $( this ).val());
			if (f_name == 'f_fullName') {
				nameParts = getFirstLast($( this ).val());
				afSetSet('f_firstName', nameParts[0]);
				afSetSet('f_lastName', nameParts[1]);
			}
		}
	});

	return false;
}

function doUpsellYes(upsellID,productId){
	if (window.myOrderID) {
		var paramString = 'orderId=' + window.myOrderID;
		var nextPage='//secure.tacticalmastery.com/thankyou.html?orderId=' + window.myOrderID;
		switch (upsellID) {
			case 'hdlmp':
				productId = productId || '31';
				paramString += '&productQty=' + $('#selQty').val();
				nextPage='//secure.tacticalmastery.com/us_recharge.html?orderId=' + window.myOrderID;
				break;
			case 'recharge':
				paramString += '&productQty=1';
				productId = productId || '12';
				//no nextpage, since this is the last in the chain
				break;
			default:
		}
		if (productId) {
			paramString += '&productId=' + productId;
			api("upsell",paramString,function(e)
			{
				json = JSON.parse(e);

				//console.log(json);
				if (json.result == "SUCCESS") {
					document.location = nextPage;
				} else if (json.result == "ERROR") {
					if (json.message) {
						if (json.message == 'This upsale was already taken.') {
							document.location = nextPage;
						} else {
							$("#popModalHead").html('Problem with your Addon');
							$("#popModalBody").html(json.message);
							$("#popModal").modal();
						}
					}
				} else {
					$("#popModalHead").html('Problem with your Addon');
					$("#popModalBody").html('An unknown error occured, try again or call our customer service');
					$("#popModal").modal();
				}
			});
		}
	} else {
		alert("There was an error finding your order, please refresh the page and try again.")
	}
}
function doUpsellNo(upsellID){
	var nextPage='//secure.tacticalmastery.com/thankyou.html?orderId=' + window.myOrderID;
	switch (upsellID) {
		case 'hdlmp':
			nextPage='//secure.tacticalmastery.com/us_recharge.html?orderId=' + window.myOrderID;
			break;
		default:
	}
	document.location = nextPage;
}

function populateThanksPage(orderInfos) {

	if ($.type( orderInfos ) === "array") orderInfos = orderInfos[0];
	//console.log(orderInfos);
	$('#totalBilled').html(orderInfos['currencySymbol'] + ' ' + orderInfos['price'] );
	$('#orderNumber').html(orderInfos['orderId'] );
	$('#totItems').html("Order Summary");
	$.each( orderInfos.items, function( i, val ) {
		$('#orderDet tr:last').after('<tr><td>'+ val.name+'</td><td class="text-right">'+ val.price+'</td></tr>');
	});
	//now loop and add the products

}

$(document).ready(function ()
{
	if (pageInfo != undefined) {

		//Terms and privacy popups
		$('#terms').click(function(e)
		{
			bModal = false;
			$("#popModalHead").html('Terms and Conditions');
			$("#popModalBody").load('terms.html');
			$("#popModal").modal();
		});

		$('#privacy').click(function(e)
		{
			bModal = false;
			$("#popModalHead").html('Privacy Policy');
			$("#popModalBody").load('privacy.html');
			$("#popModal").modal();
		});

		$('#popupTerms').on('hidden.bs.modal', function (e)
		{
			bModal = true;
		});


		//check autopopulate
		if (pageInfo.autopopulate) {
			$('input.af').each(function() {
				f_name = "f_" + $( this ).attr('name');
				//console.log("populating:"+f_name+"|")
				$( this ).val(afGetGet(f_name,$( this ).attr('name')));
			});
		}
		if (pageInfo.hasorderid) {
			window.myOrderID = afGetGet("orderId","orderId");
			if(myOrderID == null)
			{
				paramString = '';
				var okToQuery = true;
				var requiredFields = ['firstName', 'lastName', 'emailAddress'];
				var optionalFields = ['phoneNumber'];
				$.each(['firstName', 'lastName', 'emailAddress', 'phoneNumber'], function( index, f_name ) {
					ls_name = "f_" + f_name; //todo: refactor localstorage name into our getsetter class
					f_val = afGetGet(ls_name, f_name);
					if (f_val) {
						//console.log(".");
						if (paramString != '') paramString += '&';
						paramString +=f_name + "=" + f_val;
					} else if (requiredFields.indexOf(f_name) != -1) {
						okToQuery = false;
						//console.log("breakquery: missing required field")
					}
				});
				if (okToQuery) api("createlead",paramString,function(e)
				{
					json = JSON.parse(e);

					if(typeof json.message.orderId != 'undefined') {
						window.myOrderID = json.message.orderId;
						afSetSet("orderId", myOrderID);
					}
				});
			}
			else
			{
				//window.orderID = afGetGet("orderId","orderId");
				//todo: just send /getlead (endpoints and have the function do the uri
				api("getlead","orderId={0}".sprtf(myOrderID),function(e)
				{
					json = JSON.parse(e);
					if (pageInfo.type == 'thankyou') {
						//console.log("hey it's a thank you page!");
						if (json.result == "SUCCESS") {
							populateThanksPage(json.message.data);
						} else if (json.result == "ERROR") {
							alert('Error: '+ json.message )
						} else {
							alert('undefined error. please try again');
						}

					}
				});
			}
		}

			//$( "#frm_order" ).submit(function (event) {
			//	if (pageInfo.hasorderid) {
			//		event.preventDefault();
			//		return false;
			//	}
            //
			//});

		//ditching this for now
		// if (pageInfo.helpaddress) {
        //
		//	$.LiveAddress({
		//		key: '10837777848707382',
		//		waitForStreet: true,
		//		geolocate: true,
		//		geolocatePrecision: "city",
		//		submitSelector: "#checkoutSubmit",
		//		addresses: [{
		//			id: 'shipping',		// IDs are not part of the address
		//			address1: '#f_address1',
		//			address2: '#f_address2',
		//			locality: '#f_city',
		//			administrative_area: '#f_state',
		//			postal_code: '#f_zip'
		//		}]
		//	});
		//}
		//todo: this is temporary and only goes by page type being different. it will get messy.
		if (pageInfo.type == 'orderform') {
			//console.log("we is validating");
			$('#frm_order').formValidation({
				framework: 'bootstrap',
				err: {
					container: '#formerrors'
				},
				fields: {
					firstName: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'First name is required'
							},
							stringLength: {
								min: 3,
								max: 30,
								message: 'The name must be more than 3 and less than 30 characters long'
							},
							regexp: {
								regexp: /^[a-zA-Z0-9_]+$/,
								message: 'Names can only consist of alphabetical, number and underscore'
							}
						}
					},
					lastName: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Last name is required'
							},
							stringLength: {
								min: 3,
								max: 30,
								message: 'The name must be more than 3 and less than 30 characters long'
							},
							regexp: {
								regexp: /^[a-zA-Z0-9_]+$/,
								message: 'Names can only consist of alphabetical, number and underscore'
							}
						}
					},
					emailAddress: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'The email address is required'
							},
							emailAddress: {
								message: 'The input is not a valid email address'
							}						}
					},
					phoneNumber: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Phone number is required'
							},
							stringLength: {
								min: 9,
								max: 20,
								message: 'Please use a proper phone number, area code first'
							}
						}
					},
					address1: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Please enter a street address'
							},
							stringLength: {
								min: 2,
								max: 60,
								message: 'please enter a full street adress'
							}
						}
					},
					state: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Please enter a city name'
							}
						}
					},

					city: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Please enter a city name'
							},
							stringLength: {
								min: 2,
								max: 50,
								message: 'Please enter a proper length city'
							}
						}
					},
					postalCode: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Please enter a zip code'
							},
							stringLength: {
								min: 5,
								max: 10,
								message: 'please enter a 5 digit or 9 digit zip code'
							}
						}
					},
					cardNumberSpace: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Please enter a valid card number'
							},
							stringLength: {
								min: 14,
								max: 20,
								message: 'Credit card must be 15 or 16 digits'
							}
						}
					},
					cardSecurityCode: {
						row: '.field',
						validators: {
							notEmpty: {
								message: 'Please enter a valid security code'
							},
							stringLength: {
								min: 3,
								max: 4,
								message: 'Security code Invalid Length'
							}
						}
					}
				}
			}).on('status.field.fv', function(e, data) {
				data.fv.disableSubmitButtons(false);
			}).on('success.field.fv', function(e, data) {
				if (data.fv.getSubmitButton()) {
					data.fv.disableSubmitButtons(false);
				}
			}).on('err.form.fv', function(e) {
				$("#popErrors").modal();
				e.preventDefault();
			}).on('success.form.fv', function(e) {
				var year = $("select[name=year]").val();
				var month = $("select[name=month]").val();
				var d = new Date();
				var currentYear = d.getFullYear().toString().substr(2,2);
				var currentMonth = ("0" + (d.getMonth() + 1)).slice(-2)
				if (currentYear < year) {
					fakevar = SubmitSubmit('#frm_order');
				} else if ((currentYear == year) && (currentMonth <= month)) {
					fakevar = SubmitSubmit('#frm_order');
				} else {

					$("#popErrorsCustom").modal();
				}
				e.preventDefault();
				return;


			});
			//try to populate the state box
			$.getJSON('//geo.tacticalmastery.com/get/', function(data){
				if (data && data.region) {
					$("#f_state option").filter(function() {
						return $(this).text() == data.region;
					}).prop('selected', true);
				}
			})
		}
		if (pageInfo.type == 'upsell') {

			$('#upsellYes').click(function(e)
			{
				isBack = false;
				doUpsellYes(pageInfo.upsellval)
			});
			$('#upsellNo').click(function(e)
			{
				isBack = false;
				doUpsellNo(pageInfo.upsellval)
			});

		}

	}
});
