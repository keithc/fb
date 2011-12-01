//ui events here
$.subscribe(fbEvents.INIT_COMPLETE, function ()
		{
			//_renderNavigation();
			renderTeams(_teams);  //teams should be in the data tier
		});

function renderTeams(data) { 
	if (data)
	{
		$("#mainPane").empty();  
		//if not data, error
		$("#tmpl-teams-list").tmpl({teams: data}).appendTo("#mainPane"); 
		//$("#tmpl-team").tmpl(data).appendTo("#mainPane");   
		//$("#team-container").empty();
		//$.tmpl("#tmpl-team",data).appendTo("#mainPane");   
	}
}
		
//ui rendering		
function listData(obj, tmpl) {

}