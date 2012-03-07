
// Card object
enyo.kind({
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
	var translation = languageCaptions.find(this.id); 
}
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
languageCaptions.push (new LanguageCaption(1,[{name: "en", word: "ball"}, {name:"es", word: "pelota"}])); 
languageCaptions.push (new LanguageCaption(2,[{name: "en", word: "egg"}, {name:"es", word: "huevo"}])); 


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
	this.kind = enyo.Button; 
	this.name = card.name; 
	this.image = card.image; 
	this.flipped = false; 
	this.onclick = "flipCard"; 
	this.className = "box_round box_shadow box_gradient";
	var translation = languageCaptions.find(card.name); //name is really an id, but id is already used. the prototype array find uses name
	var myCaption = translation.languageTranslations.find(languageCode); 
	this.caption = myCaption.word; 
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

Array.prototype.find = function (itemName){
	for (index in this) {  
		if (this[index].name.toLowerCase() === itemName.toLowerCase())
		{
			return this[index]; 
		}
	}
	return null; 
};

// Main card object
enyo.kind({
  name: "MJCards.CardMatcher",
  kind: enyo.VFlexBox,
  components: [
	//language selectors
	{kind: "RadioGroup", name: "lang1", onclick: "languageClick", 
		components: [ 
			{caption: "English", value: "English"},  //todo: loop through languages
			{caption: "Spanish", value: "Spanish"},
			{caption: "French", value: "French"},
		]
	},
	{kind: "RadioGroup", name: "lang2", onclick: "languageClick", 
		components: [ 
			{caption: "English", value: "English"},
			{caption: "Spanish", value: "Spanish"},
			{caption: "French", value: "French"},
		]
	},
	{name: "statusText", content: "left language"},
	//cards  
	{kind: "Control", layoutKind: "HFlexLayout",
	  style: "width: 500px; height: 1000px;",
	  pack: "center", align: "start", 
	  components: cardButtons,
	  //components: [	{kind:enyo.Button, flipped:false, caption:"1", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/soccerball.png"},
	//				{kind:enyo.Button, flipped:false, caption:"2", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/egg.jpg"}]
	}
  ],
  languageLeft: "en",
  languageRight: "es",
  languageClick: function(inSender, e) { 
	var lang = languages.find(inSender.getValue()); 
	if (lang != undefined && lang.code != undefined) 
	{ 
		if (inSender.getName() === "lang1") 
		{
			this.languageLeft = lang.code; 
		}
		else
		{
			this.languageRight = lang.code; 
		}
	}
	this.$.statusText.setContent("Current selection: " + inSender.getValue());  //todo: how to get the caption? 
  },
  flipCard: function(inSender) { 
	if (inSender.flipped)
	{
		inSender.addStyles("background:url");
	}
	else
	{
		
		inSender.caption = 
		inSender.addStyles("background:url(" + inSender.image + "); background-position:center top fixed; background-repeat: no-repeat;");
	}
	inSender.flipped=!inSender.flipped; 
  } 
});
