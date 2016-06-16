<?php

$I = new AcceptanceTester($scenario);
$I->wantTo('ensure that secure page works');
$I->amOnUrl('https://staging.tacticalmastery.com');
$I->amOnPage('/checkout.html?firstName=Tester&lastName=Testin&fullName=&phoneNumber=123123123');
$I->see('TACTICAL PRIMITIVE SURVIVOR FLASHLIGHT - 800');
$I->fillField('#f_email', '123@123.com');
$I->fillField('#f_address1', 'Test str.');
$I->fillField('#f_city', 'Los Angeles');
$I->selectOption('#f_state', 'CA');
$I->fillField('#f_zip', '90001');
$I->fillField('//*[@id="frm_order"]/div[3]/div/label[1]/input[2]', '0000000000000000');
$I->selectOption('#frm_order > div.col-lg-6.col-sm-12 > div > fieldset > select.ccjs-month', '05');
$I->selectOption('#frm_order > div.col-lg-6.col-sm-12 > div > fieldset > select.ccjs-year', '18');
$I->fillField('#frm_order > div.col-lg-6.col-sm-12 > div > label.ccjs-csc > input', '100');

// Go to the upsell page
$I->amGoingTo('Go to the upsell page');
$I->click('#checkoutSubmit');
$I->waitForText('TACTICAL TL900 HEADLAMP',5);
$I->seeInCurrentUrl('/us_hlmp.html');


// Go to the recharge page
$I->amGoingTo('Go to the recharge page');
$I->click('#upsellNo');
$I->seeInCurrentUrl('/us_recharge.html');
$I->see('RECHARGEABLE LITHIUM');

// Go the the final order page
$I->amGoingTo('Go the the thank you page');
$I->click('#upsellNo');
$I->seeInCurrentUrl('/thankyou.html');
$I->seeInTitle('Thankyou');
$I->see('Your Order is Confirmed');
$I->dontSeeInCurrentUrl('?orderId=null');
