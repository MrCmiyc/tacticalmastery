<?php
session_start();
ini_set('display_errors', '1');
include_once "common/HTTP.php";
include_once "common/Input.php";
// We have the phone number, so we should save it somewhere so we can call on it later.
$error = false;
//var_dump($_SESSION);
if (isset($_SESSION['customerData'])) {
  $customerData = $_SESSION['customerData'];
} else {
  $baseArray = array("address"=>"","city"=>"","state"=>"","zip"=>"","email"=>"","phone"=>"","cardNumber"=>"","expirationMonth"=>"","expirationYear"=>"","cardCVV"=>"","productId"=>"","firstName"=>"");
  $customerData = array_merge($_REQUEST,$baseArray);
}

$_SESSION['customerData'] = $customerData;

if (isset($_POST['state'])) {
  //include_once "core.sale.php";
  $_SESSION['customerData'] = $_REQUEST;
  $customerData = $_SESSION['customerData'];
  $checkInputs = Input::checkRequiredFields(array("address","city","state","zip","email","phone","cardNumber","expirationMonth","expirationYear","cardCVV","productId","lastName"));
  if ($checkInputs !== true) {
    $_SESSION['error'] = $checkInputs['error'];
  } else {
    header("Location: /battery_upsell/index.php");
    exit;
  }
}
?><!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Required meta tags always come first -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,700,300,800' rel='stylesheet' type='text/css'>
    <title>XT808 Flashlight - Save 75%</title>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
    
    <script type="text/javascript">
	$(function() {
	blinkeffect('#txtblnk');
	})
	function blinkeffect(selector) {
	$(selector).fadeOut('slow', function() {
	$(this).fadeIn('slow', function() {
	blinkeffect(this);
	});
	});
	}
	</script>
  </head>
  <style>
  	body{
		font-family:Arial, Helvetica, sans-serif !important;
		font-size:14px !important;
	}
	
	.form-control{
		box-shadow: 0px 0px 2px #ccc !important;
	}
	
	.table td, .table th {
		padding: .75rem;
		line-height: 1.5;
		vertical-align: top;
		border-top: none !important;
	}
	
	label{
		display:inherit !important;
	}
	
	.coupon img{
		width:100%;
	}
	
	.flashbig img{
		width:100%;
		margin-bottom:20px;
	}
	
	@media (max-width:425px){
		.flashbig{
			display:none;
		}
		
		.txt-big{
			display:none;
		}
	}
  </style>
  <!--<script src="//cdn.optimizely.com/js/5976062002.js"></script>-->
  <body style="background-color:#eaeaea">
    <div class="container">
      <div class="row">
        <br>
        <center><img src="images/logo-prim.png"></center>
        
        <!--<center><h1 class="text-center toptitle">75% Off - XT808 LED Flashlight</h1></center>-->

        <!--<img src="./xt808_files/featured-in.png" class="img-responsive center-block" alt="Featured in">-->
      </div>
      <div class="banner">
      	<img src="images/banner-fl.gif">
      </div>
      
      <div class="txt-big" style="margin-bottom:20px; text-align:center; font-family: 'Open Sans', sans-serif; font-size: 30px; font-weight:800; letter-spacing: 5px;">TODAY, YOU QUALIFY FOR FREE SHIPPING! ORDER NOW!</div>
      
      <div class="row">
        <form action="core.php" method="POST">
        <div class="col-lg-6">
          <?php
          if (isset($_SESSION['error'])) {
            echo "<span style='color:red'>" . $_SESSION['error'] . "</span>";
            unset($_SESSION['error']);
          }
          ?>
          <div class="panel-white">
          	<div class="coupon"><img src="images/coupon2.jpg"></div>
            <center><strong>YOUR FREE SHIPPING HAS BEEN APPLIED!</strong></center><br><br>
            <center><h4>Step #1: Select Quantity</h4></center>
            <hr>
            <table cellpadding="0" cellspacing="0" class="table">
              <thead>
                <th width="30">Item</th>
                <th width="504"> </th>
                <th width=53>Price</th>
              <tbody>
                <tr>
                  <td><input type="radio" name="productId" id="3lights" value="5"></td>
                  <td><label for="3lights"><strong>Buy 3 Primitive Survivor Flashlights, GET 2 FREE!</strong> ($29/EACH) <span id="txtblink" style="color:#F00; font-weight:bold;">BEST VALUE</span></label></td>
                  <td>$145.00</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="4" id="2lights"></td>
                  <td><label for="2lights"><strong>Buy 2 Primitive Survivor Flashlights, GET 1 FREE!</strong> ($39/EACH)</label></td>
                  <td>$117.00</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="3" id="1light"></td>
                  <td><label for="1light">1 Primitive Survivor Flashlight ($56.00)</label></td>
                  <td>$56.00</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="6" id="4lights"></td>
                  <td><label for="4lights">2 Primitive Survivor Flashlights ($48.50 Per Unit)</label></td>
                  <td>$97.00</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="7" id="5lights"></td>
                  <td><label for="5lights">4 Primitive Survivor Flashlights ($42.25 Per Unit)</label></td>
                  <td>$169.00</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="8" id="10lights"></td>
                  <td><label for="10lights">10 Primitive Survivor Flashlights ($35.00 Per Unit)</label></td>
                  <td>$350.00</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="9" id="15lights"></td>
                  <td><label for="15lights">15 Primitive Survivor Flashlights ($35.00 Per Unit)</label></td>
                  <td>$525</td>
                </tr>
                <tr>
                  <td><input type="radio" name="productId" value="10" id="20lights"></td>
                  <td><label for="20lights">20 Primitive Survivor Flashlights ($35.00 Per Unit)</label></td>
                  <td>$700</td>
                </tr>
              </tbody>
            </table>
            <?php
            if (isset($_SESSION['customerData']['productId'])) {
              ?>
              <script>$("input[value='<?php echo $_SESSION['customerData']['productId']; ?>'").prop("checked",true);</script>
              <?php
            }
            ?>
            <center><h4>Step #2: Contact Information</h4></center>
            <hr>
            <fieldset class="form-group">
              <label for="exampleInputEmail1">First Name</label>
              <input type="text" class="form-control" name="firstName" placeholder="First Name" value="<?php echo $customerData['firstName']; ?>">
            </fieldset>
            <fieldset class="form-group">
              <label for="exampleInputEmail1">Last Name</label>
              <input type="text" class="form-control" name="lastName" placeholder="Last Name" value="<?php echo $customerData['lastName']; ?>">
            </fieldset>
            <fieldset class="form-group">
              <label for="exampleInputEmail1">Phone Number</label>
              <input type="text" class="form-control" name="phone" placeholder="Phone Number" value="<?php echo $customerData['phone']; ?>">
            </fieldset>
            <fieldset class="form-group">
              <label for="exampleInputEmail1">Email</label>
              <input type="email" class="form-control" name="email" placeholder="E-Mail" value="<?php echo $customerData['email']; ?>">
              <small class="text-muted">We'll never share your email with anyone else.</small>
            </fieldset>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="panel-white">
          	<div class="flashbig"><img src="images/flashlight-big.jpg"></div>
            <center><h4>Primitive Survivor Flashlight</h4>
            <strong>Free Shipping Applied</strong></center>
            <hr>
            <center><h4>Step #3: Shipping Address</h4></center>
            <br><br>
            <fieldset class="form-group">
              <label>Street Address</label>
              <input type="text" class="form-control" name="address" placeholder="Your Address" value="<?php echo $customerData['address']; ?>">
            </fieldset>
            <fieldset class="form-group">
              <label>City</label>
              <input type="text" class="form-control" name="city" placeholder="Your City" value="<?php echo $customerData['city']; ?>">
            </fieldset>
            <fieldset class="form-group">
              <label for="exampleInputEmail1">State</label>
              <select name="state" id="state" class="form-control">
                <option value="">-- Select Your State ---</option>
                <option value="AL">Alabama</option>
              	<option value="AK">Alaska</option>
              	<option value="AZ">Arizona</option>
              	<option value="AR">Arkansas</option>
              	<option value="CA">California</option>
              	<option value="CO">Colorado</option>
              	<option value="CT">Connecticut</option>
              	<option value="DE">Delaware</option>
              	<option value="DC">District Of Columbia</option>
              	<option value="FL">Florida</option>
              	<option value="GA">Georgia</option>
              	<option value="HI">Hawaii</option>
              	<option value="ID">Idaho</option>
              	<option value="IL">Illinois</option>
              	<option value="IN">Indiana</option>
              	<option value="IA">Iowa</option>
              	<option value="KS">Kansas</option>
              	<option value="KY">Kentucky</option>
              	<option value="LA">Louisiana</option>
              	<option value="ME">Maine</option>
              	<option value="MD">Maryland</option>
              	<option value="MA">Massachusetts</option>
              	<option value="MI">Michigan</option>
              	<option value="MN">Minnesota</option>
              	<option value="MS">Mississippi</option>
              	<option value="MO">Missouri</option>
              	<option value="MT">Montana</option>
              	<option value="NE">Nebraska</option>
              	<option value="NV">Nevada</option>
              	<option value="NH">New Hampshire</option>
              	<option value="NJ">New Jersey</option>
              	<option value="NM">New Mexico</option>
              	<option value="NY">New York</option>
              	<option value="NC">North Carolina</option>
              	<option value="ND">North Dakota</option>
              	<option value="OH">Ohio</option>
              	<option value="OK">Oklahoma</option>
              	<option value="OR">Oregon</option>
              	<option value="PA">Pennsylvania</option>
              	<option value="RI">Rhode Island</option>
              	<option value="SC">South Carolina</option>
              	<option value="SD">South Dakota</option>
              	<option value="TN">Tennessee</option>
              	<option value="TX">Texas</option>
              	<option value="UT">Utah</option>
              	<option value="VT">Vermont</option>
              	<option value="VA">Virginia</option>
              	<option value="WA">Washington</option>
              	<option value="WV">West Virginia</option>
              	<option value="WI">Wisconsin</option>
              	<option value="WY">Wyoming</option>
              </select>
              <?php
              if (isset($customerData['state'])) {
                ?>
                <script>$("#state").val("<?php echo $customerData['state']; ?>");</script>
                <?php
              }
              ?>
            </fieldset>
            <fieldset class="form-group">
              <label for="exampleInputEmail1">Zipcode</label>
              <input type="text" class="form-control" name="zip" placeholder="Your Zipcode" value="<?php echo $customerData['zip']; ?>">
            </fieldset>
          </div>
          <br>
          <center><img src="images/credit-only.png"></center>
          <br>
          <div class="panel-white">
            <div class="row">
              <fieldset class="form-group col-lg-8">
                <label for="exampleInputEmail1">Card Number</label>
                <input type="text" class="form-control" name="cardNumber" placeholder="Your Card Number" value="<?php echo $customerData['cardNumber']; ?>">
              </fieldset>
              <fieldset class="form-group col-lg-4">
                <label for="exampleInputEmail1">Card CVV</label>
                <input type="text" class="form-control" name="cardCVV" placeholder="CVV (On Back)" value="<?php echo $customerData['cardCVV']; ?>">
              </fieldset>
            </div>
            <div class="row">
              <fieldset class="form-group col-lg-6">
                <label for="exampleInputEmail1">Expiration Month</label>
                <select name="expirationMonth" id="expirationMonth" class="form-control">
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
                <?php
                if (isset($customerData['expirationMonth'])) {
                  ?>
                  <script>$("#expirationMonth").val("<?php echo $customerData['expirationMonth']; ?>");</script>
                  <?php
                }
                ?>
              </fieldset>
              <fieldset class="form-group col-lg-6">
                <label for="exampleInputEmail1">Expiration Year</label>
                <select name="expirationYear" id="expirationYear" class="form-control">
                  <option value="2016">2016</option>
                  <option value="2017">2017</option>
                  <option value="2018">2018</option>
                  <option value="2019">2019</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>
                <?php
                if (isset($customerData['expirationYear'])) {
                  ?>
                  <script>$("#expirationYear").val("<?php echo $customerData['expirationYear']; ?>");</script>
                  <?php
                }
                ?>
              </fieldset>
            </div>
          </div>
          <br><br>
          <input type="submit" value="Ship My XT808 Now" class="btn btn-success btn-block big-button">
        </div>
        </form>
      </div>
    </div>
    <footer>
    	<div style="text-align:center; padding-top:40px; padding-bottom:40px;">Copyright &copy; Primitive Survivor 2016. All Rights Reserved.</div>
    </footer>
    <!-- jQuery first, then Bootstrap JS. -->
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="css/core.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
  </body>
</html>
