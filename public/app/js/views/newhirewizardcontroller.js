define(
    ["jquery", "underscore", "backbone", "marionette", "views/newhirewizardprogressview", "views/newhirewizard", "views/rightsidebarview","collections/four01kplancollection"],
    function($, _, Backbone, Marionette, WizardProgressView, wizard, RightSideBarView, Four01kPlanCollection) {

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
            },

            benefitOptions: function() {
                var rightSideBar = new RightSideBarView();

                var region = new wizard.NewHireWizardRegion();
                var layout = new wizard.NewHireWizardLayout();
                region.show(layout);

                layout.wizardProgress.show(new WizardProgressView());

                var chooseBenefitsView = new wizard.ChooseBenefitsView();
                layout.currentStep.show(chooseBenefitsView);

                var collection = new Four01kPlanCollection();
                collection.fetch();

                chooseBenefitsView.body.show(new chooseBenefitsView.Thumbnail({ collection: collection }));
            }
        });

        return NewHireWizardController;
    }
);