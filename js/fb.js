//globals
var _teams= [], _people=[], _conferences=[];

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

// ----- people 
function loadPeople() {
	var player1 = new Player("Joe", "Smith", "1/1/1995",  "LSU") 
	_people.push(player1); 
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
	 team1 = new Team("Colorado", "CU", "Boulder", "CO", "PAC12"); 
	_teams.push(team1); 
	

}
// objects - go in a separate class

//player object (factory) 
var Player = (function() {
   var Player= function (firstName, lastName, birthYear, team){
   //singleton id? 
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

if (!Array.prototype.filter)
{
	Array.prototype.filter = function (fun) 
	{
		 "use strict";  
  
		if (this === void 0 || this === null)  
		  throw new TypeError();  
	  
		var t = Object(this);  
		var len = t.length >>> 0;  
		if (typeof fun !== "function")  
		  throw new TypeError();  
	  
		var res = [];  
		var thisp = arguments[1];  
		for (var i = 0; i < len; i++)  
		{  
		  if (i in t)  
		  {  
			var val = t[i]; // in case fun mutates this  
			if (fun.call(thisp, val, i, t))  
			  res.push(val);  
		  }  
		}  
    return res;  
	}
}

