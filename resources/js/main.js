//Stores all of the servers that are currently dead. - Need to add functionality
var deadServers = [];

//Sets the time it takes to refresh the server status in seconds.
var timer = refresh;

function updateServers(){	
	//initial ping.
	for(var i = 0; i < iplist.length; i++){
		ping(iplist[i]['ip'],iplist[i]['port'],iplist[i]['name'],iplist[i]['section']);
	}

	setInterval(function(){
		if(timer == 0){
			//ping servers here.
			for(var i = 0; i < iplist.length; i++){
				ping(iplist[i]['ip'],iplist[i]['port'],iplist[i]['name'],iplist[i]['section']);
			}
			
			//resets the timer.
			timer = refresh;
			timer = timer - 1;
		}else{
			$("#timer").html("Refreshing in <span class='green'>"+ timer +"</span> sec");
			document.title = "Ping - Refreshing in " + timer + " sec";
			timer = timer - 1;
		}
	},1000);
	
}

//function to ping servers
function ping(ip, port, name, section){
	
	$.ajax({
		type: 'POST',
		url: 'resources/functions/status.php',
		data: {
			ip: ip,
			port: port,
			name: name,
			section: section
		},
		
		success: addData
	});	
}

//the success method of the ping command
function addData(data){
	//parsing the JSON object returned in the ping.
	var result = JSON.parse(data);

	var color;
	var ms = "";
	
	//Changes stuff depending on server status.
	if(result['status'] == 'Online'){
		if(result['ms'] >= 100){
			color = 'orange';
			result['status'] = "Delayed";
		}else{
			color = "green";
		}
		ms = '<span class="sectionStatus">(' + result['ms'] + 'ms)';
	}
	else{ 
		color = "red";
	}
	
	//checks if there is a section for the results, if not, create one.
	if(!document.getElementById(result['section'])){
		$("#wrapper").append('<div id="' + result['section'] + '"><div class="section statusBar bar"><span class="sectionLabel">' + result['section'] + '</span><span class="sectionStatus"></span></div></div>')
	}
	
	//checks if the element already exists, if so, update it, else create it.
	if(document.getElementById(result['section'] + "_" + result['name'])){
		$("#" + result['section'] +"_"+ result['name'] + "").html('<span class="sectionLabel">' + result['name'] + '</span></span><span class="sectionStatus ' + color + '">' + result['status'] + '</span>' + ms);
	}else{
		//adds a new row in the wrapper with the status of the server
		$("#" + result['section'] + "").append('<div id="' + result['section'] + "_" + result['name'] + '" class="item statusBar bar"><span class="sectionLabel">' + result['name'] + '</span></span><span class="sectionStatus ' + color + '">' + result['status'] + '</span>' + ms + '</div>');
	}	
	
	//if the server is dead, push to the deadServers array.
	if(result['status'] == "Offline"){
		deadServers.push(result['name']);
	}
}