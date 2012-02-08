$(document).ready(function() { 

CompareItem = Backbone.Model.extend({
	defaults : { 
		name: "not specified",
		imageUrl: "not specified",
		comparableAttributes: []
	
	},

	initialize : function() { 
		console.log("compare item init:" + this.get("name")) ; 
	} 
}); 

CompareItems = Backbone.Collection.extend({
	model : CompareItem
});

CompareView = Backbone.View.extend({
	initialize: function() { 
		this.render(); 
	},
	render: function() { 
		var tmplHtml = $("#backboneTableTemplate").html(); 
		var template = _.template(tmplHtml); 
		$(this.el).html(template); 
	}
}); 



//*** Loading data ***//
var compareItem1 = new CompareItem({
	name: "Tablet1", 
	imageUrl:"http://g-ecx.images-amazon.com/images/G/01/kindle/otter/dp/KO-slate-02-sm._V164817994_.jpg",
	comparableAttributes: [{screensize:"12"},{speed:"fast"}]
}); 
var compareItem2 = new CompareItem({
	name: "Tablet2", 
	imageUrl:"http://ecx.images-amazon.com/images/I/513JK4cckxL._SL500_AA300_.jpg",
	comparableAttributes: [{screensize:"7"},{speed:"fast"}]
	//comparableAttributes: {"screensize":"12","speed":"fast"}
}); 
var compareItem3 = new CompareItem({
	name: "Tablet3", 
	imageUrl:"http://ecx.images-amazon.com/images/I/41yBWI7-OwL._SL500_AA300_.jpg",
	comparableAttributes: [{screensize:"12"},{speed:"fast"}]
	
}); 

//JSON model data
var compareJSON= [
{
	name:"Tablet4", imageUrl:"", comparableAttributes:[{screensize:"15"},{speed:"slow"}]
},
{
	name:"Tablet5", imageUrl:"", comparableAttributes:[{screensize:"14"},{speed:"medium"}]
}
];
//from json
//not using a var so it'll be global and visible in the template, which is back in the calling html. kinda lame.
compareItems = new CompareItems(
_.map(compareJSON, function(item) { return item }));

//add object literals
compareItems.add([compareItem1, compareItem2, compareItem3]); 

console.log (compareItems.models); 

var compareView = new CompareView({ el: $("#backboneGrid")}); 


} );//doc ready