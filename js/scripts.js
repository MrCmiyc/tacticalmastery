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

function api(url,data,element)
{
	var jqxhr = $.ajax(
	{
		type: 'GET',
		url: url,
		data: data,
		contentType: "application/json",
		success: function(e)
		{
			console.log('api success');
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

function getSetSet(field,value="",qsfield=false)
{
	var sField = value;
	
	if(!qsfield) qsfield = field;
				
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


function afGetGet(field,qsfield=false)
{
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
	return returnThis;


}

function afSetSet(field,value)
{

	if(typeof(Storage) !== "undefined")
	{
		localStorage.setItem(field,value);
	}
}


/*  Page borne stuffs

 */
function SubmitSubmit(this_form) {


	console.log("sumbitted: "+$(this_form).attr('name'));
	$( this_form).find('input.af').each(function(){
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

	return true;

}

$(document).ready(function ()
{
	if (pageInfo != undefined) {
		//check ap
		if (pageInfo.autopopulate) {
			$('input.af').each(function() {
				f_name = "f_" + $( this ).attr('name');
				//console.log("populating:"+f_name+"|")
				$( this ).val(afGetGet(f_name,$( this ).attr('name')));
			});
		}
		if (pageInfo.hasorderid) {
			if(localStorage.getItem("orderId") == null)
			{
				paramString = '';
				$.each(['firstName', 'lastName', 'emailAddress', 'phoneNumber'], function( index, f_name ) {
					ls_name = "f_" + f_name; //todo: refactor localstorage name into our getsetter class
					f_val = afGetGet(ls_name, f_name);
					if (f_val) {
						console.log(".");
						if (paramString != '') paramString += '&';
						paramString +=f_name + "=" + f_val;
					}
				});
				api("https://staging.tacticalmastery.com/api/createlead/",paramString,function(e)
				{
					json = JSON.parse(e);

					if(typeof json.message.orderId != 'undefined') afSetSet("orderId",json.message.orderId);
				});
			}
			else
			{
				api("https://staging.tacticalmastery.com/api/getlead/","orderId={0}".sprtf(afGetGet("orderId")),function(e)
				{
				});
			}
		}

		// trap our forms the same way. We loop the forms and trap their submits
		$('form.af').each(function() {
			//alert('found a form');
			$( this ).submit(function (event) {
				//alert('form submitted');
				if (pageInfo.hasorderid) event.preventDefault(); //let the squeeze page act normal
				//this.submit();
				return SubmitSubmit(this);
			});
		});

	}
});

