define(["jquery", "underscore", "backbone", "models/newhirewizardstep"], function($, _, Backbone, NewHireWizardStep) {

    var data = [{
        order: 1,
        title: "New Hire Profile",
        active: true
    }, {
        order: 2,
        title: "Choose Benefits",
        active: false
    }, {
        order: 3,
        title: "Beneficiaries",
        active: false
    }, {
        order: 4,
        title: "Publications",
        active: false
    }, {
        order: 5,
        title: "Review & Complete",
        active: false
    }];

    var NewHireWizardStepsCollection = Backbone.Collection.extend({
        model: NewHireWizardStep,

        fetch: function() {
            this.reset(data);
        }
    });

    return NewHireWizardStepsCollection;
});