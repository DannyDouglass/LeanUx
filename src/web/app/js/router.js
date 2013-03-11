define(['backbone', 'jquery', 'views/newhiresview', 'views/employeeprofileview', 'views/loadingview', 'collections/newhirescollection'], 
	function(Backbone, $, NewHiresView, EmployeeProfileView, LoadingView, NewHiresCollection){	
	
	var AppRouter = Backbone.Router.extend({
		routes : { 
			"" : "NewHiresView",
			"employeeProfile" : "employeeProfilePage"
		},
		initialize: function() {
			
		},
		NewHiresView: function(){
			var loadingView = new LoadingView();
			LeanUx.newHiresCollection = new NewHiresCollection();
			LeanUx.newHiresCollection.fetch({
				success: function(){
					var newHiresView = new NewHiresView();
				}
			});
		},
		employeeProfilePage: function(){
			var loadingView = new LoadingView();
			var employeeProfileView = new EmployeeProfileView();
			employeeProfileView.render();
		}
	});

	var appRouter = new AppRouter();
	Backbone.history.start();
	return AppRouter;
});