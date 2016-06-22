$(document).ready(function() {
	function urldecode(url) {
	  return decodeURIComponent(url.replace(/\+/g, ' '));
	}
	console.log("\n Custom Snippets Loaded");
	var seconds = new Date().getTime() / 1000;
  	var goto="checkout?";
  	if (typeof isPresell !== 'undefined') {
		if(isPresell == true){
			goto="index?";
		}
	}
  	overRide = 0; // set in the global scope
  	if(getUrlVar('hidevideo') == 'off'){
	 		$(".embed-responsive-item").remove();

	 		console.log("\n Video Disabled");
 	}

 	if(getUrlVar('pop') == 'off'){
 		$('#popup').attr('id','nopop');
 		goto += "&pop=off";
 		overRide=1;
 		console.log("\n Pop Up Modal Disabled");
 	}
     if(getUrlVar('altText') != ''){
     	goto += "&altText=" + getUrlVar('altText');
     	overRide=1;
     	console.log("\n Changing Buttons to: " +getUrlVar('altText'));
 		$('.popuptitle').html(urldecode(getUrlVar('altText')));
    	$('.btn-submit').html(urldecode(getUrlVar('altText')));
     }
    	if(getUrlVar('75') == 'off'){
    		console.log("\n 75% off verbage off - using alternate checkout");
    		goto += "&75=off&alt=t";
    		overRide=1;
    	}
    	if(getUrlVar('cs') != ''){

		    goto += "&cs=" + getUrlVar('cs');
    		overRide=1;
    	}
    	if(getUrlVar('cs2') != ''){

		    goto += "&cs2=" + getUrlVar('cs2');
    		overRide=1;
    	}
    	if(getUrlVar('cs3') != ''){

		    goto += "&cs3=" + getUrlVar('cs3');
    		overRide=1;
    	}
    	if((overRide == 1) && (disableOverRide != true)){
			var buttonSet = true;
			$('.btn-submit').unbind("click").click(function(){
					window.location.href = goto;
					return false;
			});
			console.log("\n overRide  configured " + goto);
 		}

    // End Toggle

   	// Given a query string "?to=email&why=because&first=John&Last=smith"
   	// getUrlVar("to")  will return "email"
   	// getUrlVar("last") will return "smith"


   	function getUrlVar(key){
   		var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
   		return result && unescape(result[1]) || "";
   	}

   	// To convert it to a jQuery plug-in, you could try something like this:
   	(function($){
   		$.getUrlVar = function(key){
   			var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
   			return result && unescape(result[1]) || "";
   		};
   	})(jQuery);

	if(getUrlVar('cs') != ''){
		 var cs = getUrlVar('cs');
		 if(!isNaN(cs)){

			$.get( "/affiliateCustom/" + cs + ".php?" + seconds, function( data ) {
			  $( "body" ).append( data );
			  console.log( "\n Custom Code Loaded #" + cs  );
			});
		 }
		 else{
			console.log("\n Invalid Custom 1");
		 }
	}
	if(getUrlVar('cs2') != ''){
		 var cs2 = getUrlVar('cs2');
		 if(!isNaN(cs)){

			$.get( "/affiliateCustom/" + cs2 + ".php?"+ seconds, function( data ) {
			  $( "body" ).append( data );
			  console.log( "\n #2 Custom Code Loaded #" + cs2  );
			});
		 }
		 else{
			console.log("\n Invalid Custom #2 ");
		 }
	}
	if(getUrlVar('cs3') != ''){
		 var cs3 = getUrlVar('cs3');
		 if(!isNaN(cs)){

			$.get( "/affiliateCustom/" + cs3 + ".php?" + seconds, function( data ) {
			  $( "body" ).append( data );
			  console.log( "\n #3 Custom Code Loaded #" + cs3  );
			});
		 }
		 else{
			console.log("\n Invalid Custom #3");
		 }
	}

});