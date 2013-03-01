require.config({
	paths: {
		"jquery" : "lib/jquery/jquery",
		"underscore" : "lib/underscore-amd/underscore",
		"backbone" : "lib/backbone-amd/backbone"
	}
});

require(['views/app'], function(AppView){
	new AppView;
});