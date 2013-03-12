define(
    ["jquery", "underscore", "backbone", "marionette"], 
    function($, _, Backbone, Marionette) {

        var wizard = {};

        wizard.NewHireWizardLayout = Backbone.Marionette.Layout.extend({
            template: "#new_hire_wizard_template",

            regions: {
                wizardProgress: "#wizard_progress",
                wizardCurrent: "#wizard_current"
            }
        });

        wizard.NewHireWizardRegion = Marionette.Region.extend({
            el: "#leftSubContentColumn"
        });

        wizard.EmployeeInformationView = Backbone.Marionette.ItemView.extend({
            template: "#employee_information_template"
        });

        wizard.WizardProgressView = Backbone.Marionette.ItemView.extend({
            template: "#wizard_progress_template"
        });

        return wizard;

});