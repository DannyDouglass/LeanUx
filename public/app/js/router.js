define(
	['backbone', 'jquery', 'views/newhiresview', 'views/loadingview', 'views/newhirewizardcontroller', 'collections/newhirescollection', 'views/error'], 
	function(Backbone, $, NewHiresView, LoadingView, NewHireWizardController, NewHiresCollection, ErrorView) {
		var AppRouter = Backbone.Router.extend({
			routes : { 
				"" : "showNewHires",
				"employeeProfile": "showEmployeeProfile",
				"employeeProfile/:id" : "showEmployeeProfile",
				"chooseBenefits": "showBenefitOptions",
				"chooseBenefits/:id": "showBenefitOptions"
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

			showEmployeeProfile: function(id) {
				var model;

				if (id) {
					model = LeanUx.newHiresCollection.get(id);
				}

				var controller = new NewHireWizardController({ model: model });
				controller.start();
			},

			showBenefitOptions: function(id) {
				var controller = new NewHireWizardController();
				controller.benefitOptions();
			}
		});

		return AppRouter;
	}
);