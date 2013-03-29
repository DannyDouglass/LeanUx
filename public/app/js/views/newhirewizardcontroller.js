define(
    ["marionette", "views/newhirewizardprogressview", "views/newhirenextpreviousview", "views/rightsidebarview", "models/newhiresmodel",
        "views/wizard/wizardlayout", "views/wizard/employeeprofile", "views/wizard/choosebenefits", "views/wizard/reviewandcomplete",
        "models/four01koptions"],

    function(Marionette, WizardProgressView, WizardNextPreviousView, RightSideBarView, NewHiresModel,
             WizardLayout, EmployeeInformationView, ChooseBenefitsView, ReviewAndCompleteView, Four01kOptions) {

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

            employeeProfile: function(){
                LeanUx.router.navigate("employeeProfile/" + this.model.id, {trigger: true});
            },

            chooseBenefits: function(){
                LeanUx.router.navigate("chooseBenefits/" + this.model.id,{ trigger: true });
            },

            reviewNewHire: function(){
                LeanUx.router.navigate("reviewNewHire/" + this.model.id, { trigger: true });
            },

            newHireProfile: function() {
                var nextPreviousButtonview = new WizardNextPreviousView({step: 1});
                var employeeInformationView = new EmployeeInformationView({ model: this.model });

                employeeInformationView.on("done", this.chooseBenefits, this);
                nextPreviousButtonview.on("step:next", this.chooseBenefits, this);

                this.layout.wizardProgress.show(new WizardProgressView({ step: 1 }));
                this.layout.nextPrevious.show(nextPreviousButtonview);
                this.layout.currentStep.show(employeeInformationView);
            },

            benefitOptions: function() {
                var opt = new Four01kOptions({ id: this.model.id });
                opt.fetch();

                var nextPreviousButtonview = new WizardNextPreviousView({ step: 2 });
                var chooseBenefitsView = new ChooseBenefitsView({ model: opt });

                chooseBenefitsView.on("done", this.reviewNewHire, this);
                nextPreviousButtonview.on("step:previous", this.employeeProfile, this);
                nextPreviousButtonview.on("step:next", this.reviewNewHire, this);

                this.layout.wizardProgress.show(new WizardProgressView({ step: 2 }));
                this.layout.nextPrevious.show(nextPreviousButtonview);
                this.layout.currentStep.show(chooseBenefitsView);
            },

            reviewAndComplete: function() {
                var nextPreviousButtonview = new WizardNextPreviousView({ step: 5 });

                nextPreviousButtonview.on("step:previous", this.chooseBenefits, this);

                this.layout.wizardProgress.show(new WizardProgressView({ step: 5 }));
                this.layout.nextPrevious.show(nextPreviousButtonview);
                this.layout.currentStep.show(new ReviewAndCompleteView({ model: this.model }));
            }
        });

        return NewHireWizardController;
    }
);
