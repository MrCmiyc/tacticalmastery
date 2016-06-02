//let's define a helper to encode fields spaces to pluses
String.prototype.plusEncode = function() 
{
    return encodeURIComponent(this).replace(/\%20/gm,"+");
}

//let's define a helper to decode fields pluses to spaces
String.prototype.plusDecode = function() 
{
    return decodeURIComponent(this.replace(/\+/gm,"%20"));
}

//let's define a helper to mimic printf
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

//let's define a function to help us perform AJAX requests
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

//let's define a function to help absorb query string params
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

//let's define a function to help us create random strings
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
	var sValue = value;
	
	if(!qsfield) qsfield = field;
				
	if(typeof(Storage) !== "undefined")
	{
		sValue = localStorage.getItem(field);
		
		if(sValue==null) 
		{
			sValue = getQueryVariable(qsfield);
			localStorage.setItem(field,sValue);
		}
	}
	
	return sValue;
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

$(document).ready(function ()
{
	//let's also deal with this in the index page maybe instead
	var sFullName = getQueryVariable("fullName");
	
	if(sFullName)
	{
		nameParts = getFirstLast(sFullName.plusDecode());
		afSetSet('firstName', nameParts[0]);
		afSetSet('lastName', nameParts[1]);
	}
	
	if (pageInfo != undefined) {
		//check ap
		if (pageInfo.autopopulate) {
			$('input.af').each(function() {
				f_name = $( this ).attr('name');
				$( this ).val(afGetGet(f_name,$( this ).attr('name')));
			});
		}
		if (pageInfo.hasorderid) {
			if(localStorage.getItem("orderId") == null)
			{
				paramString = '';
				$.each(['firstName', 'lastName', 'emailAddress', 'phoneNumber'], function( index, f_name ) {
					ls_name = f_name; //todo: refactor localstorage name into our getsetter class
					f_val = afGetGet(ls_name, f_name);
					if (f_val) 
					{
						console.log(f_val);
						if (paramString != '') paramString += '&';
						paramString +=f_name + "=" + f_val;
					}
				});
				
				if(paramString != '')
				{
					api("https://staging.tacticalmastery.com/api/createlead/",paramString,function(e)
					{
						json = JSON.parse(e);

						if(typeof json.message.orderId != 'undefined') afSetSet("orderId",json.message.orderId);
							else console.log(e);
					});					
				}
			}
			else
			{
				api("https://staging.tacticalmastery.com/api/getlead/","orderId={0}".sprtf(afGetGet("orderId")),function(e)
				{
					//let's detect if it's a sale then take them to a receipt page?
					console.log(e);
				});
			}
		}
		
		if(typeof fieldInfo != 'undefined')
		{
			//let's create an easy way to deal with custom html and input fields
			$.each(fieldInfo,function(k,v)
			{
				if(typeof v.attrs != 'undefined')
				{
					var sType = (typeof v.type == 'undefined') ? 'input' : v.type;
					var sSelector = "{0}[name={1}]".sprtf(sType,v.name);
					var oElement = $(sSelector);
					
					if(oElement) 
					{
						if(oElement.length > 1)
						{
							for(i=0;i<oElement.length-1;i++)
							{
								if(typeof v.default != 'undefined') 
								{
									if(oElement[i].value == v.default && oElement[i].type == 'radio') oElement[i].checked = true;
								}

								$.each(v.attrs,function(x,y)
								{
									if(typeof y == 'boolean') oElement.prop(x,y);
										else oElement.attr(x,y);
								});
							}
						}
						else
						{
							if(typeof v.value != 'undefined') oElement.val(v.value);

							$.each(v.attrs,function(x,y)
							{
								if(typeof y == 'boolean') oElement.prop(x,y);
									else oElement.attr(x,y);
							});
						}
					}			
				}
			});
		
			$('form.af').validator().on('submit', function (e) 
			{
				if (e.isDefaultPrevented()) 
				{
					console.log("invalid form");
				} 
				else 
				{
					if (pageInfo.hasorderid) event.preventDefault(); //let the squeeze page act normal
					
					var params = "";
					
					if(typeof fieldInfo != 'undefined')
					{
						$.each(fieldInfo,function(k,v)
						{
							var sType = (typeof v.type == 'undefined') ? 'input' : v.type;
							var sSelector = "{0}[name={1}]".sprtf(sType,v.name);
							
							var sValue = (sType == "localstorage") ? localStorage.getItem(v.name) : (typeof v.value != 'undefined') ? v.value : $(sSelector).val();
							var sName = (typeof v.alias == 'undefined') ? v.name : v.alias;
						
							params = "{0}&{1}={2}".sprtf(params,sName,sValue);
						});
						
						console.log(params);
						console.log(creditcardjs.isValid());
						
						api("https://staging.tacticalmastery.com/api/order/","campaignId=3{0}".sprtf(params),function(e)
						{
							console.log(e);
						});
					}
					
					console.log("valid form");
				}
			})
		}
	}
});

