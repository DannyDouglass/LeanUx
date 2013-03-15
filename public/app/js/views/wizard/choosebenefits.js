define(
    ["jquery", "marionette", "views/fadetransitionregion", "models/four01kplan", "collections/four01kplancollection"],

    function($, Marionette, FadeTransitionRegion, Four01kPlan, Four01kPlanCollection) {

        var four01kPlanItemView = Marionette.ItemView.extend({
            model: Four01kPlan,
            tagName: "li",
            template: "#401k_plan_item_template"
        });

        var four01kPlanCompositeView = Marionette.CompositeView.extend({
            itemView: four01kPlanItemView,
            itemViewContainer: "ul",
            template: "#401k_plan_options_template",
            className: "wizard-thumbnail"
        });

        var four01kPlanDetailsDisplay = Marionette.ItemView.extend({
            template: "#401k_plan_details_display_template",
            model: Four01kPlan,
            tagName: "li"
        });

        var four01kPlanDetailsInput = Marionette.CompositeView.extend({
            itemView: four01kPlanDetailsDisplay,
            template: "#401k_plan_details_input_template",
            itemViewContainer: "ul"
        });

        var ChooseBenefitsView = Marionette.Layout.extend({
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

        return ChooseBenefitsView;
    }
);