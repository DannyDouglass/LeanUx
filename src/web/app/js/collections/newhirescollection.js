define(['jquery', 'underscore', 'backbone', 'models/newhiresmodel'], function($, _, Backbone, NewHiresModel) {
	var EmployeeProfileCollection = Backbone.Collection.extend({
		model: NewHiresModel,
		url: "/api/employeeprofiles"
	});

	return EmployeeProfileCollection;
});