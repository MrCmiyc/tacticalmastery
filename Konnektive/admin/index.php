<?php 

$config = KFormConfig::$instance;

//$options = get_option('konnek_campaign_data');

if( $_GET['page'] == 'Konnektive' && $_GET['settings-updated'] == 'true' )
{
	try
	{
		$this->updateCampaignData();
	}
	catch(Exception $e)
	{
		$error = $e->getMessage();
	}
}

?>
	
<style type='text/css'>
table.baseTable {width:100%; border-spacing:0;padding-top:5px}
.baseTable .title{font-size:16px;font-weight:bold;}
.baseTable table{font-size:12px; border-radius:.5em;word-wrap:break-word}
.baseTable td {text-align:left;padding:.8em .5em;border-bottom:thin dotted #CCC;}
.baseTable tr.titleRow {font-size:14px}
.baseTable tr.titleRow td{padding:.8em .5em !important;white-space:nowrap;border-top:1px solid #CCC;border-bottom:1px solid #CCC;font-style:italic}
.baseTable tr.titleRow td.sortable:hover{box-shadow:inset 0 0 1px #000000;background:rgba(0,0,0,0.2) !important;cursor:pointer}
</style>	
<link rel='stylesheet' type='text/css' href='/wordpress/resources/css/kform.css'>    
<div class="wrap">
	<?php screen_icon(); ?>
    
	<h1>Konnektive E-Commerce</h1>

	  <?php
	
if(!empty($error))
{
	echo "<br><span class='formError' style='visibility:visible'>ERROR: $error</span><br><br>";	
	
}
?>


		<form method="post" action="options.php" onsubmit="return validate(); ">
		<?php
			// This prints out all hidden setting fields
			settings_fields( 'konnek_admin_group' );   
			do_settings_sections( 'konnek_admin' );
			submit_button( 'Update Settings', 'submit', 'submit_button' ); 
		?>
		</form>

	
	 <div style="clear:both"></div>
</div>

<script type= 'text/javascript'>
var ret = true;

function validateIsset(name)
{

	var input = document.getElementById(name);
	var errorSpan = document.getElementById(name+'_error');
	var value = input.value;

	if(value == '')
	{
		errorSpan.style.visibility='visible';
		input.style.borderColor='#FF0000';
		input.focus();
		return false;	
	}
	else
	{
		input.style.borderColor = '#DDDDDD';
		errorSpan.style.visibility='hidden';
		return true;
	}
}

function validateUrl(name)
{
	var input = document.getElementById(name);
	var errorSpan = document.getElementById(name+'_error');
	var value = input.value;
	var regexp = /(https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	
	
	if(value != '' && !regexp.test(value))
	{
		errorSpan.style.visibility='visible';
		input.style.borderColor='#FF0000';
		input.focus();
		return false;	
	}
	else
	{
		input.style.borderColor = '#DDDDDD';
		errorSpan.style.visibility='hidden';
		return true;
	}
}


function validate()  
{ 
	ret = true;
	var required = ['loginId','password','campaignId'];
	for(var i in required)
	{
		var name = required[i];
		if(!validateIsset(name))
			ret = false;
	}
	
	var urls = ['mobileRedirectUrl','pcRedirectUrl'];
	for(var i in urls)
	{
		var name = urls[i];
		if(!validateUrl(name))
			ret = false;
	}
	
	return ret;
} 
   
</script>
<style>
.formError
{
	color: red;
	font-size: 14px;
	font-style: italic;
	font-weight: bold;
	margin-left: 10px;
	visibility: hidden;
}
</style>