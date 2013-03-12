define(
	['backbone', 'jquery', 'views/newhiresview', 'views/employeeprofileview', 'views/loadingview', 'collections/newhirescollection', 'views/error'], 
	function(Backbone, $, NewHiresView, EmployeeProfileView, LoadingView, NewHiresCollection, ErrorView) {
		var AppRouter = Backbone.Router.extend({
			routes : { 
				"" : "showNewHires",
				"employeeProfile" : "showEmployeeProfile"
			},
			initialize: function() {
			},
			showNewHires: function(){
				var loadingView = new LoadingView();
				LeanUx.newHiresCollection = new NewHiresCollection();
				LeanUx.newHiresCollection.fetch({
					success: function(){
						var newHiresView = new NewHiresView();
					},
					error: function(){
						var errorView = new ErrorView();
					}
				});
			},
			showEmployeeProfile: function(){
				var loadingView = new LoadingView();
				var employeeProfileView = new EmployeeProfileView();
				employeeProfileView.render();
			}
		});

		return AppRouter;
	}
);