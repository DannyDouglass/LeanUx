define(["jquery", "underscore", "backbone", "models/newhirewizardstep"], function($, _, Backbone, NewHireWizardStep) {

    var data = [{
        order: 1,
        title: "About Employee"
    }, {
        order: 2,
        title: "Choose Benefits"
    }, {
        order: 3,
        title: "Beneficiaries"
    }, {
        order: 4,
        title: "Publications"
    }, {
        order: 5,
        title: "Review & Complete"
    }];

    var NewHireWizardStepsCollection = Backbone.Collection.extend({
        model: NewHireWizardStep,

        fetch: function() {
            this.reset(data);
        }
    });

    return NewHireWizardStepsCollection;
});