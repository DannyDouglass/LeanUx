define(
    ["jquery", "underscore", "backbone", "marionette", 'tpl!templates/wizard.nextprevious.html'],
    function($, _, Backbone, Marionette, wizardNextPreviousTemplate) {

    var WizardNextPreviousView = Marionette.ItemView.extend({
        tagName: "div",
        className: "actions",
        template: wizardNextPreviousTemplate,
        firstStep: 1,
        lastStep: 5,

        initialize: function() {
            this.step = this.options.step;
        },

        triggers: {
            "click #btn-previous .btn": "step:previous"
        },

        events: {
            "click #btn-next-done .btn": "nextOrDone"
        },

        ui: {
            previousButton: '#btn-previous .btn',
            nextOrDoneButton: '#btn-next-done .btn'
        },

        onRender: function(){
            if (this.step == this.firstStep)
                this.ui.previousButton.hide();
            else if (this.step == this.lastStep) {
                this.ui.nextOrDoneButton.addClass('btn-large');
                this.ui.nextOrDoneButton.text('Complete New Hire Entry');
            }
        },

        nextOrDone: function(){
            if (this.step == this.lastStep)
                this.trigger("step:done");
            else
                this.trigger("step:next");
        }
    });

    return WizardNextPreviousView;
});
