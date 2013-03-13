define(["jquery", "underscore", "backbone", "models/four01kplan"], function($, _, Backbone, Four01kPlan) {

    var Four01kPlanCollection = Backbone.Collection.extend({
        model: Four01kPlan,
        url: "/401kplans"
    });

    return Four01kPlanCollection;
});