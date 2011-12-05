//ui events here
$.subscribe(fbEvents.INIT_COMPLETE, function ()
		{
			//_renderNavigation();
		//	clearScreen(); 
			renderTeams(_teams);  //teams should be in the data tier
			renderPlayers(_people); 
		});

function clearScreen(){
	$("#mainPane").empty();  
}
		
function renderTeams(data) { 
	if (data)
	{
		
		//if not data, error
		$("#mainPane").empty();  
			$("#tmpl-teams-list").tmpl({teams: data}).appendTo("#mainPane"); 
	//	$("#tmpl-teams-list").tmpl({teams: data}).appendTo("#pane2"); 
		//$("#tmpl-team").tmpl(data).appendTo("#mainPane");   
		//$("#team-container").empty();
		//$.tmpl("#tmpl-team",data).appendTo("#mainPane");   
	}
}

function renderPlayers(data) { 
	if (data)
	{
		$("#tmpl-players-list").tmpl({players: data}).appendTo("#mainPane"); 
	}
}
		
//ui rendering		
function listData(obj, tmpl) {

}