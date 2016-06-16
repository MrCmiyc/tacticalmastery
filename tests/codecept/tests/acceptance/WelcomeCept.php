<?php

$I = new AcceptanceTester($scenario);
$I->wantTo('ensure that frontpage works');
$I->amOnPage('/');
$I->see('XT808 LED Flashlight');

$I->click('body > div.container > div > div > button');
$I->waitForElementVisible('#js-text-first-name', 2);
$I->fillField('#js-text-first-name', 'Tester');
$I->fillField('#js-text-last-name', 'Testin');
$I->fillField('#js-text-phone-number', '123123123');

// Go to the secure page
$I->amGoingTo('ensure that the redirect to the secure page works');
$I->click('#js-btn-confirm');
$I->seeInCurrentUrl('/checkout.html');
$I->see('TACTICAL PRIMITIVE SURVIVOR FLASHLIGHT - 800 LUMENS');
