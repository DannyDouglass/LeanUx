define(
    ["jquery", "underscore", "backbone", "marionette", "collections/wizardstepcollection", 'tpl!templates/wizard.progress.html', 'tpl!templates/wizard.progress.item.html'], 
    function($, _, Backbone, Marionette, NewHireWizardStepsCollection, wizardProgressTmpl, wizardProgressItemTmpl) {

    var WizardProgressItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",
        template: wizardProgressItemTmpl,

        initialize: function() {
            this.$el.empty();
            this.$el.css({ width: "20%" });

            var order = this.model.get("order");

            if( order < LeanUx.currentWizardStep)
                this.$el.addClass("bar bar-success");
            else if( this.model.get("order") == LeanUx.currentWizardStep )
                this.$el.addClass("active bar bar-info");
            else
                this.$el.addClass("bar-inactive"); 
        }
    });

    var WizardProgressView = Backbone.Marionette.CollectionView.extend({
        tagName: "div",
        className: "progress",
        template: wizardProgressTmpl,
        itemView: WizardProgressItemView,

        initialize: function() {
            LeanUx.currentWizardStep = this.options.step;
            this.collection = new NewHireWizardStepsCollection();
            this.collection.fetch();
        }
    });

    return WizardProgressView;
});