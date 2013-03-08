define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
	var NewHiresModel = Backbone.Model.extend({
        idAttribute: "_id",

        toJSON: function() {
            var dateOfHire = /^(\d{4})-(\d{2})-(\d{2})/.exec(this.get("dateOfHire"));
            var json = Backbone.Model.prototype.toJSON.call(this);

            json.dateOfHire = dateOfHire[3] + "/" + dateOfHire[2] + "/" + dateOfHire[1];

            return json;
        }
	});

	return NewHiresModel;
});