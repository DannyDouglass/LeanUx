define(["jquery", "marionette", "views/fadetransitionregion"], function($, Marionette, FadeTransitionRegion) {

    var BenefitsSummary = Marionette.ItemView.extend({

        template: "#benefits_summary"
    });

    var NewHireProfileSummary = Marionette.ItemView.extend({

        template: "#new_hire_profile_summary"
    });

    var ReviewAndCompleteView = Backbone.Marionette.Layout.extend({
        
        template: "#review_and_complete",
        regionType: FadeTransitionRegion,

        regions: {
            newHireSummary: ".new-hire-summary",
            benefitsSummary: ".benefits-summary"
        },

        initialize: function() {
        },

        onRender: function() {

            console.log(this.model);
            
            $("#stepInstructionMessage")
                .html("Please review all information about the employee, then confirm to complete this new hire.");

            this.newHireSummary.show(new NewHireProfileSummary({ model: this.model }));
            this.benefitsSummary.show(new BenefitsSummary({ model: this.model }));
        }
    });

    return ReviewAndCompleteView;
});