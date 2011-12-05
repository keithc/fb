/*! data */
jQuery.fbData = (function ($)
{
	var _urls =
    {
    	"x": "http://x",
    	"y": "http://y",
    	"z": "http://z"
    };

	var _options = {
	};

	var _strings =
    {
    	"string1": "string1value",
    	"string2": "string2value"
    };

	

	return {
		init: function (obj)
		{
	
			$.subscribe(fbEvents.EVENT1, function (obj)
			{
				//$.fbData.removeFromCart(obj);
			});
		},

		//other functions here
	}

})(jQuery);


var fbEvents =
{
	INIT_COMPLETE: "fbInitComplete",
	DATA_LOAD_COMPLETE: "fbDataLoadComplete"
};

var fbTemplates = 
{
	TEAMS: "tmpl/teams.html"
}