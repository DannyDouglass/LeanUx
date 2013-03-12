define(
    ["jquery", "underscore", "backbone", "marionette", "views/newhirewizardprogressview", "views/newhirewizard", "views/rightsidebarview"],
    function($, _, Backbone, Marionette, WizardProgressView, wizard, RightSideBarView) {

        var NewHireWizardController = Marionette.Controller.extend({

            initialize: function() {

            },

            start: function() {
                var rightSideBar = new RightSideBarView();

                var region = new wizard.NewHireWizardRegion();
                var layout = new wizard.NewHireWizardLayout();
                region.show(layout);

                layout.wizardProgress.show(new WizardProgressView());
                layout.currentStep.show(new wizard.EmployeeInformationView());
            }
        });

        return NewHireWizardController;
    }
);