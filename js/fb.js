
// ----- people 
function loadPeople() {
	//todo: load from a file
	var players = [
		{firstName: "John", lastName: "Smith", birthYear:"1/1/1994", team: "LSU", classYear: "sophomore"}
		{firstName: "Joe", lastName: "Stone", birthYear:"12/12/1994", team: "LSU", classYear: "freshman"}
		{firstName: "Mike", lastName: "Rice", birthYear:"11/1/1993", team: "ALA", classYear: "junior"}
		{firstName: "Steve", lastName: "Jones", birthYear:"7/1/1994", team: "ALA", classYear: "senior"}
		{firstName: "Rick", lastName: "Evans", birthYear:"6/1/1994", team: "ARK", classYear: "sophomore"}
	];

	//var player1 = new Player("Joe", "Smith", "1/1/1995",  "LSU", "sophomore") 
	//_people.push(player1); 
}

// ------- conferences
function loadConferences() {
	var conf1 = new Conference("SEC", "SEC"); 
	_conferences.push(conf1); 
	 conf1 = new Conference("PAC12", "PAC12"); 
	_conferences.push(conf1); 
}

// ------- teams
function loadTeams() {
	var team1 = new Team("LSU", "LSU", "Baton Rouge", "LA", "SEC"); 
	_teams.push(team1); 
	 team1 = new Team("Alabama", "ALA", "Tuscaloosa", "AL", "SEC"); 
	_teams.push(team1); 
	 team1 = new Team("Arkanasas", "ARK", "Little Rock", "AR", "SEC"); 
	_teams.push(team1); 
	 team1 = new Team("Colorado", "COL", "Boulder", "CO", "PAC12"); 
	_teams.push(team1); 
	 team1 = new Team("Southern California", "USC", "Los Angeles", "CA", "PAC12"); 
	_teams.push(team1); 

}

// ------- seasons
function loadSeasons() {
	//todo: pull from history file
	var season1 = new Season("2011"); 
	_seasons.push(season1); 
}


// objects - put in a separate file
//player object (factory) 
var Player = (function() {
   var Player= function (firstName, lastName, birthYear, team, classYear){
   //singleton id? 
       this.firstName = firstName;
       this.lastName   = lastName; 
       this.birthYear = birthYear; 
	   this.team = team; 
	   this.classYear = classYear; 
   };
   return function (firstName, lastName, birthYear, team, classYear) {
       return new Player(firstName, lastName, birthYear, team, classYear);
   };
})();
//todo: should extend a person object

//give teams an id, assign players to teams after id's are set. players will have names of teams, so stlill need a get by name function. after that, use an array with an id key: columnObjects['321'] = new aColumn('321', 'Todds Column'); - then do columnObjects[id]; 

var Team = (function() {
   var Team= function (name, abbreviation, city, state, conference){
       this.name = name;
       this.abbreviation = abbreviation ;
       this.city = city ;
	   this.state= state; 
	   this.conference = conference; 
   };
   return function(name, abbreviation, city, state, conference) {
       return new Team(name, abbreviation, city, state, conference);
   };
})();

var Conference = (function() {
   var Conference= function (name, abbreviation){  //stadium, divisions, championship game
       this.name = name;
       this.abbreviation = abbreviation ;
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

function peopleViewModel() {
	this.players = ko.observableArray([]); 
	this.addPlayer = function() {
		this.players.push(new Player());
	}
	this.deletePlayer = function() {
		alert("DELETE"); 
	}
	var self = this; 
	$.get("/players", function(data) { 
		var mappedPlayers = $.map(data, function(item) {
			return new Player(item.firstName, item.lastName, item.birthYear, item.team, item.classYear, self)
		});
	}
}








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
var _teams= [], _people=[], _conferences=[], _seasons=[];



//init
function init() {
	//load conferences
	loadConferences(); 
	
	//load teams
	loadTeams(); 

	//load people
	loadPeople(); 

	//build schedules (history?) 
	
	$.publish (fbEvents.INIT_COMPLETE);

}
