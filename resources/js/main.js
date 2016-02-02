//Sets the time it takes to refresh the server status in seconds.
var timer = refresh;

//stores all info about the servers/network items.
var StatusStorage = [];

window.onload = function () {
    //starts the function loop.
    updateServers();
}

function updateServers() {
    //initial ping.
    for (var i = 0; i < iplist.length; i++) {
        ping(iplist[i]['ip'], iplist[i]['port'], iplist[i]['name'], iplist[i]['section']);
    }
	
    setInterval(function () {
        if (timer == 0) {
            $("#timer").html("<i class='fa fa-spinner fa-pulse'></i>");
            //Clears the StatusStorage array.
            StatusStorage = [];
         
			//ping servers here.
            for (var i = 0; i < iplist.length; i++) {
                ping(iplist[i]['ip'], iplist[i]['port'], iplist[i]['name'], iplist[i]['section']);
            }
			
            //resets the timer.
            timer = refresh;
			
        } else {
            //Update the timers
            $("#timer").html("Refreshing in <span class='purple'>" + timer + "</span> sec");
            timer = timer - 1;
        }
    }, 1000);
}

//function to ping servers
function ping(ip, port, name, section) {
    $.ajax({
        type: 'POST'
        , url: 'resources/functions/status.php'
        , data: {
            ip: ip
            , port: port
            , name: name
            , section: section
        }
        , success: updateData
    });
}

