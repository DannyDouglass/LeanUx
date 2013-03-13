define(["jquery", "underscore", "backbone"], function($, _, Backbone) {

    var Four01kPlan = Backbone.Model.extend({
        idAttribute: "_id",

        defaults: {
            name: "",
            employerSharingRate: 0,
            employerSharingMinimum: 0
        }
    });

    return Four01kPlan;
})