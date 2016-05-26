<?php

class KonnekAdmin
{
	public $options = array();
	
	function __construct()
	{
		add_action( 'admin_menu', array( $this, 'AddMenu' ) );
		add_action( 'admin_init', array( $this, 'init' ) );
	}
	
	function addMenu()
	{
		add_menu_page(
					  "Konnektive E-Commerce", //page title
					  "Konnektive", //menu title
					  'manage_options', //capability
					  "Konnektive", //menu_slug
					  array($this,'display') //function to display page
					 );
	}
	
	function display()
	{
		$this->options = get_option("konnek_options");
		
		
		include('admin/index.php');	
	}
	
	
	public function init()
    {        
        register_setting(
            'konnek_admin_group', // Option group
            'konnek_options', // Option name
            array( $this, 'sanitize' ) // Sanitize
        );

        add_settings_section(
            'konnek_settings', // ID
            '', // Title
            '', // Callback
            'konnek_admin' // Page
        );  

         add_settings_field(
            'apiLoginId', // ID
            'API Login Id', // Title 
            array( $this, 'getInput_loginId' ), // Callback
            'konnek_admin', // Page
            'konnek_settings' // Section           
        );      

         add_settings_field(
            'apiPassword', 
            'API Password', 
            array( $this, 'getInput_password' ), 
            'konnek_admin', 
            'konnek_settings'
        );  
		
		     add_settings_field(
			'campaignId',
			'Campaign Id',
			array( $this, 'getInput_campaignId'),
			'konnek_admin',
			'konnek_settings'
		); // campaignId
		
		 add_settings_field(
			'mobileRedirectUrl',
			'Mobile Redirect Url',
			array( $this, 'getInput_mobileRedirectUrl'),
			'konnek_admin',
			'konnek_settings'
		); // mobile_redirect_url
		
		 add_settings_field(
			'pcRedirectUrl',
			'PC Redirect Url',
			array( $this, 'getInput_pcRedirectUrl'),
			'konnek_admin',
			'konnek_settings'
		); // pc_redirect_url
	
			
    }

    /**
     * Sanitize each setting field as needed
     *
     * @param array $input Contains all settings fields as array keys
     */
    public function sanitize( $input )
    {
        $new_input = array();
        if( isset( $input['apiLoginId'] ) )
            $new_input['apiLoginId'] = sanitize_text_field( $input['apiLoginId'] );

        if( isset( $input['apiPassword'] ) )
            $new_input['apiPassword'] = sanitize_text_field( $input['apiPassword'] );
	
		if( isset( $input['campaignId'] ) )
            $new_input['campaignId'] = sanitize_text_field( $input['campaignId'] );
		
		if( isset( $input['mobileRedirectUrl'] ) )
            $new_input['mobileRedirectUrl'] = sanitize_text_field( $input['mobileRedirectUrl'] );
		
		if( isset( $input['pcRedirecturl'] ) )
            $new_input['pcRedirecturl'] = sanitize_text_field( $input['pcRedirecturl'] );
		
		return $new_input;
    }

	public function getInput_loginId()
    {
		$val = isset($this->options['apiLoginId']) ? $this->options['apiLoginId'] : '';
		?>
        <input type='text' id='loginId' name='konnek_options[apiLoginId]' value='<?php echo $val?>'>
        <span id='loginId_error' class='formError'>*Please enter valid loginId</span>
        <?php
    }
	
	public function getInput_password()
    {
		$val = isset($this->options['apiPassword']) ? $this->options['apiPassword'] : '';
		?>
        <input type='password' id='password' name='konnek_options[apiPassword]' value='<?php echo $val?>'>
        <span id='password_error' class='formError'>*Please enter valid password</span>
        <?php
		
    }
	
	public function getInput_campaignId()
    {
       $val = isset($this->options['campaignId']) ? $this->options['campaignId'] : '';
		?>
        <input type='text' id='campaignId' name='konnek_options[campaignId]' value='<?php echo $val?>'>
        <span id='campaignId_error' class='formError'>*Please enter valid campaignId</span>
        <?php
    }
	
