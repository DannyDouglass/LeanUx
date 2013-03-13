define(
    ["jquery", "underscore", "backbone", "marionette", "models/newhiresmodel", "collections/four01kplancollection", "models/four01kplan"], 
    function($, _, Backbone, Marionette, NewHiresModel, Four01kPlanCollection, Four01kPlan) {

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

        var four01kPlanItemView = Backbone.Marionette.ItemView.extend({
            model: Four01kPlan,
            tagName: "li",
            template: "#401k_plan_item_template"
        });

        var four01kPlanCompositeView = Backbone.Marionette.CompositeView.extend({
            itemView: four01kPlanItemView,
            itemViewContainer: "ul",
            template: "#401k_plan_options_template",
            className: "wizard-thumbnail"
        });

        var monkey = Backbone.Marionette.ItemView.extend({
            template: "#monkey",
            model: Four01kPlan,
            tagName: "li"
        });

        var compositeMonkey = Backbone.Marionette.CompositeView.extend({
            itemView: monkey,
            template: "#composite_monkey",
            itemViewContainer: "ul"
        });

        wizard.ChooseBenefitsView = Backbone.Marionette.Layout.extend({
            template: "#choose_benefits_template",

            regions: {
                body: ".wizard-step-body"
            },

            events: {
                "click button.enroll": "enroll"
            },

            states: {
                thumbnailed: {
                    View: four01kPlanCompositeView,
                },

                details: {
                    View: compositeMonkey
                }
            },

            enroll: function() {
                if (this.currentState === this.states.thumbnailed) {
                    this._setCurrentState(this.states.details);
                } else {
                    this._setCurrentState(this.states.thumbnailed);
                }
            },

            initialize: function() {
                this.on("state:changed", this._stateChanged);

                this.collection = new Four01kPlanCollection();
                this.collection.fetch();

                this._setCurrentState(this.states.thumbnailed);
            },

            onRender: function() {
                this._showCurrentState();
            },

            _setCurrentState: function(state) {
                this.currentState = state;
                this.trigger("state:changed");
            },

            _stateChanged: function() {
                this._showCurrentState();
            },

            _showCurrentState: function() {
                this.body.show(new this.currentState.View({ collection: this.collection }));
            }
        });

        wizard.WizardProgressView = Backbone.Marionette.ItemView.extend({
            template: "#wizard_progress_template"
        });

        return wizard;

});