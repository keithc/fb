

Array.prototype.find = function (itemName){
	for (index in this) {  
		if (this[index].name === itemName) //TODO: types
		{
			return this[index]; 
		}
	}
	return null; 
};


// Card object
enyo.kind({
  name: "MJCards.App",
  kind: enyo.Control,
  
  
  
  name: "MJCards.Card",
  kind: "Control",
  hidden: {
      color: "red",
      bgColor: "black"
  },
  content: "Hi",
  image: "images/soccerball.png",
  className: "box_round box_shadow box_gradient",
  create: function() {
      this.inherited(arguments);
  },
  onclick: "flipCard"
});

//trying to use the kind to put into the component array, not working
enyo.kind({
name: "MJCards.Button", 
kind: enyo.Button,
onclick: "flipCard", 
id:1,
className: "box_round box_shadow box_gradient",
toLocaleString : function() { 
	var translation = langcuageCaptions.find(this.id); 
}
}); 


//language data - todo: move to a file

//Language components
enyo.kind({
  name: "Languages", 
  kind: enyo.Component, 
  languages:[]
});

enyo.kind({
  name: "LanguageUtil",
  kind: enyo.Component,
  create: function() { 
	this.inherited(arguments); //do the base create
	//now init
	
  },
  components: [
	{name: "Languages", kind:Languages},
	{name: "LanguageCaptions", kind:"Component", languageCaptions:[]}
  ]
  
 });
  
var Language= function (code, name){
	this.code = code;
	this.name = name; 
};

//languages data  - todo: load from json
languages = []; 
languages.push (new Language("en", "English")) ; 
languages.push (new Language("es", "Spanish")) ; 
languages.push (new Language("fr", "French")) ; 

//translations data - todo: load from json
var LanguageCaption = function (name, languageTranslations) { 
	this.name = name; 
	this.languageTranslations = languageTranslations; 
} 

languageCaptions = [];
languageCaptions.push ({name:1, image:"images/soccerball.png", translations:[{name: "en", word: "ball"}, {name:"es", word: "pelota"}]}); 
languageCaptions.push ({name:2, image:"images/egg.jpg", translations:[{name: "en", word: "egg"}, {name:"es", word: "huevo"}]}); 


/* CARD DATA */

var Card = function (name, image) { 
	this.name = name; 
	this.image = image; 
} ;
//cards data - todo: load from json
baseCards = [];
baseCards.push (new Card(1, "images/soccerball.png")); 
baseCards.push (new Card(2, "images/egg.jpg")); 

//todo: bring in the enyo.kind here
var CardButton = function(card, languageCode){
	var self = this; 

	this.kind = enyo.Button; 
	this.name = card.name; 
	this.image = card.image; 
	this.flipped = false; 
	this.onclick = "flipCard"; 
	this.className = "box_round box_shadow box_gradient";
	this.caption = ""; 
	this.languageCode = languageCode;  //todo: optional? 
	this.init = function(languageCode) { 	
		//todo: namespace the globals
		var translation = languageCaptions.find(card.name); //name is really an id, but id is already used. the prototype array find uses name
		var myCaption = translation.languageTranslations.find(languageCode); 
		self.caption = myCaption.word; 
	}
}

cardButtons = [];
for (var i=0; i < baseCards.length; i++)  //todo: for each language, create a copy of each base card - randomize position (array.shuffle)
{
	var cardButton1 = new CardButton(baseCards[i], MJCards.languageLeft); 
	var cardButton2 = new CardButton(baseCards[i], MJCards.languageRight); 
	cardButtons.push(cardButton1); 
	cardButtons.push(cardButton2); 
}

