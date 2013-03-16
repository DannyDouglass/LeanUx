define(
    ["marionette", "views/newhirewizardprogressview", "views/rightsidebarview", "models/newhiresmodel", "views/wizard/wizardlayout",
    "views/wizard/employeeprofile", "views/wizard/choosebenefits", "views/wizard/reviewandcomplete", "models/four01koptions"],

    function(Marionette, WizardProgressView, RightSideBarView, NewHiresModel, WizardLayout, EmployeeInformationView, 
        ChooseBenefitsView, ReviewAndCompleteView, Four01kOptions) {        

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
                var opt = new Four01kOptions({ id: this.model.id });
                opt.fetch();

                this.layout.wizardProgress.show(new WizardProgressView({ step: 2 })); 

                var chooseBenefitsView = new ChooseBenefitsView({ model: opt });
                chooseBenefitsView.on("done", function() {
                    LeanUx.router.navigate("reviewNewHire/" + this.model.id);
                    this.reviewAndComplete();
                }, this);
                this.layout.currentStep.show(chooseBenefitsView);
            },

            reviewAndComplete: function() {
                this.layout.wizardProgress.show(new WizardProgressView({ step: 5 }));
                this.layout.currentStep.show(new ReviewAndCompleteView({ model: this.model }));
            }
        });

        return NewHireWizardController;
    }
);