//todo: randomize card positions, pick a number of cards from a larger set but make sure they go in pairs, load cards by default, configuration settings, card flip animation

Array.prototype.find = function (itemName){
	for (index in this) {  
		if (this[index].name === itemName) //TODO: types
		{
			return this[index]; 
		}
	}
	return null; 
};

Array.prototype.shuffle = function() {
	var len = this.length; 
	var i = len; 
	while (i--) { 
		var p = parseInt(Math.random()*len); 
		var t = this[i];
		this[i] = this[p];  //swap p & i items
		this[p] = t; 
	}
};


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
//languageCaptions.push ({name:1, image:"images/soccerball.png", translations:[{name: "en", word: "ball"}, {name:"es", word: "pelota"}, {name:"fr", word:"balle"}]}); 
//languageCaptions.push ({name:2, image:"images/egg.jpg", translations:[{name: "en", word: "egg"}, {name:"es", word: "huevo"}, {name:"fr", word:"œuf"}]}); 
languageCaptions.push ({name:2, color:"#00F", fontColor:"#FFF", translations:[{name: "en", word: "blue"}, {name:"es", word: "azul"}, {name:"fr", word:"bleu"}]}); 
languageCaptions.push ({name:2, color:"#0F0", translations:[{name: "en", word: "green"}, {name:"es", word: "verde"}, {name:"fr", word:"vert"}]}); 
languageCaptions.push ({name:2, color:"#F00", translations:[{name: "en", word: "red"}, {name:"es", word: "rojo"}, {name:"fr", word:"rouge"}]}); 
languageCaptions.push ({name:2, color:"#FFFF00", translations:[{name: "en", word: "yellow"}, {name:"es", word: "amarillo"}, {name:"fr", word:"jaune"}]}); 
languageCaptions.push ({name:2, color:"#FF6600", translations:[{name: "en", word: "orange"}, {name:"es", word: "naranja"}, {name:"fr", word:"orange"}]}); 
languageCaptions.push ({name:2, color:"#6600FF", translations:[{name: "en", word: "purple"}, {name:"es", word: "morado"}, {name:"fr", word:"pourpre"}]}); 
languageCaptions.push ({name:2, color:"#663300", translations:[{name: "en", word: "brown"}, {name:"es", word: "marron"}, {name:"fr", word:"brun"}]}); 


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
		{name: "leftLanguageCaption", content: "English", className:"language-label"}, //todo configurable defaults
		{name: "rightLanguageCaption", content: "Spanish", className:"language-label"},
		{name: "resultMessage", content: "Pick a card", className:"message-label"},
		//cards  
		{kind: "Control", name:"CardRows", layoutKind: "HFlexLayout",
		  //style: "width: 600px; height: auto;",
		  pack: "center", align: "start", 
		  components: [
				
			]
	  //cardButtons,
	  //components: [	{kind:enyo.Button, flipped:false, caption:"1", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/soccerball.png"},
	//				{kind:enyo.Button, flipped:false, caption:"2", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/egg.jpg"}]
		}
	]}
  ],
  cardsShowing: 0,
  firstCardShowing :"",
  flippingEnabled: true,
  languageLeft: "en",
  languageRight: "es",
  languageClick: function(inSender, e) { 
	var lang = languages.find(inSender.getValue()); 
	if (lang != undefined && lang.code != undefined) 
	{ 
		if (inSender.getName() === "languageLeft") 
		{
			this.languageLeft = lang.code; 
			this.$.leftLanguageCaption.setContent(inSender.getValue());
		}
		else
		{
			this.languageRight = lang.code; 
			this.$.rightLanguageCaption.setContent(inSender.getValue());
		}
	}
	  //todo: how to get the caption? 

	this.init(); 
  },
  showCard: function(card) { 
  //console.log("show" + card.name + " -it was " + card.flipped); 
		//if card has an image, use that - else use the color
		if (card.image) 
		{
			card.addStyles("background:url(" + card.image + ")"); 
		}
		else
		{
			card.addStyles("background:" + card.color); 
		}		
		card.addStyles("background-repeat: no-repeat;");
		card.addStyles("background-position:center bottom"); 
		card.addStyles("color: " + card.fontColor); 
		card.content = card.captionText + "<BR><BR>(" + card.language + ")"; 
		card.flipped = true; 
		card.render(); 
  },
  hideCard: function(card) { 
	//console.log("hiding " + card.name + " - it was : " + card.flipped) ;
  		card.addStyles("background:url");
		card.content = " "; 
		card.caption = " "; 
		card.flipped = false; 
		card.render(); 
		//card.owner.$.resultMessage.setContent("Pick another card");
  },
  flipCard: function(inSender, e) { 
	//cards still showing, can't click yet - OR - this card was already matched
	if (!this.flippingEnabled || inSender.matched)
	{
		return false;
	}

	//handle UI
	if (inSender.flipped)  //card was already showing, flip to hide it
	{
		this.hideCard(inSender); 
		this.cardsShowing--; 	
	}
	else //card not showing, flip to show it
	{
		//flipping card to show, see if myMatch is already showing  - map=foreach
		//var matchShowing = this.$.CardRows.children.map(function(row) {
		//	row.children.map(function(card) { 
		//		if (card.name === inSender.myMatch) { 
		//			if (card.flipped) {
		//				inSender.owner.$.resultMessage.setContent("Matched! Great job!"); 
		//				return; 
		//			}
		//		}
		//	})
		//})
		//inSender.addStyles("background:url(" + inSender.image + "); background-position:center top fixed; background-repeat: no-repeat;");
		//inSender.content = inSender.captionText; 
		this.showCard(inSender); 
		this.cardsShowing++; 
	}
	// runs for show or hide
	//inSender.render();
	//inSender.flipped=!inSender.flipped; 
	//check for matches if necessary
	if (this.cardsShowing === 0) //no cards showing now, clear the state holder
	{
		this.firstCardShowing = "";
		inSender.owner.$.resultMessage.setContent("");
	}
	else if (this.cardsShowing === 1)
	{
			this.firstCardShowing = inSender; 
	}
	else if (this.cardsShowing === 2)  //check for matches
	{
		//check for a match
		if (inSender.myMatch === this.firstCardShowing.name) 
		{
			inSender.owner.$.resultMessage.setContent("Matched! Supa job!");
			inSender.matched = true; 
			inSender.addClass("matchedCard"); //maybe a checkmark in the body? 
			this.firstCardShowing.addClass("matchedCard"); 
			this.firstCardShowing.matched = true; //mark the cards true so they can't be clicked again.
			this.firstCardShowing=""; 
			this.cardsShowing =0; 
		}
		else
		{
			var self = this; 
			self.flippingEnabled = false; 
			inSender.owner.$.resultMessage.setContent("Not a match, try again!");
			//if no match, hide the cards after a delay
			window.setTimeout(function() { 
				self.hideCard(self.firstCardShowing); 
				self.hideCard(inSender); 
				self.cardsShowing =0; 
				self.firstCardShowing = ""; 
				self.flippingEnabled = true; 
				inSender.owner.$.resultMessage.setContent("-");
				},
				2000
			);
		}	
	}
  } ,
  init : function ()
  {
  
	function getRandomNumberArray(max) { 
		var rndArray = [];
		for (var i=0; i<max; i++)
		{
			rndArray[i]=i; 
		}
		rndArray.shuffle(); 	
		return rndArray; 
	}; 
  //TODO: remove the duplicate issue - destroy? 
  //TODO: color the languages & the caption that matches (left =blue, right=red), show the languages in each language (english ingles)
	//create cards - TODO: math to put a number of cards per row
	//TODO - remove row logic, just use css? display block on the card row, float left on the cards
	this.$.CardRows.children = []; //clear the rows
	//var maxCardsPerRow = 5; 
	var maxCards = 10; //todo: smarter math/config - 10 will generate 20 cards, pick at random from the data
	//var rowCounter =0; 
	//var currentRow =null; 
	//var randomIndexArray = getRandomNumberArray(maxCards<=languageCaptions.length ? maxCards : languageCaptions.length); 
	var finalCardArray= []; //putting them in an array so they can be shuffled. 
	this.$.CardRows.createComponent({name: "CardRow"+i, layoutKind: "HFlexLayout",  style: "display:block", align: "center", components: []}); 
	
	for (var i = 0; i < maxCards && i < languageCaptions.length; i++)
	{
	//	if (i%maxCardsPerRow == 0) //new row
	//	{
			//this.$.CardRows.createComponent({name: "CardRow"+i, layoutKind: "HFlexLayout",  style: "display:block", align: "center", components: []}); 
	//		currentRow = this.$.CardRows.children[rowCounter];
	//		this.rowCounter++; 
			
	//	}
		//for each caption, create a card button in the left & right language
		var languageCaption = languageCaptions[i]; 
		//null checks
		var leftTranslation = languageCaption.translations.find(this.languageLeft); 
		var rightTranslation = languageCaption.translations.find(this.languageRight);
		
		if ((leftTranslation) && (rightTranslation))
		{			
			var leftCaption = languageCaption.translations.find(this.languageLeft).word; 
			var rightCaption = languageCaption.translations.find(this.languageRight).word; //todo: null check
			var image = languageCaption.image, color= languageCaption.color; 
			var fontColor = languageCaption.fontColor ? languageCaption.fontColor : "#000"; 
			
			//left language button 
			finalCardArray.push({kind:enyo.Button, owner:this, language:this.$.leftLanguageCaption.content, name:leftCaption + "1", myMatch:leftCaption + "2", caption:" ", captionText:leftCaption, flipped:false, onclick:"flipCard", className: "box_round box_shadow box_gradient", image:image, color:color, fontColor:fontColor, matched:false });
			//right language button
			finalCardArray.push({kind:enyo.Button, owner:this, language:this.$.rightLanguageCaption.content, name:leftCaption + "2", myMatch:leftCaption + "1", caption:" ", captionText:rightCaption, flipped:false, onclick:"flipCard", className: "box_round box_shadow box_gradient", image:image, color:color, fontColor:fontColor, matched:false });
		}
	}
	finalCardArray.shuffle(); 
	
	for (var i =0; i<finalCardArray.length; i++)
	{
		this.$.CardRows.children[0].createComponent(finalCardArray[i]); //was currentRow
	}
	
	this.$.CardRows.render(); 
  }
});
