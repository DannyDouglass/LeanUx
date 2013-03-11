define(
	['backbone', 'jquery', 'bootstrap', '../router', 'views/rightsidebarview', 'text!../../templates/employeeProfile.html'], 
	function(Backbone, $, Bootstrap, Router, RightSideBarView, employeeProfileTemplate){
		var EmployeeProfileView = Backbone.View.extend({
			el: "#leftSubContentColumn",
			template: _.template(employeeProfileTemplate),

			initialize: function(){
			},
			render: function(){
				this.$el.empty();
				var rightSideBarView = new RightSideBarView();
				this.$el.html(this.template);
				rightSideBarView.render();
			}
		});

		return EmployeeProfileView;
	}
);