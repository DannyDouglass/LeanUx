define(["jquery", "marionette", "views/fadetransitionregion", "views/commontemplatehelpers", "tpl!templates/benefits.summary.html", "tpl!templates/newhire.profile.summary.html", "tpl!templates/review.complete.html"], 

    function($, Marionette, FadeTransitionRegion, templateHelpers, benefitsSummaryTmpl, newHireProfileSummaryTmpl, reviewCompleteTmpl) {

        var BenefitsSummary = Marionette.ItemView.extend({
            
            template: benefitsSummaryTmpl,

            events: {
                "click .goBackAndEditLink": "goBackAndEdit"
            },

            serializeData: function() {
                var opt = this.model.get("benefitOptions").four01k
                if (!opt) { return {}; }

                var ep = opt.employeePercentage;
                var cp = opt.companyPercentage;

                if (ep) { ep = "" + (ep * 100) + "%"; }
                if (cp) { cp = "" + (cp * 100) + "%"; }

                return {
                    employeePercentage: ep,
                    companyPercentage: cp
                };
            },

            goBackAndEdit: function() {
                LeanUx.router.navigate("chooseBenefits/" + this.model.id, { trigger: true });
            }
        });

        var NewHireProfileSummary = Marionette.ItemView.extend({
            
            template: newHireProfileSummaryTmpl,

            events: {
                "click .goBackAndEditLink button": "goBackAndEdit"
            },

            templateHelpers: function() {
                return {
                    dateOfHire: templateHelpers.formatDate(this.model.get("dateOfHire"))
                };
            },

            goBackAndEdit: function() {
                LeanUx.router.navigate("employeeProfile/" + this.model.id, { trigger: true });
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
                    .html("Please review all information about the employee, then confirm to complete.");

                this.newHireSummary.show(new NewHireProfileSummary({ model: this.model }));
                this.benefitsSummary.show(new BenefitsSummary({ model: this.model }));
            }
        });

        return ReviewAndCompleteView;
    }
);