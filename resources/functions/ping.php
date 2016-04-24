<?php
	// executes the socket connection towards the servers.

	//turns of the error reporting, as there WILL be an error whenever the socket is not able to connect.
	error_reporting(0);
	ini_set('display_errors', 0);

	function ping($host, $port, $timeout){ 
		$tB = microtime(true); 
		
		$fP = fSockOpen($host, $port, $errno, $errstr, $timeout); 	
		
		$tA = microtime(true);
		
		if (!$fP) { 
			return false; 
		}else{
			return round((($tA - $tB) * 1000), 0); 
		}
	}
?>