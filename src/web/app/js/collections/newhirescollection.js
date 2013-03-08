define(['jquery', 'underscore', 'backbone', 'models/newhiresmodel'], function($, _, Backbone, NewHiresModel){
	var EmployeeProfileCollection = Backbone.Model.extend({
		model: NewHiresModel,
		url: function(){
			return "http://localhost:3000/employeeprofiles";
		}
	});

	return EmployeeProfileCollection;
});