<?php

require '../../constants.php';

//Database Connection function
function dbConnect(){
	global $pdo;
	
	try {
		$pdo = new PDO(
			'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8',
			DB_USER,
			DB_PASS
		);
	} catch (PDOException $e) {
		echo "Failed to get DB handle: " . $e->getMessage() . "</br>";
		exit;
	}
}
?>