<?php
ini_set('display_errors', '1');
include_once "../../common/HTTP.php";
include_once "../../common/Input.php";
$error = false;
if (isset($_SESSION['customerData'])) {
  $customerData = $_SESSION['customerData'];
} else {
  $baseArray = array("address"=>"","city"=>"","state"=>"","zip"=>"","email"=>"","phone"=>"","cardNumber"=>"","expirationMonth"=>"","expirationYear"=>"","cardCVV"=>"","productId"=>"");
  $customerData = array_merge($_REQUEST,$baseArray);
  $_SESSION['customerData'] = $customerData;
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,700,600' rel='stylesheet' type='text/css'>
<link href="css/style.css" rel="stylesheet" type="text/css" />
<link href="css/responsive.css" rel="stylesheet" type="text/css" />
<title>Primitive</title>
</head>

<body>
<div class="wrapper">
	<header>
    	<img src="images/logo.png" />
    </header>
    <div class="steps">
        <ul>
            <li><div class="step1">STEP 1: CREATE ACCOUNT</div></li>
            <li><div class="step2">STEP 2: CUSTOMIZE ORDER</div></li>
            <li><div class="step3">STEP 3: ORDER COMPLETE</div></li>
        </ul>
    </div>
    <div class="steps-mobile">
        <div class="step1">STEP 1: CREATE ACCOUNT</div>
        <div class="step2">STEP 2: CUSTOMIZE ORDER</div>
        <div class="step3">STEP 3: ORDER COMPLETE</div>
    </div>
    <div class="textbox">
    	<div class="textbox-txt1"><strong class="txt-red">WAIT!</strong> Would you like for us to add</div>
        <div class="textbox-txt2">RECHARGEABLE LITHIUM ION BATTERIES</div>
        <div class="textbox-txt3"><strong>And a Premium Warranty</strong> to your order for <strong class="txt-red">75% OFF?</strong></div>
    </div>
    
    <div class="image">
    <img src="images/battery.png" /></div>
    
  <div class="first">
    
    	<div class="border">
        <div class="box-inner1">
        	1 PREMIUM LITHIUM ION<br />
            RECHARGEABLE BATTERY<br />
            +<br />
            3 YEAR PREMIUM WARRANTY
        </div>
        </div>
        
  </div>
  <div class="second">
    	<div class="box-inner2">
        	<strong>YES!</strong> Please add the <strong>Rechargeable Battery Pack</strong><br />
            and the <strong>Three Year Premium Warranty</strong><br />
            to my order at the discounted rate of<br /><br />
            
          <div class="button2">75% OFF!</div>
        </div>
    </div>
    <div class="third">
    	<div class="box-inner3">
        	<strong>NO,</strong> I would only want the purchase the<br />
            Rechargeable Battery and 1 Year Premium Warranty<br />
            at the original price of <strong>$49</strong><br /><br />
            
            <div class="button3">$49</div>
        </div>
        
        <div class="bottom-txt">
            <a href="#">No thanks, I'll just use some AAA's from around the house :(</a><br />
            <em><strong>IMPORTANT:</strong> AAAs will only last 2 hours. The T5 LED Bulb uses large<br />
            amounts of power for optimal operation.</em>
        </div>
    </div>
</div>
<footer><img src="images/bottom-logo.jpg" /></footer>
</body>
</html>
