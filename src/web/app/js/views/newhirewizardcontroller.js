define(
    ["jquery", "underscore", "backbone", "marionette", "views/newhirewizard", "views/rightsidebarview"],

    function($, _, Backbone, Marionette, wizard, RightSideBarView) {

        var NewHireWizardController = Marionette.Controller.extend({
            start: function() {
                var rightSideBar = new RightSideBarView();

                var region = new wizard.NewHireWizardRegion();
                var layout = new wizard.NewHireWizardLayout();
                region.show(layout);

                layout.wizardProgress.show(new wizard.WizardProgressView());
                layout.currentStep.show(new wizard.EmployeeInformationView());
            }
        });

        return NewHireWizardController;
    }
);