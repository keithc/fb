//ui events here
$.subscribe(fbEvents.INIT_COMPLETE, function ()
		{
			clearScreen(); 
			renderTeams(_teams);  //teams should be in the data tier
			renderPlayers(_people); 
			$.publish(fbEvents.DATA_LOAD_COMPLETE); 
			_bindEvents(); 
		});

function clearScreen(){
	$("#mainPane").empty();  
}


function renderTeams(data) { 
	if (data)
	{
		
		//if not data, error
		//$("#mainPane").empty();  
		$("#tmpl-teams-list").tmpl({teams: data}).appendTo("#mainPane"); 

	}
}

function renderPlayers(data) { 
	if (data)
	{
		$("#tmpl-players-list").tmpl({players: data}).appendTo("#mainPane"); 
	}
}
		
function _bindEvents(){
	
}