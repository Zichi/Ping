<?php
	//Fetches the serverlist from the database.
	require 'dbconnect.php';
	dbConnect();
	$result = $pdo->query("SELECT ip, port, name, section FROM servers")->fetchAll(PDO::FETCH_ASSOC);
	echo json_encode($result);
?>