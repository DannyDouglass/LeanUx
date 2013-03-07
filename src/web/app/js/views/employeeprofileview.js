define(['backbone', 'jquery', 'bootstrap', '../router', 'views/rightsidebarview'], function(Backbone, $, Bootstrap, Router, RightSideBarView){
	var EmployeeProfileView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#employeeProfileTemplate").html()),

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
});