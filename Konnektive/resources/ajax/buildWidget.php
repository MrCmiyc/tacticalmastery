<?php

$cart = $ksdk->getSessValue('cart');
$currency = $ksdk->currencySymbol;
$products = $ksdk->getProducts();
$subTotal = 0;

$cnt = 0;
if(!empty($cart))
foreach($cart as $productId=>$qty)
{
	$cnt += $qty;
	$subTotal += $products[$productId]->price *= $qty;
}
$subTotal = $currency.number_format($subTotal,2);


?>

<div class='kcartWidgetImage'>
</div>
<div class='kcartWidgetText'>
    <?php echo $cnt ?> Items<br>
    <b><?php echo $subTotal; ?></b>
    <br>	
</div>
