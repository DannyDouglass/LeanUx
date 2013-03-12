define(
	['backbone', 'jquery', 'views/newhiresview', 'views/employeeprofileview', 'views/loadingview', 'views/newhirewizard', "views/wizardprogress", "views/employeeinformationview", 'collections/newhirescollection', 'views/error', "views/rightsidebarview"], 
	function(Backbone, $, NewHiresView, EmployeeProfileView, LoadingView, NewHireWizard, WizardProgressView, EmployeeInformationView, NewHiresCollection, ErrorView, RightSideBarView) {
		var AppRouter = Backbone.Router.extend({
			routes : { 
				"" : "showNewHires",
				"employeeProfile" : "showEmployeeProfile"
			},
			initialize: function() {
			},
			showNewHires: function() {
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
			showEmployeeProfile: function() {
				var wizard = new NewHireWizard();
				wizard.render();
				wizard.wizardProgress.show(new WizardProgressView());
				wizard.wizardCurrent.show(new EmployeeInformationView());

				var rightSideBar = new RightSideBarView();
				rightSideBar.render();
			}
		});

		return AppRouter;
	}
);