//the success method of the ping command
function updateData(data) {
    //parsing the JSON object returned in the ping.
    var result = JSON.parse(data);
	
    var color;
	
    //Changes colors of the status texts depending on the status of the items.
    if (result['status'] == 'Online') {
        if (result['ms'] >= delayLimit) {
            color = 'orange';
            result['status'] = "Delayed";
        } else {
            color = "green";
        }
    } else {
        color = "red";
    }
	
    //Setting: Show Icons only, Icon and texts or just Texts.
    if (icons == true && texts == false) {
        var warning = "<i style='margin-top:5px' class='fa fa-exclamation-triangle'></i>";
        var error = "<i style='margin-top:5px' class='fa fa-times-circle'></i>";
        var online = "<i style='margin-top:5px' class='fa fa-circle'></i>";
    } else if (icons == true && texts == true) {
        var warning = "Warning <i class='fa fa-exclamation-triangle'></i>";
        var error = "Error <i class='fa fa-times-circle'></i>";
        var online = "Online <i class='fa fa-circle'></i>";
    } else {
        var warning = "Warning";
        var error = "Error";
        var online = "Online";
    } 
	
    //Setting: Show or Hide MS.
    if (showMS == true) {
        if (result['status'] != 'Offline') {
            var responsetime = "<span class='sectionStatus white'>(" + result['ms'] + "ms)</span>"
        } else {
            var responsetime = "";
        }
    } else {
        var responsetime = "";
    }
	
    var fixedSection = result['section'].replace(" ", "_").replace(".", "_");
    fixedSection = fixedSection.replace(".", "_").replace(".", "_");
    var fixedName = result['name'].replace(" ", "_").replace(".", "_");
    fixedName = fixedName.replace(".", "_").replace(".", "_");
	
    //Creates the name variable. As "Section_Name", for example: Servers_Server1.
    var name1 = result['section'] + "_" + fixedName;
    if (minimal == true) {
        //Adds the server to the storage, which is used to add or remove rows on the updates.
        StatusStorage.push({
            'id': name1
            , 'section': result['section']
            , 'name': result['name']
            , 'status': result['status']
        });
		
        //checks if all servers have been added to the StatusStorage array. 
        if (StatusStorage.length == iplist.length) {
            //Loops through all the items in the StatusStorage array.
            for (var i = 0; i < StatusStorage.length; i++) {
                //Checks if the current item exists in the html document.
                if (document.getElementById(StatusStorage[i]['id'])) {
                    //checks what the current status is on the item.
                    if (StatusStorage[i]['status'] == "Offline") {
                        //Sets the section status to error and sets the color to red.
                        $("#" + StatusStorage[i]['section'] + "_status").html(error);
                        $("#" + StatusStorage[i]['section'] + "_status").removeClass('green');
                        $("#" + StatusStorage[i]['section'] + "_status").removeClass('orange');
                        $("#" + StatusStorage[i]['section'] + "_status").addClass('red');
                      
						//Checks if the item is in the system list, if it isn't add it, else change the information of it.
                        if (document.getElementById(StatusStorage[i]['id'])) {
                            $("#" + StatusStorage[i]['section'] + "_" + StatusStorage[i]['name'] + "").html('<span class="sectionLabel">' + StatusStorage[i]['name'] + '</span></span><span class="sectionStatus red">' + StatusStorage[i]['status'] + '</span>');
                        } else {
                            //adds a new row in the systemStatus with the status of the item
                            $("#" + StatusStorage[i]['section'] + "").append('<div id="' + StatusStorage[i]['id'] + '" class="item statusBar bar" style="display:none"><span class="sectionLabel">' + StatusStorage[i]['name'] + '</span></span><span class="sectionStatus red">' + StatusStorage[i]['status'] + '</span></div>');
                            $("#" + StatusStorage[i]['id'] + "").show("slow");
                        }
                    } else if (StatusStorage[i]['status'] == "Delayed") {
                        //Sets the section status to delayed and sets the color to orange.
                        $("#" + StatusStorage[i]['section'] + "_status").html(warning);
                        $("#" + StatusStorage[i]['section'] + "_status").removeClass('green');
                        $("#" + StatusStorage[i]['section'] + "_status").removeClass('red');
                        $("#" + StatusStorage[i]['section'] + "_status").addClass('orange');
                       
					   //Checks if the item is in the system list, if it isn't add it, else change the information of it.
                        if (document.getElementById(StatusStorage[i]['id'])) {
                            $("#" + StatusStorage[i]['id']).html('<span class="sectionLabel">' + StatusStorage[i]['name'] + '</span><span class="sectionStatus orange">' + StatusStorage[i]['status'] + '</span>' + responsetime);
                        } else {
                            //adds a new row in the systemStatus with the status of the server
                            $("#" + StatusStorage[i]['section'] + "").append('<div id="' + StatusStorage[i]['id'] + '" class="item statusBar bar" style="display:none"><span class="sectionLabel">' + StatusStorage[i]['name'] + '</span><span class="sectionStatus orange">' + StatusStorage[i]['status'] + '</span></div>' + responsetime);
                            $("#" + StatusStorage[i]['id'] + "").show("slow");
                        }
                    } else {
                        //Sets the section status to online and sets the color to green.
                        $("#" + StatusStorage[i]['section'] + "_status").html(online);
                        $("#" + StatusStorage[i]['section'] + "_status").removeClass('orange');
                        $("#" + StatusStorage[i]['section'] + "_status").removeClass('red');
                        $("#" + StatusStorage[i]['section'] + "_status").addClass('green');
                       
						//Checks if the item is in the system list, if so, remove it.
                        if (document.getElementById(StatusStorage[i]['id'])) {
                            $("#" + StatusStorage[i]['id']).hide('slow', function () {
                                $("#" + StatusStorage[i]['id'] + "").remove();
                            });
                        }
                    }
                }
            }
        }
		
        if (result['status'] == "Online") {
            var sectionStatus = online;
        } else if (result['status'] == "Offline") {
            var sectionStatus = error;
        } else {
            var sectionStatus = warning;
        }
		
        //checks if there is a section for the results, if not, create one.
        if (!document.getElementById(fixedSection)) {
            $("#systemStatus").append('<div id="' + fixedSection + '"><div class="section statusBar bar"><span class="sectionLabel">' + result['section'] + '</span><span id="' + fixedSection + "_status" + '" class="sectionStatus ' + color + '">' + sectionStatus + '</span></div></div>')
        } else {
            $("#" + fixedSection + "_status").removeClass('red');
            $("#" + fixedSection + "_status").removeClass('orange');
            $("#" + fixedSection + "_status").removeClass('green');
            $("#" + fixedSection + "_status").addClass(color);
            $("#" + fixedSection + "_status").html(sectionStatus);
        }
		
        if (result['status'] != "Online") {
            //checks if the item row already exists, if it does, change the info, if it doesnt, add it.
            if (document.getElementById(result['section'] + "_" + fixedName)) {
                $("#" + fixedSection + "_" + fixedName).html('<span class="sectionLabel">' + result['name'] + '</span><span class="sectionStatus ' + color + '">' + result['status'] + '</span>' + responsetime);
            } else {
                //adds a new row in the systemStatus with the status of the server
                $("#" + fixedSection + "").append('<div id="' + fixedSection + "_" + fixedName + '"  style="display:none" class="item statusBar bar"><span class="sectionLabel">' + result['name'] + '</span><span class="sectionStatus ' + color + '">' + result['status'] + '</span>' + responsetime + '</div>');
                $("#" + fixedSection + "_" + fixedName).show("slow");
            }
        }
		
    } else {
        if (result['status'] == "Online") {
            var sectionStatus = online;
        } else if (result['status'] == "Offline") {
            var sectionStatus = error;
        } else {
            var sectionStatus = warning;
        }
		
        //checks if there is a section for the results, if not, create one.
        if (!document.getElementById(fixedSection)) {
            $("#systemStatus").append('<div id="' + fixedSection + '"><div class="section statusBar bar"><span class="sectionLabel">' + result['section'] + '</span><span id="' + fixedSection + "_status" + '" class="sectionStatus ' + color + '">' + sectionStatus + '</span></div></div>')
        } else {
            $("#" + fixedSection + "_status").removeClass('red');
            $("#" + fixedSection + "_status").removeClass('orange');
            $("#" + fixedSection + "_status").removeClass('green');
            $("#" + fixedSection + "_status").addClass(color);
            $("#" + fixedSection + "_status").html(sectionStatus);
        }
		
        //checks if the item row already exists, if it does, change the info, if it doesnt, add it.
        if (document.getElementById(result['section'] + "_" + fixedName)) {
            $("#" + fixedSection + "_" + fixedName).html('<span class="sectionLabel">' + result['name'] + '</span><span class="sectionStatus ' + color + '">' + result['status'] + '</span>' + responsetime);
        } else {
            //adds a new row in the systemStatus with the status of the server
            $("#" + fixedSection + "").append('<div id="' + fixedSection + "_" + fixedName + '"  style="display:none" class="item statusBar bar"><span class="sectionLabel">' + result['name'] + '</span><span class="sectionStatus ' + color + '">' + result['status'] + '</span>' + responsetime + '</div>');
            $("#" + fixedSection + "_" + fixedName).show("slow");
        }
    }
}
