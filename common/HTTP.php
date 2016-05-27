<?php

class HTTP {
  public static function simplePOST($url, $fields) {
      //url-ify the data for the POST
      $fields_string = "";
      foreach($fields as $key=>$value) { $fields_string .= $key.'='.urlencode($value).'&'; }
      rtrim($fields_string, '&');

      //open connection
      $ch = curl_init();

      //set the url, number of POST vars, POST data
      curl_setopt($ch,CURLOPT_URL, $url);
      curl_setopt($ch,CURLOPT_POST, count($fields));
      curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
      curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);

      //execute post
      $result = curl_exec($ch);

      //close connection
      curl_close($ch);

      return $result;
    }

    // Uses XmlBuilder: https://github.com/iwyg/xmlbuilder
    public function simpleXMLPOST($url, $xml, $root) {
      $ch = curl_init($url);
  		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  		curl_setopt($ch, CURLOPT_POST, 1);
  		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/xml'));
  		curl_setopt($ch, CURLOPT_POSTFIELDS, $xml);
  		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  		$output = curl_exec($ch);
  		curl_close($ch);

  		$returnArray = (array) simplexml_load_string($output);

      return $returnArray;
    }

    public function simpleJSONPost($url,$json,$headers=array()) {

      $headers[] = 'Content-Type: application/json';
      $headers[] = "Content-Length: " . strlen($json);

      $ch = curl_init($url);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
      curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
      $output = curl_exec($ch);
      curl_close($ch);

      echo $output;

      $returnArray = json_decode($output);

      return $returnArray;
    }

    public function countryCode2To3($country) {
    $codes = array(
      "US" => "USA",
      "CA" => "CAN"
    );

    if (isset($codes[$country])) {
      return $codes[$country];
    } else {
      return $country;
    }
  }
    
  /**** HELPERS ******/
  public static function xmlstr_to_array($xmlstr) {
    $doc = new DOMDocument();
    $doc->loadXML($xmlstr);
    $root = $doc->documentElement;
    $output = domnode_to_array($root);
    $output['@root'] = $root->tagName;
    return $output;
  }

  public static function domnode_to_array($node) {
    $output = array();
    switch ($node->nodeType) {
      case XML_CDATA_SECTION_NODE:
      case XML_TEXT_NODE:
        $output = trim($node->textContent);
      break;
      case XML_ELEMENT_NODE:
        for ($i=0, $m=$node->childNodes->length; $i<$m; $i++) {
          $child = $node->childNodes->item($i);
          $v = domnode_to_array($child);
          if(isset($child->tagName)) {
            $t = $child->tagName;
            if(!isset($output[$t])) {
              $output[$t] = array();
            }
            $output[$t][] = $v;
          }
          elseif($v || $v === '0') {
            $output = (string) $v;
          }
        }
        if($node->attributes->length && !is_array($output)) { //Has attributes but isn't an array
          $output = array('@content'=>$output); //Change output into an array.
        }
        if(is_array($output)) {
          if($node->attributes->length) {
            $a = array();
            foreach($node->attributes as $attrName => $attrNode) {
              $a[$attrName] = (string) $attrNode->value;
            }
            $output['@attributes'] = $a;
          }
          foreach ($output as $t => $v) {
            if(is_array($v) && count($v)==1 && $t!='@attributes') {
              $output[$t] = $v[0];
            }
          }
        }
      break;
    }
    return $output;
  }
}