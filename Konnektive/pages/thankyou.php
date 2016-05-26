<?php
$ksdk = KonnektiveSDK::getInstance();
$ksdk->echoJavascript();	

?>

<style type="text/css">
.entry-content { max-width:none !important} 
</style>

<?php
//pull the order information out of session
$orderId = $ksdk->getOrderId();
$customerName = $ksdk->getCustomerName();
$billingAddress = $ksdk->getBillingAddress();
$shippingAddress = $ksdk->getShippingAddress();
$phoneNumber = $ksdk->getPhoneNumber();
$emailAddress = $ksdk->getEmailAddress();
$itemsTable = $ksdk->getItemsTable();
$subTotal = $ksdk->getSubTotal();
$shipTotal = $ksdk->getShipTotal();
$taxTotal = $ksdk->getTaxTotal();
$insuranceTotal = $ksdk->getInsureTotal();
$discountTotal = $ksdk->getDiscountTotal();
$orderTotal = $ksdk->getOrderTotal();
$currency = $ksdk->currencySymbol;
?>

	<div class="kthanks" style="width:500px">
	
	<!-- remove this link if you do not want customers to be able to place a second order -->
	<a href="#" id="kthanks_reorderLink">Place a new order</a>
  
    <h3>
    	Thank you <?php echo $customerName?>!<br>
        ORDER#: <?php echo $orderId ?>
    </h3>


    <div class="kthanks_box" style="width:480px; float:left">
        <div class="kthanks_boxTitle">
            Items Ordered
        </div>
        <div class="kthanks_boxContent">
           
           <?php echo $itemsTable ?>
           
            <hr />
            <div style="float:right">
                <div class="kthanks_spacer">
                    <div class="kthanks_label">
                        SubTotal:
                    </div>
                    <?php echo $currency.$subTotal ?>
                </div>
                <div class="kthanks_spacer">
                    <div class="kthanks_label">
                        S &amp; H:
                    </div>
                    <?php echo $currency.$shipTotal ?>
                </div>
                <?php if($taxTotal > 0 ) { ?>
                <div class="kthanks_spacer">
                    <div class="kthanks_label" >
                        Tax:
                    </div>
                   <?php echo $currency.$taxTotal ?>
                </div>
                <?php } ?>
                <?php if($insuranceTotal > 0 ) { ?>
                <div class="kthanks_spacer">
                    <div class="kthanks_label" >
                        Insurance:
                    </div>
                   <?php echo $currency.$insuranceTotal ?>
                </div>
                <?php } ?>
                <?php if($discountTotal > 0) { ?>
                <div class="kthanks_spacer" style="color:green">
                    <div class="kthanks_label" >
                        Discount:
                    </div>
                   <?php echo $currency.$discountTotal ?>
                </div>
                <?php } ?>
                <div class="kthanks_spacer" style="border-top:1px solid #CCC">
                    <div class="kthanks_label">
                        Grand Total:
                    </div>
                    <?php echo $currency.$orderTotal ?>
                </div>
            </div>
            <div style="clear:both"></div>
        </div>
    </div>
    
    
    <div style="width:300px">
        
        <div class="kthanks_box">
            <div class="kthanks_boxTitle">
            Billing Information
            </div>
            <div class="kthanks_boxContent">
                <?php echo $billingAddress ?><br />
                <?php echo $emailAddress ?><br />
                <?php echo $phoneNumber ?><br />
            </div>
        </div>
    
        <div class="kthanks_box">
            <div class="kthanks_boxTitle">
                Shipping Information
            </div>
            
            <div class="kthanks_boxContent">
                <?php echo $shippingAddress ?>
            </div>
			
        </div>
    </div>
	<div style="clear:both"></div>
	
	<p>*A confirmation email has been sent to <?php echo $emailAddress ?> </p>
	
</div>

