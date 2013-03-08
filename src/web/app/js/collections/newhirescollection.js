define(['jquery', 'underscore', 'backbone', 'models/newhiresmodel'], function($, _, Backbone, NewHiresModel) {
	var EmployeeProfileCollection = Backbone.Model.extend({
		model: NewHiresModel,
		url: function() {
            return "/api/employeeprofiles";
		}
	});

	return EmployeeProfileCollection;
});