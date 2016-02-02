<?php
	//imports the ping function.
	require_once 'ping.php';	
	
	$ip = $_POST["ip"];
	$port = $_POST["port"];
	$name = $_POST["name"];
	$section = $_POST["section"];
	//sends the ping request through the ping(host, port, ttl) function.
	$ping = ping($ip, $port, 2);
	//checks if the ping was successfull or failed.
	if($ping != false){
		$response = array(
			'name' => $name,
			'section' => $section,
			'ip' => $ip,
			'status' => 'Online',
			'ms' => $ping
		);
	}else{
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