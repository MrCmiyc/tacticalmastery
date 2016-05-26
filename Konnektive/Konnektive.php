<?php
/*
Plugin Name: Konnektive E-Commerce
Plugin URI: http://wptest.konnektive.com/wordpress/wp-content/plugins/Konnektive
Description: Konnektive Plugin for E-Commerce
Author: Konnektive Corporation
Version: 1.0
*/

defined( 'ABSPATH' ) or die( 'Plugin file cannot be accessed directly.' );

class Konnektive
{
	public $adminPage;
	static $instance;
	public $campaignData;
	
	public $pages = array(
								 'catalogPage'=>array(
													  'shortcode'=>'konnektive_cart_catalog',
													  'func'=>'sc_catalog',
													  'pageType'=>'catalogPage',
													  'title'=>'E-Commerce Catalog',
													  'pageId'=>NULL
													  ),
								 'productDetails'=>array('shortcode'=>'konnektive_cart_product_details',
														  'func'=>'sc_product_details',
														  'pageType'=>'catalogPage',
														  'title'=>'Product Details',
														  'pageId'=>NULL
														  ),
								  'leadPage'=>array('shortcode'=>'konnektive_cart_lead',
													   'func'=>'sc_lead',
													   'pageType'=>'leadPage',
													   'title'=>'Lander',
													   'pageId'=>NULL
													   ),
								 'checkoutPage'=>array('shortcode'=>'konnektive_cart_checkout',
													   'func'=>'sc_checkout',
													   'pageType'=>'checkoutPage',
													   'title'=>'Checkout',
													   'pageId'=>NULL
													   ),
								 'upsellPage1'=>array('shortcode'=>'konnektive_cart_upsell1',
													  'func'=>'sc_upsell1',
													  'pageType'=>'upsellPage1',
													  'title'=>'Upsell Page 1',
													  'pageId'=>NULL
													  ),
								 'upsellPage2'=>array('shortcode'=>'konnektive_cart_upsell2',
													  'func'=>'sc_upsell2',
													  'pageType'=>'upsellPage2',
													  'title'=>'Upsell Page 2',
													  'pageId'=>NULL
													  ),
								 'upsellPage3'=>array('shortcode'=>'konnektive_cart_upsell3',
													  'func'=>'sc_upsell3',
													  'pageType'=>'upsellPage3',
													  'title'=>'Upsell Page 3',
													  'pageId'=>NULL
													  ),
								 'upsellPage4'=>array('shortcode'=>'konnektive_cart_upsell4',
													  'func'=>'sc_upsell4',
													  'pageType'=>'upsellPage4',
													  'title'=>'Upsell Page 4',
													  'pageId'=>NULL
													  ),
								 'thankyouPage'=>array('shortcode'=>'konnektive_cart_thankyou',
													   'func'=>'sc_thankyou',
													   'pageType'=>'thankyouPage',
													   'title'=>'Thank You',
													   'pageId'=>NULL),
								 'widget'=>array('shortcode'=>'konnektive_cart_widget',
												 'func'=>'sc_cartWidget',
												 'pageType'=>NULL),
								 'signupPage'=>array('shortcode'=>'konnektive_cart_signup',
								 					 'func'=>'sc_signup',
													 'pageType'=>'signupPage',
													 'title'=>'Signup Page'
													 ),
								 'profilePage'=>array('shortcode'=>'konnektive_cart_profile',
								 					  'func'=>'sc_profile',
													  'pageType'=>'profilePage',
													  'title'=>'Member Profile'
													  ),
								 'categoryLinks'=>array('shortcode'=>'konnektive_category_links',
								 						'func'=>'sc_categoryLinks',
														'pageType'=>NULL
														)
								 );
	
	static function getPlugin()
	{
		return self::$instance;	
	}
	
	public function __construct()
    {
		
		if( is_admin() )
		{
			ini_set('display_errors','1');
			$this->requireFile("KonnekAdmin.php");
			$this->requireFile("resources/config.php");
   			$this->adminPage = new KonnekAdmin;
			$this->adminPage->konnektive = $this;
		}
		else
		{
			$this->pageHooks();
		}
	   
	   $config = new KFormConfig;
	   
	   self::$instance = $this;
    }
	
	function buildKonnektiveSDK()
	{

		$config = KFormConfig::$instance;

		if(empty($config) || empty($config->webPages))
			return;
		
		if(defined('KONNEKTIVE_ASYNC'))
		{
			$pageType = 'ASYNC';
		}
		else
		{
			$pageId = get_the_ID();
			foreach($config->webPages as $pageType=>$page)
			{
				if($page->pageId == $pageId)
					break;
			}
		}
		
		if(empty($pageType) || $pageType == 'productDetails')
			$pageType = 'catalogPage';
		
		$deviceType = "All"; //choose from: PC, Mobile, All
		$ksdk = new KonnektiveSDK($pageType,$deviceType);
		
	}
	
	function requireFile($filename)
	{
		require realpath(dirname(__FILE__))."/".$filename;
	}
	
	function startSess()
	{
		if(!session_id())
			session_start();	
	}
	
	function pageHooks()
	{
		$this->requireFile("resources/konnektiveSDK.php");
		add_action('wp_head',array($this,'buildKonnektiveSDK'));
		foreach($this->pages as $props)
		{
			add_shortcode($props['shortcode'],array($this,$props['func']));	
		}
		
		add_action('send_headers',array($this,'startSess'));
	}


	public function sc_profile()
	{
		$this->requireFile("pages/profilePage.php");
	}

	public function sc_presell()
	{
		$this->requireFile("pages/presell.php");
	}
	public function sc_lead()
	{
		$this->requireFile("pages/leadPage.php");
	}
	public function sc_checkout()
	{
		$this->requireFile("pages/checkout.php");
	}
	public function sc_upsell1()
	{
		$this->requireFile("pages/upsell1.php");
	}
	public function sc_upsell2()
	{
		$this->requireFile("pages/upsell2.php");
	}
	public function sc_upsell3()
	{
		$this->requireFile("pages/upsell3.php");
	}
	public function sc_upsell4()
	{
		$this->requireFile("pages/upsell4.php");
	}
	public function sc_thankyou()
	{
		$this->requireFile("pages/thankyou.php");
	}
	public function sc_product_details()
	{
		$this->requireFile("pages/product-details.php");
	}
	public function sc_catalog()
	{
		$this->requireFile("pages/catalog.php");
	}
	
	public function sc_cartWidget()
	{
		$ksdk = KonnektiveSDK::$instance;
		echo $ksdk->getWidget();
	}
	
	static function install()
	{

	}
	
	
	static function uninstall()
	{
		$camp = json_decode(get_option('konnek_campaign_data'));
		
		if(!empty($camp))
		foreach((array) $camp->webPages as $page)
		{
			wp_delete_post($page->pageId);
		}
		
		
		delete_option('konnek_campaign_data');
		delete_option('konnek_options');
	}
	
	
	
}



new Konnektive;




function konnektive_plugin_remove()
{
	Konnektive::uninstall();
}

register_deactivation_hook( __FILE__,'konnektive_plugin_remove');


