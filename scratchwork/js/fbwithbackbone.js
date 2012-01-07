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

//player object
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

$(function() { 
	window.Team = Backbone.Model.extend({
		defaults: function() { 
			return{
				name : "defaultname",
				abbreviation: "defaultabbr",
				city: "city",
				state: "state", 
				id : Teams.nextId(),
				owned: false
			};
		},
		toggleOwned: function() { 
			this.save({owned: !this.get("owned")}); 
		}
	});
	
	window.TeamsList = Backbone.Collection.extend({
		model: Team, 
		localStorage: new Store("teams"), 
		all: function() { return this }, 
		nextId: function() { 
			if (!this.length) return 1;
      		return this.last().get("id") + 1;
		}
	
	}); 
	window.Teams = new TeamsList;
	var newTeam = new Team({name:"LSU", city:"Baton Rouge", state:"LA"});
	Teams.add(newTeam); 
	
	window.TeamView = Backbone.View.extend({
		tagName:  "li",
		template: _.template($('#team-template').html()),
		events: {
      		"click .check"              : "toggleOwned",
      		"dblclick div.todo-text"    : "edit",
		    "click span.todo-destroy"   : "clear",
      		"keypress .todo-input"      : "updateOnEnter"
    	},
		initialize: function() {
	      	this.model.bind('change', this.render, this);
      		this.model.bind('destroy', this.remove, this);
    	},
		 render: function() {
      		$(this.el).html(this.template(this.model.toJSON()));
		    this.setText();
      		return this;
    	},
		//setText? 
		 toggleOwned: function() {
	      this.model.toggleOwned();
	    },
		edit: function() {
		    $(this.el).addClass("editing");
      		this.input.focus();
    	},
		close: function() {
      		this.model.save({text: this.input.val()});
      		$(this.el).removeClass("editing");
    	},
		updateOnEnter: function(e) {
      		if (e.keyCode == 13) this.close();
    	},
		remove: function() {
      		$(this.el).remove();
    	},
	   clear: function() {
     		 this.model.destroy();
    	}
	});
	
	 // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  window.AppView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: ("#mainPane"),

    // Our template for the line of statistics at the bottom of the app.
    statsTemplate: _.template($('#stats-template').html()),
	// Our template for the line of statistics at the bottom of the app.
    teamTemplate: _.template($('#team-template').html()),
    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "keypress #new-todo":  "createOnEnter",
      "keyup #new-todo":     "showTooltip"
    },

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved in *localStorage*.
    initialize: function() {
      //this.input    = this.$("#new-todo");

      Teams.bind('add',   this.addOne, this);
      Teams.bind('reset', this.addAll, this);
      Teams.bind('all',   this.render, this);

      Teams.fetch();
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {
	//this.model.toJSON()
		this.$("#teams").html(this.teamTemplate( Teams.toJSON() ));
		
      this.$('#teams-stats').html(this.statsTemplate({
        total:      Teams.length
      }));
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(team) {
      var view = new TeamView({model: team});
      this.$("#team-list").append(view.render().el);
    },

    // Add all items in the **Todos** collection at once.
    addAll: function() {
      Teams.each(this.addOne);
    },

    // If you hit return in the main input field, and there is text to save,
    // create new **Todo** model persisting it to *localStorage*.
    createOnEnter: function(e) {
      var text = this.input.val();
      if (!text || e.keyCode != 13) return;
      Teams.create({text: text});
      this.input.val('');
    },

    // Clear all done todo items, destroying their models.
//    clearCompleted: function() {
  //    _.each(Teams, function(team){ team.destroy(); });
    //  return false;
    //},

    // Lazily show the tooltip that tells you to press `enter` to save
    // a new todo item, after one second.
    showTooltip: function(e) {
      var tooltip = this.$(".ui-tooltip-top");
      var val = this.input.val();
      tooltip.fadeOut();
      if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
      if (val == '' || val == this.input.attr('placeholder')) return;
      var show = function(){ tooltip.show().fadeIn(); };
      this.tooltipTimeout = _.delay(show, 1000);
    }

  });

  // Finally, we kick things off by creating the **App**.
  window.App = new AppView;

});

