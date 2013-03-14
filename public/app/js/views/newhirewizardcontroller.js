define(
    ["jquery", "underscore", "backbone", "marionette", "views/newhirewizardprogressview", "views/newhirewizard", "views/rightsidebarview", "collections/four01kplancollection", "models/newhiresmodel"],
    function($, _, Backbone, Marionette, WizardProgressView, wizard, RightSideBarView, Four01kPlanCollection, NewHiresModel) {

        var NewHireWizardController = Marionette.Controller.extend({

            initialize: function(options) {

                if (options.model) {
                    this.model = options.model;
                } else {
                    this.model = new NewHiresModel();
                }

                this.rightSideBar = new RightSideBarView();
                this.region = new wizard.NewHireWizardRegion();
                this.layout = new wizard.NewHireWizardLayout();

                this.region.show(this.layout);

                this.layout.wizardProgress.show(new WizardProgressView());
            },

            newHireProfile: function() {
                var employeeInformationView = new wizard.EmployeeInformationView({ model: this.model });
                
                employeeInformationView.on("done", function() {
                    LeanUx.router.navigate("chooseBenefits/" + this.model.id);
                    this.benefitOptions();
                }, this);
                
                this.layout.currentStep.show(employeeInformationView);
            },

            benefitOptions: function() {
                this.layout.currentStep.show(new wizard.ChooseBenefitsView({ model: this.model }));
            }
        });

        return NewHireWizardController;
    }
);