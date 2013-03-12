define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var NewHiresModel = Backbone.Model.extend({
        idAttribute: "_id",

        defaults: {
            salutation: "",
            firstName: "",
            lastName: "",
            suffix: "",
            dateOfHire: "",
            status: "Not Completed",
            statusLocation: ""
        }
	});

	return NewHiresModel;
});