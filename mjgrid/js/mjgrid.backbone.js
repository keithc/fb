var CompareItem = Backbone.Model.extend({
	defaults : { 
		name: "not specified",
		imageUrl: "not specified",
		comparableAttributes: []
	
	},

	initialize : function() { 
		console.log("compare item init:" + this.get("name")) ; 
	} 
}); 

var CompareItems = Backbone.Collection.extend({
	model : CompareItem
});

var compareItem1 = new CompareItem({
	name: "Tablet1", 
	imageUrl:"http://g-ecx.images-amazon.com/images/G/01/kindle/otter/dp/KO-slate-02-sm._V164817994_.jpg",
	comparableAttributes: [{"name":"screensize", "value":"12", "uitype":"checkbox"},{"name":"speed", "value":"fast", "uitype":"slider"}]
}); 
var compareItem2 = new CompareItem({
	name: "Tablet2", 
	imageUrl:"http://ecx.images-amazon.com/images/I/513JK4cckxL._SL500_AA300_.jpg",
	comparableAttributes: [{"name":"screensize", "value":"12", "uitype":"checkbox"},{"name":"speed", "value":"fast", "uitype":"slider"}]	
}); 
var compareItem3 = new CompareItem({
	name: "Tablet3", 
	imageUrl:"http://ecx.images-amazon.com/images/I/41yBWI7-OwL._SL500_AA300_.jpg",
	comparableAttributes: [{"name":"screensize", "value":"12", "uitype":"checkbox"},{"name":"speed", "value":"fast", "uitype":"slider"}]
}); 

var compareItems = new CompareItems([compareItem1, compareItem2, compareItem3]); 

console.log (compareItems.models); 
