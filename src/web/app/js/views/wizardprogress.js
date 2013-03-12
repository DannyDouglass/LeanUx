define(
    ["jquery", "underscore", "backbone", "marionette"],
    function($, _, Backbone, Marionette) {

        var WizardProgressView = Backbone.Marionette.ItemView.extend({
            template: "#wizard_progress"
        });

        return WizardProgressView;
    }
);