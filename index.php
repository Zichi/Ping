<?php
	require('./constants.php');
?>
<html>
	<head>
		<title>Zichi.se | Ping</title>
		
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-beta1/jquery.min.js"></script>
		<script src="resources/js/config.js"></script>
		<script src="resources/js/main.js"></script>
		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

		<link rel="stylesheet" type="text/css" href="resources/css/main.css">
		<link rel="stylesheet" type="text/css" href="resources/css/animate.css">
	</head>
	<body>
		<div id="wrapper">
			<div id="title" class="section statusBar">
				<p id="System">System Status</p>
			</div>	
			<div id="refresh" class="section offline statusBar">
				<p id="timer"></p>
			</div>	
			
			<div id="systemStatus">
			
			</div>
			<div id="footer" class="section white"><p>Created by <a target="_blank" href="http://www.zichi.se/">Zichi</a>.</p></div>
		</div>
	</body>
</html>