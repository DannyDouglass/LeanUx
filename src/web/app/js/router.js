define(['backbone', 'jquery', 'views/landing', 'views/addNewHire'], function(Backbone, $, LandingView, AddNewHireView){
	var AppRouter = Backbone.Router.extend({
		routes : { 
			"" : "landingPage",
			"newHire/new" : "addNewHire"
		},
		initialize: function() {
			
		},
		landingPage: function(){
			console.log('render landing view');
			var landingView = new LandingView();
			landingView.render();
		},
		addNewHire: function(){
			console.log('render addNewHire view');
			var addNewHireView = new AddNewHireView();
			addNewHireView.render();
		}
	});

	var appRouter = new AppRouter();
	Backbone.history.start();
	return AppRouter;
});