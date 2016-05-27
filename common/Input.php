<?php

class Input {
  public static function checkRequiredFields($fields,$checkArray = false) {
    // make sure all fields in array $fields are not blank and exist.
    if (!$checkArray) {
      $checkArray = $_REQUEST;
    }
    foreach ($fields as $field) {
      if (!isset($checkArray[$field]) || trim($checkArray[$field]) == '') {
        return array("error"=>"$field is a required field.");
      }
    }

    return true;
  }
}