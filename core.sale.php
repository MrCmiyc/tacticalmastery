<?php
ini_set('display_errors', '1');
include_once "../common/HTTP.php";
include_once "../common/Input.php";
$customerData = $_REQUEST;
$checkInputs = Input::checkRequiredFields(array("address","city","state","zip","email","phone","cardNumber","expirationMonth","expirationYear","cardCVV","productId"));
if ($checkInputs !== true) {
    $_SESSION['error'] = $checkInputs['error'];
} else {
    // handle the core sale, send the core sale data via POST to CRM
    $data = array(
        "loginId" => "Flashlight",
        "password" => "flash123",
        "firstName" => $_REQUEST['firstName'],
        "lastName" => $_REQUEST['lastName'],
        "address1" => $_REQUEST['address'],
        "address2" => "",
        "postalCode" => $_REQUEST['zip'],
        "city" => $_REQUEST['city'],
        "state" => $_REQUEST['state'],
        "country" => "US",
        "emailAddress" => $_REQUEST['email'],
        "phoneNumber" => $_REQUEST['phone'],
        "billShipSame" => "1",
        /*"shipFirstName" => $invoice->card->first_name,
        "shipLastName" => $invoice->card->last_name,
        "shipAddress1" => $invoice->contact->address->address_1,
        "shipAddress2" => $invoice->contact->address->address_2,
        "shipPostalCode" => $invoice->contact->address->zip,
        "shipCity" => $invoice->contact->address->city,
        "shipState" => $invoice->contact->address->state,
        "shipCountry" => $invoice->contact->address->country,*/
        "paySource" => "CREDITCARD",
        "cardNumber" => $_REQUEST['cardNumber'],
        "cardMonth" => $_REQUEST['expirationMonth'],
        "cardYear" => $_REQUEST['expirationYear'],
        "cardSecurityCode" => $_REQUEST['cardCVV'],
        "campaignId" => "3",
        "product1_id" => $_REQUEST['productId']
    );
    
    $result = HTTP::simplePOST("https://api.konnektive.com/order/import/",$data);
    
    $result = json_decode($result);
    
    if ($result->result == "SUCCESS") {
        // it worked
        echo "SALE WORKED!";
        //header("Location: upsell1.php");
    } else {
        $error = '';
        if (!is_string($result->message)) {
            foreach (get_object_vars($result->message) as $field => $errorMessage) {
                $error .= "[$field] $errorMessage - ";
            }
        } else {
            $error = $result->message;
        }
        $_SESSION['error'] = $error;
        //header("Location: core.php");;
    }
}
