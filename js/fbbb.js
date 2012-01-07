


// ----- people 
function loadPeople() {
	//todo: load from a file
	var players = [
		{firstName: "John", lastName: "Smith", birthYear:"1/1/1994", team: "LSU", classYear: "sophomore"},
		{firstName: "Joe", lastName: "Stone", birthYear:"12/12/1994", team: "LSU", classYear: "Freshman"},
		{firstName: "Mike", lastName: "Rice", birthYear:"11/1/1993", team: "ALA", classYear: "junior"},
		{firstName: "Steve", lastName: "Jones", birthYear:"7/1/1994", team: "ALA", classYear: "senior"},
		{firstName: "Rick", lastName: "Evans", birthYear:"6/1/1994", team: "ARK", classYear: "sophomore"}
	];
	return players; 
}

// ------- conferences
function loadConferences() {
	var conferences = [
	{name:"SEC", abbreviation: "SEC"},
	{name:"PAC12", abbreviation: "PAC12"}
	];
	return conferences; 
}

// ------- teams
function loadTeams() {
	var teams = [
	{name:"LSU", abbreviation:"LSU", city:"Baton Rouge", state: "LA", conference:"SEC"},
	{name:"Alabama", abbreviation:"ALA", city:"Tuscaloosa", state: "AL", conference:"SEC"},
	{name:"Arkanasas", abbreviation:"ARK", city:"Little Rock", state: "AR", conference:"SEC"},
	{name:"Colorado", abbreviation:"COL", city:"Boulder", state: "CO", conference:"PAC12"},
	{name:"Southern California", abbreviation:"USC", city:"Los Angeles", state: "CA", conference:"PAC12"}
	]
	return teams; 
}

// ------- seasons
function loadSeasons() {
	//todo: pull from history file
	var season1 = new Season("2011"); 
	_seasons.push(season1); 
}


function Player (firstName, lastName, birthYear, team, classYear, ownerViewModel) {
	   this.firstName = ko.observable(firstName);
       this.lastName   =  ko.observable(lastName); 
       this.birthYear =  ko.observable(birthYear); 
	   this.team =  ko.observable(team); 
	   this.classYear =  ko.observable(classYear); 
	   
	   this.remove = function() { ownerViewModel.players.destroy(this)}; 
	  // this.remove = function() { viewModel.seats.remove(this) }  //check remove vs destroy
}

// objects - put in a separate file
//player object (factory) 
//var Player = (function() {
 //  var Player= function (firstName, lastName, birthYear, team, classYear, ownerViewModel){
   //singleton id? 
 //      this.firstName = ko.observable(firstName);
  //     this.lastName   =  ko.observable(lastName); 
 //      this.birthYear =  ko.observable(birthYear); 
//	   this.team =  ko.observable(team); 
//	   this.classYear =  ko.observable(classYear); 
//	   
//	   this.remove = function() { ownerViewModel.players.destroy(this)}; 
 //  };
//   return function (firstName, lastName, birthYear, team, classYear, ownerViewModel) {
//       return new Player(firstName, lastName, birthYear, team, classYear, ownerViewModel);
//   };
//})();
//todo: should extend a person object

//give teams an id, assign players to teams after id's are set. players will have names of teams, so stlill need a get by name function. after that, use an array with an id key: columnObjects['321'] = new aColumn('321', 'Todds Column'); - then do columnObjects[id]; 

var Team = (function() {
   var Team= function (name, abbreviation, city, state, conference){
       this.name = name;
       this.abbreviation = abbreviation ;
       this.city = city ;
	   this.state= state; 
	   this.conference = conference; 
	   var team = this; 
	   this.location = function () {
			return team.city + ', ' + team.state; 
		}
   };
   return function(name, abbreviation, city, state, conference) {
       return new Team(name, abbreviation, city, state, conference);
   };
})();

var Conference = (function() {
   var Conference= function (name, abbreviation){  //championship stadium, divisions, championship game flag
       this.name = name;
       this.abbreviation = abbreviation ;
	   var thisConf = this; //so the public function 'teams' can see it
	   
	   //todo: make this observable?
	   //todo: cache the result? 
	   this.teams = function() {
				//filter teams by conference
				function isInConference(element, index, array) { 
					return (element.conference ===thisConf.name); 
				}
				return _teamsViewModel.teams().filter(isInConference); 
	   }
   };
   
   return function(name, abbreviation) {
       return new Conference(name, abbreviation);
   };
})();

var Season = (function() {
   var Season= function (name){
       this.name = name;
   };
   return function(name) {
       return new Season(name);
   };
})();

