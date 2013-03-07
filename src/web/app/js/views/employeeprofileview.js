define(['backbone', 'jquery', 'bootstrap', '../router'], function(Backbone, $, Bootstrap, Router){
	var EmployeeProfileView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#employeeProfileTemplate").html()),

		initialize: function(){
		},
		render: function(){
			this.$el.empty();
			this.$el.html(this.template);
		}
	});

	return EmployeeProfileView;
});