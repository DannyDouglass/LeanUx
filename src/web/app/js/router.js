define(['backbone', 'jquery', 'views/landingview', 'views/employeeprofileview', 'views/loadingview'], function(Backbone, $, LandingView, EmployeeProfileView, LoadingView){
	var AppRouter = Backbone.Router.extend({
		routes : { 
			"" : "landingPage",
			"employeeProfile" : "employeeProfilePage"
		},
		initialize: function() {
			
		},
		landingPage: function(){
			var loadingView = new LoadingView();
			var landingView = new LandingView();
			setTimeout(function(){ landingView.render() } , 1500);
		},
		employeeProfilePage: function(){
			var loadingView = new LoadingView();
			var employeeProfileView = new EmployeeProfileView();
			setTimeout(function(){ employeeProfileView.render() } , 1500);
		}
	});

	var appRouter = new AppRouter();
	Backbone.history.start();
	return AppRouter;
});