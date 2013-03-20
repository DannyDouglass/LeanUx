define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var NewHiresModel = Backbone.Model.extend({
        idAttribute: "_id",

        defaults: {
            salutation: "",
            firstName: "",
            middleName: "",
            lastName: "",
            suffix: "",
            gender: "",
            dateOfHire: "",
            dateOfBirth: "",
            maritalStatus: "",
            status: "Not Completed",
            statusLocation: "",
            socialSecurityNumber: "",
            lastSaved: ""
        }
	});

	return NewHiresModel;
});