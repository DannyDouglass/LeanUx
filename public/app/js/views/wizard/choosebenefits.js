define(
    ["jquery", "marionette", "views/fadetransitionregion", "models/four01kplan", "collections/four01kplancollection",
        'tpl!templates/401k.plan.details.display.html', 'tpl!templates/401k.plan.details.input.html', 'tpl!templates/401k.plan.item.html',
        'tpl!templates/401k.plan.options.html', 'tpl!templates/401k.plan.summary.display.html', 'tpl!templates/benefits.choose.html', 'views/rightsidebarview'],

    function($, Marionette, FadeTransitionRegion, Four01kPlan, Four01kPlanCollection, Four01kDetailsDisplayTmpl,
             Four01kDetailsInputTmpl, Four01kItemTmpl, Four01kOptionsTmpl, Four01kSummaryDisplayTmpl, benefitsChooseTmpl, RightSideBarView) {

         var serialize401kData = function() {
            var employeePercentage = this.model.get("employeePercentage");

            employeePercentage = employeePercentage ? employeePercentage * 100 : 0;

            var companyPercentage = this.model.get("companyPercentage");

            companyPercentage = companyPercentage ? companyPercentage * 100 : 0;

            return {
                employeePercentage: employeePercentage,
                companyPercentage: companyPercentage,
                totalPercentage: employeePercentage + companyPercentage
            };
        };

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

        var four01kPlanSummaryDisplay = Marionette.ItemView.extend({
            tagName: "div",
            className: "summary-display",
            template: Four01kSummaryDisplayTmpl,
            serializeData: serialize401kData
        });

        var four01kPlanDetailsInput = Marionette.CompositeView.extend({
            itemView: four01kPlanDetailsDisplay,
            template: Four01kDetailsInputTmpl,
            itemViewContainer: "ul",
            serializeData: serialize401kData
        });

        var ChooseBenefitsView = Marionette.Layout.extend({
            template: benefitsChooseTmpl,
            regionType: FadeTransitionRegion,

            regions: {
                body: ".wizard-step-body"
            },

            events: {
                "click #enroll_401k .btn": "enroll",
                "click #done_401k": "done",
                "click button.cancel": "cancel"
            },

            states: {
                thumbnailed: {
                    View: four01kPlanCompositeView
                },

                details: {
                    View: four01kPlanDetailsInput
                },

                summary: {
                    View: four01kPlanSummaryDisplay
                }
            },

            enroll: function() {
                this._setCurrentState(this.states.details);
            },

            done: function() {
                var employeeContrib = this.body.$el.find("#employeePercentage").val();
                var companyContrib = this.body.$el.find("#companyPercentage").val();

                employeeContrib = parseInt(employeeContrib) / 100;
                companyContrib = parseInt(companyContrib) / 100;

                var that = this;

                this.model.save({ employeePercentage: employeeContrib, companyPercentage: companyContrib, lastSaved: new Date() }, {
                    success: function() {
                        that.enrolled = true;
                        that._setCurrentState(that.states.summary);
                        that.rightSideBar = new RightSideBarView({ model: that.model });
                    },
                    error: function() {
                        console.log("error");
                    }
                });
            },

            cancel: function(){
                this._setCurrentState(this.enrolled ? this.states.summary: this.states.thumbnailed);
            },

            initialize: function() {
                $("#stepInstructionMessage").html("Set up which benefits the employee wishes to enroll in.");

                this.on("state:changed", this._stateChanged);

                var employeePercentage = this.model.get("employeePercentage");
                var companyPercentage = this.model.get("companyPercentage");

                this.enrolled = employeePercentage >= 0 && companyPercentage >= 0;
                this.collection = new Four01kPlanCollection();
                this.collection.fetch();
            },

            onRender: function() {
                this._setCurrentState(this.model.isNew() ? this.states.thumbnailed: this.states.details);
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
                    this.$el.find("#enroll_401k").hide();
                    this.$el.find("#PlanOptions_401kPlan").addClass("active");
                }
                else if (this.currentState === this.states.thumbnailed || this.currentState === this.states.summary) {
                    this.$el.find("#enroll_401k").show();
                    this.$el.find("#PlanOptions_401kPlan").removeClass("active");

                    this.$el.find("#enroll_401k .btn").text(this.currentState === this.states.summary ? 'Edit' : 'Enroll');
                }
            }
        });

        return ChooseBenefitsView;
    }
);
