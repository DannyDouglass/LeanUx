define(["marionette", "views/fadetransitionregion"], function(Marionette, FadeTransitionRegion) {

    var WizardLayout = Backbone.Marionette.Layout.extend({

        template: "#new_hire_wizard_template",
        regionType: FadeTransitionRegion,

        regions: {
            wizardProgress: "#wizard_progress",
            currentStep: "#wizard_current"
        }
    });

    return WizardLayout;
});