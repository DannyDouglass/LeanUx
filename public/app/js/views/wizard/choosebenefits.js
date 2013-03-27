define(
    ["jquery", "marionette", "views/fadetransitionregion", "models/four01kplan", "collections/four01kplancollection", 'tpl!templates/401k.plan.details.display.html', 'tpl!templates/401k.plan.details.input.html', 'tpl!templates/401k.plan.item.html', 'tpl!templates/401k.plan.options.html', 'tpl!templates/benefits.choose.html'],

    function($, Marionette, FadeTransitionRegion, Four01kPlan, Four01kPlanCollection, Four01kDetailsDisplayTmpl,  Four01kDetailsInputTmpl, Four01kItemTmpl, Four01kOptionsTmpl, benefitsChooseTmpl) {

        var four01kPlanItemView = Marionette.ItemView.extend({
            model: Four01kPlan,
            tagName: "li",
            template: Four01kItemTmpl
        });

        var four01kPlanCompositeView = Marionette.CompositeView.extend({
            itemView: four01kPlanItemView,
            itemViewContainer: "ul",
            template: Four01kOptionsTmpl,
            className: "wizard-thumbnail"
        });

        var four01kPlanDetailsDisplay = Marionette.ItemView.extend({
            template: Four01kDetailsDisplayTmpl,
            model: Four01kPlan,
            tagName: "li"
        });

        var four01kPlanDetailsInput = Marionette.CompositeView.extend({
            itemView: four01kPlanDetailsDisplay,
            template: Four01kDetailsInputTmpl,
            itemViewContainer: "ul",

            serializeData: function() {

                var employeePercentage = this.model.get("employeePercentage");
                if (employeePercentage) {
                    employeePercentage = employeePercentage * 100;
                }
                else {
                    employeePercentage = 0;
                }

                var companyPercentage = this.model.get("companyPercentage");
                if (companyPercentage) {
                    companyPercentage = companyPercentage * 100;
                }
                else {
                    companyPercentage = 0;
                }

                return {
                    employeePercentage: employeePercentage,
                    companyPercentage: companyPercentage,
                    totalPercentage: employeePercentage + companyPercentage
                };
            }
        });

        var ChooseBenefitsView = Marionette.Layout.extend({
            template: benefitsChooseTmpl,
            regionType: FadeTransitionRegion,

            regions: {
                body: ".wizard-step-body"
            },

            events: {
                "click button.enroll": "enroll",
                "click #done_401k": "done",
                "click button.cancel": "cancel"
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

            done: function() {
                var employeeContrib = this.body.$el.find("#employeePercentage").val();
                var companyContrib = this.body.$el.find("#companyPercentage").val();

                employeeContrib = parseInt(employeeContrib) / 100;
                companyContrib = parseInt(companyContrib) / 100;

                var that = this;

                this.model.save({ employeePercentage: employeeContrib, companyPercentage: companyContrib, lastSaved: new Date() }, {
                    success: function() {
                        that.trigger("done");
                    },
                    error: function() {
                        console.log("error");
                    }
                });
            },

            cancel: function(){
                this._setCurrentState(this.states.thumbnailed);
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
                this.body.show(new this.currentState.View({ collection: this.collection, model: this.model }));

                if (this.currentState === this.states.details) {
                    $("#enroll_401k").hide();
                    $("#PlanOptions_401kPlan").addClass("active");
                }
                else if (this.currentState === this.states.thumbnailed) {
                    $("#enroll_401k").show();
                    $("#PlanOptions_401kPlan").removeClass("active");
                }
            }
        });

        return ChooseBenefitsView;
    }
);
