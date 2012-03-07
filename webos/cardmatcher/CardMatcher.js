
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

myCards = [];
//myCards.push(new MJCards.Card()); 

enyo.kind({
name: "MJCards.Button", 
kind: enyo.Button,
onclick: "flipCard", 
className: "box_round box_shadow box_gradient"
}); 

//myCards.push (new MJCards.Button()) ; 
myCards.push( {kind:enyo.Button, caption:"1", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/soccerball.png"});
myCards.push( {kind:enyo.Button, caption:"2", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/egg.jpg"});

enyo.kind({
  name: "MJCards.CardMatcher",
  kind: enyo.VFlexBox,
  components: [
	{kind: "Control", layoutKind: "HFlexLayout",
	  style: "width: 500px; height: 1000px;",
	  pack: "center", align: "start", 
	  components: myCards,
	  //components: [	{kind:enyo.Button, flipped:false, caption:"1", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/soccerball.png"},
	//				{kind:enyo.Button, flipped:false, caption:"2", onclick:"flipCard", className: "box_round box_shadow box_gradient", image:"images/egg.jpg"}]
	}
  ],
  flipCard: function(inSender) { 
	if (inSender.flipped)
	{
		inSender.addStyles("background:url");
	}
	else
	{
		inSender.addStyles("background:url(" + inSender.image + "); background-position:center top fixed; background-repeat: no-repeat;");
	}
	inSender.flipped=!inSender.flipped; 
  } 
});
