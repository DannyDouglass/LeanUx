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
        },

        save: function(attributes, options) {
            attributes || (attributes = {});
            attributes['lastSaved'] = new Date();
            Backbone.Model.prototype.save.call(this, attributes, options);
        }
	});

	return NewHiresModel;
});