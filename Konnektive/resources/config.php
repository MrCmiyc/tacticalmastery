<?php

KformConfig::setConfig(array(
	"isWordpress"=>true));

class KFormConfig
{
	
	public $isWordpress = false;
	public $apiLoginId = '';
	public $apiPassword = '';
	public $resourceDir;
	public $baseDir;
	
	public $mobileRedirectUrl;
	public $desktopRedirectUrl;
	
	public $continents;
	public $countries;
	public $coupons;
	public $currencySymbol;
	public $insureShipPrice;
	public $landerType;
	public $offers;
	public $upsells;
	public $products;
	public $shipProfiles;
	public $states;
	public $taxes;
	public $webPages;
	
	static $instance = NULL;
	static $options;
	static $campaignData;
	// class constructor to set the variable values	
	
	static function setConfig($options)
	{
		self::$options = $options;	
	}
	
	public function __construct()
	{
		if(!empty(self::$instance))
			throw new Exception("cannot recreated KFormConfig");
		
		foreach((array) self::$options as $k=>$v)
			$this->$k = $v;
			
		if($this->isWordpress)
		{
			if(is_callable('plugins_url'))
			{
				$dir =  plugins_url('async.php', __FILE__ );
				$dir = substr($dir,0,strrpos($dir,'/'));
				$this->resourceDir = $dir."/";
			}

			$options = get_option('konnek_options');
			foreach((array)$options as $k=>$v)
				$this->$k = $v;
		
			if(empty($data))
				$data = json_decode(get_option('konnek_campaign_data'));
				
			if(!empty($data))
			{
				foreach($data as $k=>$v)
					$this->$k = $v;
			}
		}
		elseif(!empty(self::$campaignData))
		{
			$data = (array) json_decode(self::$campaignData);
			foreach($data as $k=>$v)
				$this->$k = $v;	
		}

		self::$instance = $this;
		
	
	}
}

