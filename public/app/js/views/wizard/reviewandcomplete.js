define(["jquery", "marionette", "views/fadetransitionregion", "views/commontemplatehelpers", "tpl!templates/benefits.summary.html", "tpl!templates/new.hire.profile.summary.html", "tpl!templates/review.complete.html"], 

    function($, Marionette, FadeTransitionRegion, templateHelpers, benefitsSummaryTmpl, newHireProfileSummaryTmpl, reviewCompleteTmpl) {

        var BenefitsSummary = Marionette.ItemView.extend({
            
            template: benefitsSummaryTmpl,

            templateHelpers: function() {
                return {
                    chooseBenefitsURL: "#chooseBenefits/" + this.model.id
                };
            }
        });

        var NewHireProfileSummary = Marionette.ItemView.extend({
            
            template: newHireProfileSummaryTmpl,

            templateHelpers: function() {
                return {
                    dateOfHire: templateHelpers.formatDate(this.model.get("dateOfHire")),
                    employeeProfileURL: "#employeeProfile/" + this.model.id
                };
            }
        });

        var ReviewAndCompleteView = Backbone.Marionette.Layout.extend({
            
            template: reviewCompleteTmpl,
            regionType: FadeTransitionRegion,

            regions: {
                newHireSummary: ".new-hire-summary",
                benefitsSummary: ".benefits-summary"
            },

            initialize: function() {
            },

            onRender: function() {

                $("#stepInstructionMessage")
                    .html("Please review all information about the employee, then confirm to complete this new hire.");

                this.newHireSummary.show(new NewHireProfileSummary({ model: this.model }));
                this.benefitsSummary.show(new BenefitsSummary({ model: this.model }));
            }
        });

        return ReviewAndCompleteView;
    }
);