	public function getInput_mobileRedirectUrl()
    {
        $val = isset($this->options['mobileRedirectUrl']) ? $this->options['mobileRedirectUrl'] : '';
		?>
        <input type='text' id='mobileRedirectUrl' name='konnek_options[mobilRedirectUrl]' value='<?php echo $val?>'>
        <span id='mobileRedirectUrl_error' class='formError'>*Please enter valid Mobile Redirect URL</span>
        <?php
    }
	
	public function getInput_pcRedirectUrl()
    {
        $val = isset($this->options['pcRedirectUrl']) ? $this->options['pcRedirectUrl'] : '';
		?>
        <input type='text' id='pcRedirectUrl' name='konnek_options[pcRedirectUrl]' value='<?php echo $val?>'>
        <span id='pcRedirectUrl_error' class='formError'>*Please enter valid PC Redirect URL</span>
        <?php
    }
	
	
	public function updateCampaignData()
	{
		
		//curl
		$params = (object) array();
		$params->loginId = $this->options['apiLoginId'];
		$params->password = $this->options['apiPassword'];
		$params->campaignId = $this->options['campaignId'];
		$ch = curl_init();
		
		$apiurl ="https://api.konnektive.com/landingpages/query/2/";
		$apiurl .= "?".http_build_query($params);
		
		curl_setopt($ch, CURLOPT_URL,$apiurl);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$apiResponse = curl_exec ($ch);
		curl_close ($ch);
		
		$apiResponse = json_decode($apiResponse);
		if(empty($apiResponse) || $apiResponse->result == 'ERROR')
		{
			echo "<div style='color:red;font-weight:bold'>ERROR updating settings. Please check your apiLoginId and apiPassword.</div>";
			throw new Exception;
		}
		
		$config = KFormConfig::$instance;
		
		//delete_option('konnek_campaign_data');
		
		if(!empty($config))
			$curPages = (array) $config->webPages;
		else
			$curPages = array();
		
		$config = $apiResponse->message;
		
	
		
		
		$webPages = $config->webPages;
		
		//	echo "GOT THIS FROM SERVER:";
	//	echo "<pre>";print_r(compact('curPages','webPages'));echo "</pre>";die();
		
		
		$pages = array();
		
		foreach((array) $config->webPages as $pageType=>$page)
		{
			if(!empty($curPages[$pageType]))
			{
				$pages[$pageType] = (object) array_merge((array) $curPages[$pageType],(array) $page);
			}
			else
			{
				$pages[$pageType] = $page;
			}
		}
		
		if(empty($pages['productDetails']) && $config->landerType == 'CART')
		{
			$pages['productDetails'] = (object) array();	
		}

		foreach($pages as $pageType=>$page)
		{
			if(!empty($page->pageId))
				$wpPage = get_page($page->pageId);
			else
				$wpPage = false;
	
			if(empty($wpPage))
			{	
				$page->pageId = $this->addPage($pageType);
			}
			
			$page->url = get_permalink($page->pageId);
		}
		
		$config->webPages = (object) $pages;
		
		update_option('konnek_campaign_data',json_encode($config));
	}
	
	
	public function addPage($pageType)
	{
		$pages = Konnektive::getPlugin()->pages;
		
		$page = $pages[$pageType];
		$title = $page['title'];
		$shortcode = $page['shortcode'];
			
		// Create post object
		$_p = array();
		$_p['post_title'] = $title;
		$_p['post_content'] = '['.$shortcode.']';
		$_p['post_status'] = 'publish';
		$_p['post_type'] = 'page';
		$_p['comment_status'] = 'closed';
		$_p['ping_status'] = 'closed';
		
		$_p['post_category'] = array(1); // the default 'Uncatrgorised'

		// Insert the post into the database
		return wp_insert_post($_p);
	
	}
	
}