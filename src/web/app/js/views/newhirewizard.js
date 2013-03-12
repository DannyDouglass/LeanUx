define(
    ["jquery", "underscore", "backbone", "marionette", "models/newhiresmodel"], 
    function($, _, Backbone, Marionette, NewHiresModel) {

        var wizard = {};

        wizard.NewHireWizardLayout = Backbone.Marionette.Layout.extend({
            template: "#new_hire_wizard_template",

            regions: {
                wizardProgress: "#wizard_progress",
                currentStep: "#wizard_current"
            }
        });

        wizard.NewHireWizardRegion = Marionette.Region.extend({
            el: "#leftSubContentColumn"
        });

        wizard.EmployeeInformationView = Backbone.Marionette.ItemView.extend({
            template: "#employee_information_template",

            events: {
                "click #start_new_hire": "startNewHire"
            },

            initialize: function() {
                this.model = new NewHiresModel();
            },

            startNewHire: function() {
                var ssn = this.$("#socialSecurityNumber").val();
                var dateOfHire = this.$("#dateOfHire").val();

                LeanUx.newHiresCollection.add(this.model);

                this.model.save({ socialSecurityNumber: ssn, dateOfHire: dateOfHire }, {
                    success: function() {
                        this.$("#new_hire_details").slideToggle();
                    },
                    error: function() {
                        console.log("error");
                    }
                });
            },

            /*done: function() {
                var attr = {
                    salutation: this.$("#salutation").val(),
                    firstName: this.$("#firstName").val(),
                    middleName: this.$("#middleName").val(),
                    lastName: this.$("#lastName").val(),
                    suffix: this.$("#suffix").val(),
                    gender: "",
                    maritalStatus: this.$("#martial_status").val(),
                    dateOfBirth: this.$("#dateOfBirth").val()
                };

                if (this.$("#gender_male").is(":checked")) {
                    attr.gender = "Male";
                }

                if (this.$("#gender_female").is(":checked")) {
                    attr.gender = "Female";
                }

                this.model.save(attr, {
                    success: function() {
                        console.log("SUCCESS");
                    },
                    error: function() {
                        console.log("error");
                    }
                });
            }*/
        });

        wizard.WizardProgressView = Backbone.Marionette.ItemView.extend({
            template: "#wizard_progress_template"
        });

        return wizard;

});