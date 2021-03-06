<?php
	//imports the ping function.
	require_once 'ping.php';
	
	//turns of the error reporting, as there WILL be an error whenever the socket is not able to connect.
	error_reporting(0);
	ini_set('display_errors', 0);
	
	
	
	$ip = $_POST["ip"];
	$port = $_POST["port"];
	$name = $_POST["name"];
	$section = $_POST["section"];
	$timeout = $_POST["timeout"];
	
	if(!$timeout){
		$timeout = 2;
	}
	
	//sends the ping request through the ping(host, port, ttl) function.
	$ping = ping($ip, $port, $timeout);
	
	//checks if the ping was successfull or failed.
	if($ping != false){
		$response = array(
			'name' => $name,
			'section' => $section,
			'ip' => $ip,
			'status' => 'Online',
			'ms' => $ping
		);
	}
	else{
		$response = array(
			'name' => $name,
			'section' => $section,
			'ip' => $ip,
			'status' => 'Offline'
		);
	}
	
	//encodes the values in to a json object.
	$jobj = json_encode($response);
	
	//echoes the object.
	echo $jobj;
?>