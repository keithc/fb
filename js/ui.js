//ui pub sub events here
$.subscribe(fbEvents.INIT_COMPLETE, function ()
		{
			clearScreen(); 
			//show intro screen or something
			listAllTeams(_teams);  //teams should be in the data tier
			listAllPlayers(_people); 
			$.publish(fbEvents.DATA_LOAD_COMPLETE); 
		});
		
		
$.subscribe(fbEvents.DATA_LOAD_COMPLETE, function ()
		{
			bindEvents(); 
		});
		

		
//ui functions here 
function clearScreen(){
	$("#mainPane").empty();  
}

function listTeamsByConference(conference) 
{
	if (conference) 
	{
		//filter teams by conference
		function isInConference(element, index, array) { 
			return (element.conference ===conference); 
		}
		var data = _teams.filter(isInConference); 
		$("#tmpl-teams-list").tmpl({teams: data}).appendTo("#mainPane"); 
	}
}

function listAllTeams(data) { 
	if (data)//if not data, error
	{
		$("#tmpl-teams-list").tmpl({teams: data}).appendTo("#mainPane"); 
	}
}
//could have a displayItem function, and pass in template, array...
function displayTeam(teamId){
	clearScreen(); 
	//if (_teams.contains(teamId)) 
	//{alert("YES");}
	var team = _teams.find(teamId); 
	if (team) 
	{
		$("#tmpl-team-detail").tmpl(team).appendTo("#mainPane"); 
	} //TODO: else, error handle

}

function displayConference(conferenceId){
	clearScreen(); 
	var conference = _conferences.find(conferenceId); 
	if (conference) 
	{
		$("#tmpl-conference-detail").tmpl(conference).appendTo("#mainPane"); 
	} //TODO: else, error handle

}

function listPlayersByTeam(team){
	if (team) 
	{
		//filter teams by conference
		function isOnTeam(element, index, array) { 
			return (element.team ===team); 
		}
		var data = _people.filter(isOnTeam); 
		$("#tmpl-players-list").tmpl({team: team, players: data}).appendTo("#mainPane"); 
	}
}

function listAllPlayers(data) { 
	if (data)
	{
		$("#tmpl-players-list").tmpl({players: data}).appendTo("#mainPane"); 
	}
}

//ui event binding here 
/*! bindEvents */ 		
function bindEvents(){
	//team links
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
				listTeamsByConference(itemId); 
				break; 
			case "conference" :
				listConferences(itemId); 
				break; 
			case "player" : 
				listPlayersByTeam(itemId); 
				break; 
		}
		//modal, keep history, give 2 links (modal, new window)? 
	}); 
	
	
	
}