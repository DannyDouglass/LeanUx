define(
    ["jquery", "underscore", "backbone", "marionette", "models/newhiresmodel", "collections/four01kplancollection", "models/four01kplan"], 
    function($, _, Backbone, Marionette, NewHiresModel, Four01kPlanCollection, Four01kPlan) {

        var FadeTransitionRegion = Backbone.Marionette.Region.extend({

            show: function(view) {
                this.ensureEl();
                view.render();

                this.close(function() {
                    if (this.currentView && this.currentView  !== view) { return; }
                    this.currentView = view;

                    this.open(view, function() {
                        if (view.onShow) { view.onShow(); }
                        view.trigger("show");

                        if (this.onShow) { this.onShow(view); }
                        this.trigger("view:show", view);
                    });
                });
            },

            close: function(callback) {
                var view = this.currentView;
                delete this.currentView;

                if (!view) {
                    if (callback) { callback.call(this); }
                    return;
                }

                var that = this;
                view.$el.fadeOut(function() {
                    if (view.close) { view.close(); }
                    that.trigger("view:closed", view);
                    if (callback) { callback.call(that); }
                });
            },

            open: function(view, callback) {
                var that = this;
                this.$el.html(view.$el.hide());
                view.$el.fadeIn(function() {
                    callback.call(that);
                });
            }
        });

        var wizard = {};

        wizard.NewHireWizardLayout = Backbone.Marionette.Layout.extend({
            template: "#new_hire_wizard_template",
            regionType: FadeTransitionRegion,

            regions: {
                wizardProgress: "#wizard_progress",
                currentStep: "#wizard_current"
            }
        });

        wizard.NewHireWizardRegion = Marionette.Region.extend({
            el: "#leftSubContentColumn"
        });

        var EIDetail = Backbone.Marionette.ItemView.extend({
            template: "#employee_information_details_template",
            tagName: "div",

            templateHelpers: {
                formatDate: function(whichDate) {
                    if (!this[whichDate]) { return ""; }

                    var theDate = this[whichDate];
                    var match = theDate.match(/^(\d{4})-(\d{2})-(\d{2})/);

                    if (match)
                    {
                        return match[2] + "/" + match[3] + "/" + match[1];
                    }

                    return theDate;
                }
            }
        });

        var EIThumbnail = Backbone.Marionette.ItemView.extend({
            template: "#employee_information_thumbnail",
            tagName: "ul",
            className: "inline",

            templateHelpers: {
                formatDate: function(whichDate) {
                    if (!this[whichDate]) { return ""; }

                    var theDate = this[whichDate];

                    var match = theDate.match(/^(\d{4})-(\d{2})-(\d{2})/);

                    if (match)
                    {
                        return match[2] + "/" + match[3] + "/" + match[1];
                    }

                    return theDate;
                }
            }
        });

        wizard.EmployeeInformationView = Backbone.Marionette.Layout.extend({
            template: "#employee_information_template",
            regionType: FadeTransitionRegion,

            regions: {
                body: ".wizard-step-body"
            },

            states: {
                thumbnailed: {
                    View: EIThumbnail
                },

                details: {
                    View: EIDetail
                }
            },

            events: {
                "click #start_new_hire": "startNewHire",
                "click #done": "done"
            },

            initialize: function() {
                this.on("state:changed", this._stateChanged);
                $("#stepInstructionMessage").html("Please enter all the employee&apos;s profile information.");

                this._setCurrentState(this.model.isNew() ? this.states.thumbnailed : this.states.details);
            },

            _setCurrentState: function(state) {
                this.currentState = state;
                this.trigger("state:changed");
            },

            _stateChanged: function() {
                this._showCurrentState();
            },

            _showCurrentState: function() {
                this.body.show(new this.currentState.View({ model: this.model }));
            },

            onRender: function() {
                this._showCurrentState();
            },

            startNewHire: function() {
                var ssn = this.$("#socialSecurityNumber").val();
                var dateOfHire = this.$("#dateOfHire").val();

                LeanUx.newHiresCollection.add(this.model);

                var that = this;
                this.model.save({ socialSecurityNumber: ssn, dateOfHire: dateOfHire }, {
                    success: function() {
                        LeanUx.router.navigate("employeeProfile/" + that.model.id);
                        that._setCurrentState(that.states.details);
                    },
                    error: function() {
                        console.log("error");
                    }
                });
            },

            done: function() {
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

                var that = this;

                this.model.save(attr, {
                    success: function() {
                        that.trigger("done");
                    },
                    error: function() {
                        alert("Something went horribly wrong.");
                    }
                });
            }
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

        var four01kPlanDetailsDisplay = Backbone.Marionette.ItemView.extend({
            template: "#401k_plan_details_display_template",
            model: Four01kPlan,
            tagName: "li"
        });

        var four01kPlanDetailsInput = Backbone.Marionette.CompositeView.extend({
            itemView: four01kPlanDetailsDisplay,
            template: "#401k_plan_details_input_template",
            itemViewContainer: "ul"
        });

        wizard.ChooseBenefitsView = Backbone.Marionette.Layout.extend({
            template: "#choose_benefits_template",
            regionType: FadeTransitionRegion,

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
                    View: four01kPlanDetailsInput
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
                $("#stepInstructionMessage").html("Set up which benefits the employee wishes to enroll in.");
                
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
                
                if (this.currentState === this.states.details) {
                    $("#enroll_401k").hide();
                    $("#PlanOptions_401kPlan").addClass("active");                    
                }
            }
        });

        wizard.ReviewAndCompleteView = Backbone.Marionette.Layout.extend({
            template: "#review_and_complete",
            regionType: FadeTransitionRegion,

            regions: {
                body: ".wizard-step-body"
            },

            initialize: function(){
                this.on("state:changed", this._stateChanged);
                console.log(this.model);
                //todo: set current state

            },

            onRender: function(){
                this._showCurrentState();
            },

            _setCurrentState: function(state){
                this.currentState = state;
            },

            _stateChanged: function(){
                this._showCurrentState();
            },

            _showCurrentState: function(){
                this.body.show(new this.currentState.View())
            }
        });

        wizard.WizardProgressView = Backbone.Marionette.ItemView.extend({
            template: "#wizard_progress_template"
        });

        return wizard;

});