var compareJSON= [
{
	name: "Tablet3", 
	imageUrl:"http://ecx.images-amazon.com/images/I/41yBWI7-OwL._SL500_AA300_.jpg",
	comparableAttributes: {screensize:"12",speed:"fast"}
},
{
	name:"Tablet4", imageUrl:"http://asset1.cbsistatic.com/cnwk.1d/sc/34093843-2-300-0.gif", comparableAttributes:{screensize:"15",speed:"slow"}
},
{
	name:"Tablet5", imageUrl:"http://asset1.cbsistatic.com/cnwk.1d/sc/34093843-2-300-0.gif", comparableAttributes:{screensize:"14",speed:"medium"}
}
];

function CompareItem(name, imageUrl, compareAttributes) {
	var self=this; 
	self.name = ko.observable(name); 
	self.imageUrl = ko.observable(imageUrl); 
	self.compareAttributes = ko.observable(compareAttributes); 
}


function ViewModel() { 
	var self = this; 
	self.compareItems = ko.observableArray(); 
	
	//for adding a new item
	self.newName = ko.observable("new name"); 
	self.newImageUrl = ko.observable("new url");  
	self.newCompareAttributes = ko.observable({}); 
	
	self.addItem = function() {
		self.compareItems.push(new CompareItem(self.newName(), self.newImageUrl, self.newCompareAttributes())); 
	};	
}

$(document).ready( function() { 
	var myModel = new ViewModel; 
	myModel.compareItems(compareJSON); 
	ko.applyBindings(myModel, document.getElementById("knockoutGrid")); 
}); 