//todo: remove
myCards=[];
myCards.push( {kind:enyo.Button, name: 1, caption:" ", flipped: false, onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/soccerball.png"});
myCards.push( {kind:enyo.Button, name: 2, caption:" ", flipped: false, onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/egg.jpg"});

/* END CARD DATA */


//trying to use the kind to put into the component array, not working
enyo.kind({
	name: "MJCards.Button", 
	kind: enyo.Button,
	onclick: "flipCard", 
	id:1,
	className: "box_round box_shadow box_gradient"
}); 

// Main card object
enyo.kind({
  name: "MJCards.App",
  kind: enyo.Control,
  components: [
	{kind: "VFlexBox", name: "mainScreen", components: [
		//language selectors
		{kind: "RadioGroup", name: "languageLeft", onclick: "languageClick", 
			components: [ 
				{caption: "English", value: "English"},  //todo: loop through languages, disable language2 entry for the one picked in language 1 (vice versa) 
				{caption: "Spanish", value: "Spanish"},
				{caption: "French", value: "French"},
			]
		},
		{kind: "RadioGroup", name: "languageRight", onclick: "languageClick", 
			components: [ 
				{caption: "English", value: "English"},
				{caption: "Spanish", value: "Spanish"},
				{caption: "French", value: "French"},
			]
		},
		{name: "statusText", content: "left language"},
		//cards  
		{kind: "Control", name:"CardRows", layoutKind: "HFlexLayout",
		  style: "width: 500px; height: 200px;",
		  pack: "center", align: "start", 
		  components: [
				
			]
	  //cardButtons,
	  //components: [	{kind:enyo.Button, flipped:false, caption:"1", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/soccerball.png"},
	//				{kind:enyo.Button, flipped:false, caption:"2", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/egg.jpg"}]
		}
	]}
  ],
  languageLeft: "en",
  languageRight: "es",
  languageClick: function(inSender, e) { 
	var lang = languages.find(inSender.getValue()); 
	if (lang != undefined && lang.code != undefined) 
	{ 
		if (inSender.getName() === "languageLeft") 
		{
			this.languageLeft = lang.code; 
		}
		else
		{
			this.languageRight = lang.code; 
		}
	}
	this.$.statusText.setContent("Current selection: " + inSender.getValue());  //todo: how to get the caption? 
	this.init(); 
  },
  flipCard: function(inSender) { 
	if (inSender.flipped)
	{
		inSender.addStyles("background:url");
		inSender.caption = " "; 
	}
	else
	{
		inSender.addStyles("background:url(" + inSender.image + "); background-position:center top fixed; background-repeat: no-repeat;");
		inSender.content = inSender.captionText; 
	}
	inSender.render();
	inSender.flipped=!inSender.flipped; 
  } ,
  init : function ()
  {
	//create cards - TODO: math to put a number of cards per row
	this.$.CardRows.children = []; //clear the rows
	var maxCardsPerRow = 5; 
	var maxCards = 10; //todo: smarter math/config - 10 will generate 20 cards, pick at random from the data
	var rowCounter =0; 
	var currentRow =null; 
	
	for (var i = 0; i < maxCards && i < languageCaptions.length; i++)
	{
		if (i%maxCardsPerRow == 0) //new row
		{
			this.$.CardRows.createComponent({name: "CardRow"+i, layoutKind: "HFlexLayout", align: "center", components: []}); 
			currentRow = this.$.CardRows.children[rowCounter];
			this.rowCounter++; 
			
		}
		//for each caption, create a card button in the left & right language
		var languageCaption = languageCaptions[i]; 
		var leftCaption = languageCaption.translations.find(this.languageLeft).word; 
		var rightCaption = languageCaption.translations.find(this.languageRight).word; //todo: null check
		var image = languageCaption.image; 
		currentRow.createComponent({kind:enyo.Button, owner:this, name:leftCaption + "1", caption:" ", captionText:leftCaption, flipped:false, onclick:"flipCard", className: "box_round box_shadow box_gradient", image:image}); 
		currentRow.createComponent({kind:enyo.Button, owner:this, name:leftCaption + "2", caption:" ", captionText:rightCaption, flipped:false, onclick:"flipCard", className: "box_round box_shadow box_gradient", image:image}); 
	}
	this.$.CardRows.render(); 
  }
});
