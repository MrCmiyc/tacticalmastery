<?php

$I = new AcceptanceTester($scenario);
$I->wantTo('ensure that frontpage works');
$I->amOnPage('/');
$I->see('XT808 LED Flashlight');

$I->click('body > div.container > div > div > button');
$I->waitForElementVisible('#name', 2);
$I->fillField('#name', 'Tester');
$I->fillField('#phone', '123123123');

// Go to the secure page
$I->amGoingTo('ensure that the redirect to the secure page works');
$I->click('#submitButton');
$I->seeInCurrentUrl('/checkout.html');
$I->see('TACTICAL PRIMITIVE SURVIVOR FLASHLIGHT - 800 LUMENS');
