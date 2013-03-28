define(
    ["jquery", "underscore", "backbone", "marionette", 'tpl!templates/wizard.nextprevious.html'],
    function($, _, Backbone, Marionette, wizardNextPreviousTemplate) {

    var WizardNextPreviousView = Marionette.ItemView.extend({
        tagName: "div",
        className: "actions",
        template: wizardNextPreviousTemplate,

        initialize: function() {

        }
    });

    return WizardNextPreviousView;
});
