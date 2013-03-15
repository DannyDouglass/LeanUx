define(
    ["marionette", "views/newhirewizardprogressview", "views/rightsidebarview", "models/newhiresmodel", "views/wizard/wizardlayout",
    "views/wizard/employeeprofile", "views/wizard/choosebenefits", "views/wizard/reviewandcomplete"],

    function(Marionette, WizardProgressView, RightSideBarView, NewHiresModel, WizardLayout, EmployeeInformationView, 
        ChooseBenefitsView, ReviewAndCompleteView) {        

        var NewHireWizardRegion = Marionette.Region.extend({
            el: "#leftSubContentColumn"
        });

        var NewHireWizardController = Marionette.Controller.extend({

            initialize: function(options) {

                if (options.model) {
                    this.model = options.model;
                } else {
                    this.model = new NewHiresModel();
                }

                this.rightSideBar = new RightSideBarView();
                this.region = new NewHireWizardRegion();
                this.layout = new WizardLayout();

                this.region.show(this.layout);
            },

            newHireProfile: function() {
                var employeeInformationView = new EmployeeInformationView({ model: this.model });
                this.layout.wizardProgress.show(new WizardProgressView({ step: 1 }));
                
                employeeInformationView.on("done", function() {
                    LeanUx.router.navigate("chooseBenefits/" + this.model.id);
                    this.benefitOptions();
                }, this);                

                this.layout.currentStep.show(employeeInformationView);
            },

            benefitOptions: function() {
                this.layout.wizardProgress.show(new WizardProgressView({ step: 2 }));  
                this.layout.currentStep.show(new ChooseBenefitsView({ model: this.model }));
            },

            reviewAndComplete: function(){
                this.layout.wizardProgress.show(new WizardProgressView({ step: 5 }));
                this.layout.currentStep.show(new ReviewAndCompleteView({ model: this.model }));
            }
        });

        return NewHireWizardController;
    }
);