define(['jquery', 'underscore', 'backbone', 'models/newhiresmodel'], function($, _, Backbone, NewHiresModel) {
	var EmployeeProfileCollection = Backbone.Collection.extend({
		model: NewHiresModel,
		url: "/newhire/employeeprofiles"
	});

	return EmployeeProfileCollection;
});