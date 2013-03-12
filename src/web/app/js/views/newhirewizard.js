define(
    ["jquery", "underscore", "backbone", "marionette", "views/wizardprogress"], 
    function($, _, Backbone, Marionette) {

    var NewHireWizard = Backbone.Marionette.Layout.extend({
        template: "#new_hire_wizard",
        el: "#leftSubContentColumn",

        regions: {
            wizardProgress: "#wizard_progress",
            wizardCurrent: "#wizard_current"
        }
    });

    return NewHireWizard;

});