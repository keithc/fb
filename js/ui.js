//ui pub sub events here
$.subscribe(fbEvents.INIT_COMPLETE, function ()
		{
		
			//clearScreen(); 
			//show intro screen or something
			//listAllTeams(_teams);  //teams should be in the data tier
			//listAllPlayers(_people); 
			bindEvents(); 
			$.publish(fbEvents.DATA_LOAD_COMPLETE); 
		});
		
		
$.subscribe(fbEvents.DATA_LOAD_COMPLETE, function ()
		{
			
		});
		
//ui functions here 
function clearScreen(){
	$("#menuPane").empty(); 
	$("#mainPane").empty();  
}

function clearMainPane(){
	$("#mainPane").empty(); 
}


/****************/
/*! Team functions  */ 
function listTeamsByConference(conference) 
{
	if (conference) 
	{
		var mainPane = $("#mainPane"); 
		mainPane.empty(); 
		
		//filter teams by conference
		function isInConference(element, index, array) { 
			return (element.conference ===conference); 
		}
		var data = _teams.filter(isInConference); 
		$("#tmpl-teams-list").tmpl({teams: data}).appendTo(mainPane); 
	}
}

function listAllTeams() { 
	ko.applyBindings(_teamsViewModel, document.getElementById('teamsContainer'));
	//var mainPane = $("#mainPane"); 
	//mainPane.empty(); 
	//$("#tmpl-teams-list").tmpl({teams: _teams}).appendTo(mainPane); 
}

//could have a displayItem function, and pass in template, array...
function displayTeam(teamId){
	var mainPane = $("#mainPane"); 
	mainPane.empty(); 
	//if (_teams.contains(teamId)) 
	//{alert("YES");}
	var team = _teams.find(teamId); 
	if (team) 
	{
		$("#tmpl-team-detail").tmpl(team).appendTo(mainPane); 
	} //TODO: else, error handle

}

/*******************/
/*! Conference functions */ 
function displayConference(conferenceId){
	var mainPane = $("#mainPane"); 
	mainPane.empty(); 
	var conference = _conferences.find(conferenceId); 
	if (conference) 
	{
		$("#tmpl-conference-detail").tmpl(conference).appendTo(mainPane); 
	} //TODO: else, error handle

}

function listAllConferences() { 
	ko.applyBindings(_conferencesViewModel, document.getElementById('conferencesContainer'));
		//var mainPane = $("#mainPane"); 
		//mainPane.empty(); 
		//$("#tmpl-conferences-list").tmpl({conferences: _conferences}).appendTo(mainPane); 
}

/****************/
/*! Players functions */ 
function listPlayersByTeam(team){
	if (team) 
	{
		var mainPane = $("#mainPane"); 
		mainPane.empty(); 
		
		//filter players by team
		function isOnTeam(element, index, array) { 
			return (element.team ===team); 
		}
		var data = _people.filter(isOnTeam); 
		$("#tmpl-players-list").tmpl({team: team, players: data}).appendTo(mainPane); 
	}
}

function listAllPlayers() { 
	ko.applyBindings(_teamsViewModel, document.getElementById('teamSelectContainer')); 
	ko.applyBindings(_playersViewModel, document.getElementById('playersContainer')); 
	//	var mainPane = $("#mainPane"); 
	//	mainPane.empty(); 
	//	$("#tmpl-players-list").tmpl({ team:"ALL", players: _people}).appendTo(mainPane); //todo - how to check for team not being there in the tmpl? had to define it to avoid an error - this is supposed to work:  {{if typeo DATA_PROPERTY==="undefined"}}
}


function showMenu(templateId){
	if (templateId){
		$("#menuPane").empty(); 
		$(templateId).tmpl().appendTo("#menuPane"); 
	}
}

//ui event binding here 
/*! bindEvents */ 		
function bindEvents(){
	$("body").delegate("[data-uitype='link-to-item']", "click", function(evt)  { 
		evt.preventDefault(); 
		var itemId = $(this).data("item-id"); 
		var itemType = $(this).data("item-type"); 
		
		switch (itemType)
		{
			case "team" : 
				displayTeam(itemId); 
				break; 
			case "conference" :
				displayConference(itemId); 
				break; 
		}
		//modal, keep history, give 2 links (modal, new window)? 
	}); 
	
	$("body").delegate("[data-uitype='link-to-list']", "click", function(evt)  { 
		evt.preventDefault(); 
		var itemId = $(this).data("item-id"); 
		var itemType = $(this).data("item-type"); 
		
		switch (itemType)
		{
			case "team" : 
				if (itemId) 
					listTeamsByConference(itemId); 
				else
					listAllTeams(); 
				break; 
				
			case "conference" :
				if (itemId)
					displayConference(itemId); 
				else
					listAllConferences(); 
				break; 
				
			case "player" : 
				if (itemId) 
					listPlayersByTeam(itemId); 
				else
					listAllPlayers(); 			
				break; 
		}
		//modal, keep history, give 2 links (modal, new window)? 
	}); 
		
	$("body").delegate("[data-uitype='menu']", "click", function(evt)  { 
		evt.preventDefault(); 
		var templateId = $(this).data("tmpl-id"); 
		showMenu(templateId);
	}); 
	
	
	
}