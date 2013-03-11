define(
	['backbone', 'jquery', 'bootstrap', '../router', 'models/newhiresmodel', 'views/rightsidebarview', 'text!../../templates/employeeProfile.html'], 
	function(Backbone, $, Bootstrap, Router, NewHiresModel, RightSideBarView, employeeProfileTemplate){
		var EmployeeProfileView = Backbone.View.extend({
			el: "#leftSubContentColumn",
			template: _.template(employeeProfileTemplate),

			events: {
				"click #start_new_hire": "startNewHire"
			},

			initialize: function() {
				
			},

			render: function(){
				var rightSideBarView = new RightSideBarView();
				this.$el.html(this.template());
				rightSideBarView.render();

				return this;
			},

			startNewHire: function() {
				var ssn = this.$("#ssn").val();
				var dateOfHire = this.$("#dateOfHire").val();

				LeanUx.newHiresCollection.create({ socialSecurityNumber: ssn, dateOfHire: dateOfHire });
			}
		});

		return EmployeeProfileView;
	}
);