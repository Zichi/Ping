//Sets the time it takes to refresh the server status in seconds.
var refresh = 30;
//Choose if you'd like Icons displaying the status, otherwise it will display texts, eg. "Online". 
//Values: True or False.
var icons = true;
var texts = false;
//Choose if you want the minimal view, meaning: Show only the offline or delayed servers. 
//Values: True or False.
var minimal = false;
//Choose if you'd like to show the responsetime in MS.
//Values: True or False.
var showMS = true;
//Choose value for when the "Delayed"-message is supposed to show up. Eg. 150ms.
var delayLimit = 150;
//list the ips and ports that you want to check the status of.
var iplist = [{
		'ip' 		: "www.zichi.se",
		'port' 		: "80",
		'name'		: "Webserver",
		'section'	: "Zichi.se"
	},{
		'ip' 		: "www.twitter.com",
		'port' 		: "80",
		'name'		: "www.twitter.com",
		'section'	: "Websites"
	}	
];