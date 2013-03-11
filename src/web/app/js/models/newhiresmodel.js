define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var NewHiresModel = Backbone.Model.extend({
        idAttribute: "_id",

        toJSON: function() {
            var dateOfHire = /^(\d{4})-(\d{2})-(\d{2})/.exec(this.get("dateOfHire"));
            var lastFour = /\d{3}-\d{2}-(\d{4})/.exec(this.get("socialSecurityNumber"))[1];
            var json = Backbone.Model.prototype.toJSON.call(this);

            json.dateOfHire = dateOfHire[3] + "/" + dateOfHire[2] + "/" + dateOfHire[1];
            json.socialSecurityNumber = "xxx-xx-" + lastFour;

            return json;
        }
	});

	return NewHiresModel;
});