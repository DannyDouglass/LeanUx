define(
	['backbone', 'jquery', 'views/newhiresview', 'views/loadingview', 'views/newhirewizardcontroller', 'collections/newhirescollection', 'views/error'], 
	function(Backbone, $, NewHiresView, LoadingView, NewHireWizardController, NewHiresCollection, ErrorView) {

		var AppRouter = Backbone.Router.extend({
			routes : { 
				"" : "showNewHires",
				"employeeProfile": "showEmployeeProfile",
				"employeeProfile/:id" : "showEmployeeProfile",
				"chooseBenefits": "showBenefitOptions",
				"chooseBenefits/:id": "showBenefitOptions",
				"reviewNewHire" : "showReviewAndComplete",
				"reviewNewHire/:id" : "showReviewAndComplete"
			},

			initialize: function() {
			},

			showNewHires: function() {
				var loadingView = new LoadingView();
				var newHiresView = new NewHiresView();
			},

			showEmployeeProfile: function(id) {
				var model;
				if (id) { model = LeanUx.newHiresCollection.get(id); }

				var controller = new NewHireWizardController({ model: model });
				controller.newHireProfile();
			},

			showBenefitOptions: function(id) {
				var controller = new NewHireWizardController();
				controller.benefitOptions();
			},

			showReviewAndComplete: function(id){
				var controller = new NewHireWizardController();
				controller.reviewAndComplete();
			}
		});

		return AppRouter;
	}
);