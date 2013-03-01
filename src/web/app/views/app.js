define(['backbone'], function(Backbone){
	var App = Backbone.View.extend({
		initialize: function(){
			console.log('main app view loaded');
		}
	});

	return App;
});