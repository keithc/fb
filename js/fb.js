//globals
var _teams= [], _people=[]; 

//init
function init() {
	//load people
	loadPeople(); 
	//load teams
	loadTeams(); 
	$.publish (fbEvents.INIT_COMPLETE);

}

// ----- people 
function loadPeople() {
	var player1 = new Player("Joe", "Smith", "1/1/1995", "LSU") 
	_people.push(player1); 
}


//player object (factory) 
var Player = (function() {
   var Player= function (firstName, lastName, birthYear, team){
       this.firstName = firstName;
       this.lastName   = lastName; 
       this.birthYear = birthYear; 
	   this.team = team; 
   };
   return function (firstName, lastName, birthYear, team) {
       return new Player(firstName, lastName, birthYear, team);
   };
})();
//todo: should extend a person object



// ------- teams
function loadTeams() {
	var team1 = new Team("LSU", "LSU", "Baton Rouge", "LA", "SEC"); 
	_teams.push(team1); 
	 team1 = new Team("Colorado", "CU", "Boulder", "CO", "PAC12"); 
	_teams.push(team1); 
}


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


