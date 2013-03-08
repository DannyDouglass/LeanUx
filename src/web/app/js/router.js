define(['backbone', 'jquery', 'views/newhiresview', 'views/employeeprofileview', 'views/loadingview'], function(Backbone, $, NewHiresView, EmployeeProfileView, LoadingView){
	var AppRouter = Backbone.Router.extend({
		routes : { 
			"" : "NewHiresView",
			"employeeProfile" : "employeeProfilePage"
		},
		initialize: function() {
			
		},
		NewHiresView: function(){
			var loadingView = new LoadingView();
			var newHiresView = new NewHiresView();
			setTimeout(function(){ newHiresView.render() } , 1500);
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