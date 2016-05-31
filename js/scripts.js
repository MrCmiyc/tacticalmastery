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