// *** PlayersViewModel ***
var playersViewModel = function() {
	this.players = ko.observableArray([]);
	//for select drop-down
	this.classYears = ko.observableArray(_classYears); 
	
	//input fields for player entry
	this.newFirstName = ko.observable();
	this.newLastName = ko.observable();
	this.newBirthYear = ko.observable();
	this.newTeam = ko.observable();
	this.newClassYear = ko.observable(_classYears[0]);

	this.addPlayer = function() {
		this.players.push(new Player(this.newFirstName(), this.newLastName(), this.newBirthYear(), this.newTeam(), this.newClassYear().id,this));
		this.newFirstName(""); 
		this.newLastName(""); 
		this.newBirthYear(""); 
		this.newTeam("");
		this.newClassYear(_classYears[0]);
	};
	
	//initial load
	this.init= function() {
		var playerJSON = loadPeople(); 
		var mappedPlayers = $.map(playerJSON,  function(item) {
				return new Player(item.firstName, item.lastName, item.birthYear, item.team, item.classYear, this)
		}); 
		this.players(mappedPlayers);
	};
	//getting rosters by filtering players by team
	this.teamToFilterBy = ko.observable("all"); 
	this.playersForTeam = ko.computed(function () {
		var team = this.teamToFilterBy(); 
		if (team == "all") return this.players(); 
		return ko.utils.arrayFilter(this.players(), function (player) {
			return player.team == team; 
		});
	}, this);
};
	//local file loading issues...
    //$.get("/players", function(data) {
    //    var mappedPlayers = $.map(data, function(item) {
    //        return new Player(item.firstName, item.lastName, item.birthYear, item.team, item.classYear, self)
    //    });
    //    self.players(mappedPlayers);
    //});   
	// $.getJSON("json/players.json", function(data) {
    //    var mappedPlayers = $.map(data, function(item) {
    //        return new Player(item.firstName, item.lastName, item.birthYear, item.team, item.classYear, self)
    //    });
	
	//commit changes/updates
   //self.players(mappedPlayers);
    //});  
	
	//todo: 
	//this.save = function() {
    //   $.ajax("/tasks", {
    //       data: ko.toJSON({tasks: this.tasks}),
    //       type: "post",
    //       contentType: "application/json",
    //       success: function(result) { alert(result) }
     //   });
  //  }   


// *** TeamsViewModel ***
var teamsViewModel = function() {
	this.teams = ko.observableArray([]);
	
	this.addTeam = function() {
		this.teams.push(new Team("","","","","",this));
	};
	//initial load
	this.init = function() { 
		var teamJSON = loadTeams(); 
		var mappedTeams = $.map(teamJSON,  function(item) {
				return new Team(item.name, item.abbreviation, item.city, item.state, item.conference, this)
		}); 
		this.teams(mappedTeams);
	};
};

// *** TeamsViewModel ***
var conferencesViewModel = function() {
	this.conferences = ko.observableArray([]);
	this.newName = ko.observable(""); 
	this.newAbbreviation = ko.observable(""); 
	this.teamCount = function() { 
		
	};
	//todo: assign teams
	this.addConference = function() {
		this.conferences.push(new Conference(this.newName, this.newAbbreviation,this));
	};
	//initial load
	this.init = function() { 
		var conferenceJSON = loadConferences(); 
		var mappedConferences = $.map(conferenceJSON,  function(item) {
				return new Conference(item.name, item.abbreviation, this)
		}); 
		this.conferences(mappedConferences);
	};
};


//helper utils - move somewhere else
Array.prototype.contains = function (itemId){
	for (index in this) {  //todo check speed
		if (this[index].name === itemId)
		{
			return true; 
		}
	}
	return false; 
	};
 //todo: can i write a generic contains and override with custom lookup functions? 

 Array.prototype.find = function (itemId){
	for (index in this) {  //todo check speed
		if (this[index].name === itemId)
		{
			return this[index]; 
		}
	}
	return null; 
};


//globals
var _teams= [], _people=[], _conferences=[], _seasons=[], _classYears=[]; 
var _playersViewModel, _teamsViewModel, _conferencesViewModel; 


//init
function init() {
	//move this
	_classYears = [
		{id: "HS", name: "High School"}, 
		{id: "JC", name: "Junior College"}, 
		{id: "FR", name: "Freshman"}, 
		{id: "SO", name: "Sophomore"}, 
		{id: "JR", name: "Junior"}, 
		{id: "SR", name: "Senior"}
	];

	//load conferences
	//loadConferences(); 
	
	//load all teams
	//loadTeams(); 

	//load all people
	loadPeople(); 

	//build schedules (history?) 
	//ko.applyBindings( new playersViewModel()); 
	
	_playersViewModel = new playersViewModel(); 
	_playersViewModel.init(); 
	ko.applyBindings(_playersViewModel, document.getElementById('playersContainer'));
	
	_teamsViewModel = new teamsViewModel();
	_teamsViewModel.init(); 
	
	_conferencesViewModel = new conferencesViewModel();
	_conferencesViewModel.init(); 
	//ko.applyBindings(_teamsViewModel, document.getElementById('teamsContainer')); 
	$.publish (fbEvents.INIT_COMPLETE);

}
