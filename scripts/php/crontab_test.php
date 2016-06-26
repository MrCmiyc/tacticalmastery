<?php
function logToFile($filename, $msg)
{
    $fd = fopen($filename, "a");
    $str = "[" . date("Y/m/d h:i:s", time()) . "] " . $msg;
    fwrite($fd, $str . "\n");
    fclose($fd);
}

logToFile("log.txt", 'Apple of eye');