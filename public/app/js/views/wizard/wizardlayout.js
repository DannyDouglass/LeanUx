define(["marionette", "views/fadetransitionregion", 'tpl!templates/wizard.newhire.html'], function(Marionette, FadeTransitionRegion, wizardNewHireTmpl) {

    var WizardLayout = Backbone.Marionette.Layout.extend({

        template: wizardNewHireTmpl,
        regionType: FadeTransitionRegion,

        regions: {
            wizardProgress: "#wizard_progress",
            currentStep: "#wizard_current",
            nextPrevious: "#wizard_next_previous"
        }
    });

    return WizardLayout;
});
