//Sets the time it takes to refresh the server status in seconds.
var refresh = 30;

//Choose if you'd like Icons displaying the status, otherwise it will display texts, eg. "Online". 
//Values: True or False.
var icons = true;
var texts = true;

//Choose if you want the minimal view, meaning: Show only the offline or delayed servers. 
//Values: True or False.
var minimal = false;

//Choose if you'd like to show the responsetime in MS.
//Values: True or False.
var showMS = true;

//list the ips and ports that you want to check the status of.
var iplist = [{
		'ip' 		: "www.google.com",
		'port' 		: "80",
		'name'		: "Google.com",
		'section'	: "Google"
	},{
		'ip' 		: "www.google.se",
		'port' 		: "80",
		'name'		: "Google.se",
		'section'	: "Google"
	}	
];