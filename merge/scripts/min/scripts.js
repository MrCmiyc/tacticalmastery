function args(e){var a={},t=/^jQuery\d+$/;return $.each(e.attributes,function(e,r){r.specified&&!t.test(r.name)&&(a[r.name]=r.value)}),a}function api(e,a,t){var r="https://api.tacticalmastery.com";$.ajax({type:"GET",url:r+"/"+e+"/",data:a,contentType:"application/json",success:function(e){"undefined"!=typeof e.result,t(e)},error:function(e){console.log("error")}})}function getQueryVariable(e){for(var a=window.location.search.substring(1),t=a.split("&"),r=0;r<t.length;r++){var o=t[r].split("=");if(decodeURIComponent(o[0])==e)return decodeURIComponent(o[1])}return""}function randString(e){for(var a="";a.length<e&&e>0;){var t=Math.random();a+=t<.1?Math.floor(100*t):String.fromCharCode(Math.floor(26*t)+(t>.5?97:65))}return a}function getSetSet(e,a,t){a=a||"",t=t||e;var r=a;"undefined"!=typeof Storage&&(r=localStorage.getItem(e),null==r&&(r=getQueryVariable(t)),localStorage.setItem(e,r)),$("input[name="+e+"]").val(r)}function getFirstLast(e){var a=e.split(" "),t=a[0];a.shift();var r="";return r=a instanceof Array?a.join(" "):a,[t,r]}function afGetGet(e,a){a=a||!1;var t;return"undefined"!=typeof Storage&&(t=localStorage.getItem(e)),a&&(qParam=getQueryVariable(a),qParam&&(localStorage.setItem(e,qParam),t=qParam)),t?t.replace(/[+]/g," "):t}function afSetSet(e,a){"undefined"!=typeof Storage&&localStorage.setItem(e,a)}function addHiddenField(e,a,t){var r=document.createElement("input");r.type="hidden",r.name=a,r.value=t,e.appendChild(r)}function SubmitSubmit(e){$("div#js-div-loading-bar").show();var a=$("select[name=year]").val(),t=$("select[name=month]").val(),r=new Date,o=r.getFullYear().toString().substr(2,2),n=("0"+(r.getMonth()+1)).slice(-2);if(!(o<a||o==a&&n<=t))return $("div#js-div-loading-bar").fadeOut(),$("#popModalHead").html("Problem with your order"),$("#popModalBody").html("Invalid Expiration Date"),void $("#popModal").modal();var s=[];"orderform"==pageInfo.type&&(s=["firstName","lastName","emailAddress","phoneNumber","address1","address2","city","state","postalCode","cardNumber","cardSecurityCode","month","year","campaignId","product1_id","product1_qty"]);var d="campaignId=3&product1_qty=1";$(e).find("input").each(function(){if($.inArray($(this).attr("name"),s)!=-1){var e=$(this).val();e&&(e=encodeURIComponent(e),$(this).is(":radio")?$(this).is(":checked")&&(""!=d&&(d+="&"),d+=$(this).attr("name")+"="+e,"product1_id"===$(this).attr("name")&&afSetSet("initialProductId",e)):(""!=d&&(d+="&"),d+=$(this).attr("name")+"="+e))}}),$(e).find("select").each(function(){if($.inArray($(this).attr("name"),s)!=-1){var e=$(this).val();e&&(""!=d&&(d+="&"),d+=$(this).attr("name")+"="+e)}}),window.myOrderID&&(d+="&orderId="+window.myOrderID);var i=["affId","s1","s2","s3"];return $.each(i,function(e,a){ls_name="f_"+a,f_val=afGetGet(ls_name,a),f_val&&(""!=d&&(d+="&"),d+=a+"="+f_val)}),api("order",d,function(e){switch(json=JSON.parse(e),json.result){case"SUCCESS":"undefined"!=typeof json.message.orderId&&(window.myOrderID=json.message.orderId,afSetSet("orderId",myOrderID)),document.location="/us_recharge.html?orderId="+window.myOrderID;break;case"ERROR":json.message&&($("#popModalHead").html("Problem with your order"),"Invalid Credit Card Number"!=json.message.trim()&&(json.message='Eek! Something went dark with your order and it was not processed. Call our support team to shed some light and get your order processed right away! - <a href="tel:+18444478240">(844) 447-8240</a>'),$("#popModalBody").html('<span style="color:red;font-size:24px">'+json.message+"</span>"),$("#popModal").modal())}$("div#js-div-loading-bar").fadeOut()}),$(e).find("input.af").each(function(){""!=$(this).val()&&(f_name="f_"+$(this).attr("name"),afSetSet(f_name,$(this).val()),"f_fullName"==f_name&&(nameParts=getFirstLast($(this).val()),afSetSet("f_firstName",nameParts[0]),afSetSet("f_lastName",nameParts[1])))}),!1}function doUpsellYes(e,a){if($("div#js-div-loading-bar").show(),window.myOrderID){var t="orderId="+window.myOrderID+"&productQty=1",r="/us_hlmp.html?orderId="+window.myOrderID;switch(e){case"hdlmp":a=$("#lampId").val()||"31",r="/thankyou.html?orderId="+window.myOrderID;break;case"recharge":a=a||"12",r="/us_hlmp.html?orderId="+window.myOrderID}a&&(t+="&productId="+a,api("upsell",t,function(e){if(json=JSON.parse(e),"SUCCESS"==json.result)return void(document.location=r);if("ERROR"==json.result){if(json.message){var a="";if("string"==typeof json.message){if(a=json.message,"This upsale was already taken."===a)return void(document.location=r)}else for(var t in json.message)json.message.hasOwnProperty(t)&&(a+=t+":"+json.message[t]+"<br>");$("#popModalHead").html("Problem with your Addon"),$("#popModalBody").html(a),$("#popModal").modal()}}else $("#popModalHead").html("Problem with your Addon"),$("#popModalBody").html("An unknown error occured, try again or call our customer service"),$("#popModal").modal();$("div#js-div-loading-bar").fadeOut()}))}else alert("There was an error finding your order, please refresh the page and try again."),$("div#js-div-loading-bar").fadeOut()}function doUpsellNo(e){$("div#js-div-loading-bar").show();var a="/thankyou.html?orderId="+window.myOrderID;switch(e){case"recharge":a="/us_hlmp.html?orderId="+window.myOrderID}document.location=a}function populateThanksPage(e){"array"===$.type(e)&&(e=e[0]),$("#totalBilled").html(e.currencySymbol+" "+e.price),$("#orderNumber").html(e.orderId),$("#totItems").html("Order Summary"),$.each(e.items,function(e,a){$("#orderDet tr:last").after("<tr><td>"+a.name+'</td><td class="text-right">'+a.price+"</td></tr>")}),api("trans","orderId={0}".sprtf(myOrderID),function(e){json=JSON.parse(e),"SUCCESS"==json.result&&json.message.data&&(firstRow=json.message.data[0],firstRow&&firstRow.merchantDescriptor?$("#ccIdentity").html("<br>"+firstRow.merchantDescriptor):$("#ccIdentity").html("<br>Tactical Mastery"))})}String.prototype.sprtf=function(){var e,a;return a=/\{\d+\}/g,e=arguments,this.replace(a,function(a){return e[a.match(/\d+/)]})},$(document).ready(function(){if(void 0!=pageInfo){window.trkStuff=new Array;var e=["affId","s1","s2","s3"],a=document.forms.formLead;if($.each(e,function(e,t){var r="f_"+t,o=afGetGet(r,t);o&&(trkStuff[t]=o,void 0!=a&&addHiddenField(a,t,o))}),$("#terms").click(function(e){bModal=!1,$("#popModalHead").html("Terms and Conditions"),$("#popModalBody").load("terms.html"),$("#popModal").modal()}),$("#privacy").click(function(e){bModal=!1,$("#popModalHead").html("Privacy Policy"),$("#popModalBody").load("privacy.html"),$("#popModal").modal()}),$("#popupTerms").on("hidden.bs.modal",function(e){bModal=!0}),pageInfo.autopopulate&&$("input.af").each(function(){f_name="f_"+$(this).attr("name"),$(this).val(afGetGet(f_name,$(this).attr("name")))}),pageInfo.hasorderid)if("orderform"==pageInfo.type?window.myOrderID=null:window.myOrderID=afGetGet("orderId","orderId"),null==myOrderID){paramString="";var t=!0,r=["firstName","lastName","phoneNumber"],o=["emailAddress","affId","s1","s2","s3"];$.each(r.concat(o),function(e,a){ls_name="f_"+a,f_val=afGetGet(ls_name,a),f_val?(""!=paramString&&(paramString+="&"),paramString+=a+"="+f_val):r.indexOf(a)!=-1&&(t=!1)}),t&&api("createlead",paramString,function(e){json=JSON.parse(e),"undefined"!=typeof json.message.orderId&&(window.myOrderID=json.message.orderId,afSetSet("orderId",myOrderID))})}else api("getlead","orderId={0}".sprtf(myOrderID),function(e){if(json=JSON.parse(e),"thankyou"==pageInfo.type)"SUCCESS"==json.result?populateThanksPage(json.message.data):"ERROR"==json.result?alert("Error: "+json.message):alert("undefined error. please try again");else if(json.message&&json.message.data&&json.message.data[0]&&"COMPLETE"==json.message.data[0].orderStatus){var a=!0;if("upsell"==pageInfo.type){var t=json.message.data[0].dateUpdated+" GMT-0400",r=new Date(t),o=new Date,n=(o-r)/1e3/60;a=n>55}a&&(isBack=!1,setTimeout("location.href = '/thankyou.html';",1500))}});"orderform"==pageInfo.type&&($("#frm_order").formValidation({framework:"bootstrap",err:{container:"#formerrors"},fields:{firstName:{row:".field",validators:{notEmpty:{message:"First name is required"},stringLength:{min:3,max:30,message:"The name must be more than 3 and less than 30 characters long"},regexp:{regexp:/^[a-zA-Z0-9_\-]+$/,message:"Names can only consist of alphabetical, number, underscore and hyphen"}}},lastName:{row:".field",validators:{notEmpty:{message:"Last name is required"},stringLength:{min:3,max:30,message:"The name must be more than 3 and less than 30 characters long"},regexp:{regexp:/^[a-zA-Z0-9_\-]+$/,message:"Names can only consist of alphabetical, number, underscore and hyphen"}}},emailAddress:{row:".field",validators:{notEmpty:{message:"The email address is required"},emailAddress:{message:"The input is not a valid email address"}}},phoneNumber:{row:".field",validators:{notEmpty:{message:"Phone number is required"},stringLength:{min:9,max:20,message:"Please use a proper phone number, area code first"}}},address1:{row:".field",validators:{notEmpty:{message:"Please enter a street address"},stringLength:{min:2,max:60,message:"please enter a full street adress"}}},state:{row:".field",validators:{notEmpty:{message:"Please enter a city name"}}},city:{row:".field",validators:{notEmpty:{message:"Please enter a city name"},stringLength:{min:2,max:50,message:"Please enter a proper length city"}}},postalCode:{row:".field",validators:{notEmpty:{message:"Please enter a zip code"},stringLength:{min:5,max:10,message:"please enter a 5 digit or 9 digit zip code"}}},cardNumber:{row:".field",validators:{notEmpty:{message:"Please enter a valid card number"},stringLength:{min:14,max:16,message:"Credit card must be 15 or 16 digits"}}},cardSecurityCode:{row:".field",validators:{notEmpty:{message:"Please enter a valid security code"},stringLength:{min:3,max:4,message:"Security code Invalid Length"}}},cardNumberSpace:{row:".field",validators:{notEmpty:{message:"Please enter a valid card number"},stringLength:{min:13,max:16,message:"Card number Invalid Length"}}}}}).on("status.field.fv",function(e,a){a.fv.disableSubmitButtons(!1)}).on("success.field.fv",function(e,a){a.fv.getSubmitButton()&&a.fv.disableSubmitButtons(!1)}).on("err.form.fv",function(e){$("#popErrors").modal(),e.preventDefault()}).on("success.form.fv",function(e){fakevar=SubmitSubmit("#frm_order"),e.preventDefault()}),$.getJSON("//geo.tacticalmastery.com/get/",function(e){e&&e.region&&$("#f_state option").filter(function(){return $(this).text()==e.region}).prop("selected",!0)})),"upsell"==pageInfo.type&&($("#upsellYes").click(function(e){isBack=!1,doUpsellYes(pageInfo.upsellval)}),$("#upsellNo").click(function(e){isBack=!1,doUpsellNo(pageInfo.upsellval)}))}});