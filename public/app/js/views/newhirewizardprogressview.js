define(
    ["jquery", "underscore", "backbone", "marionette", "collections/wizardstepcollection"], 
    function($, _, Backbone, Marionette, NewHireWizardStepsCollection) {

    var WizardProgressItemView = Backbone.Marionette.ItemView.extend({
        tagName: "div",
        template: "#wizard_progress_item_template",

        initialize: function() {
            this.$el.css({ width: "20%" });

            if (this.model.get("active")) {
                this.$el.addClass("bar bar-info");
            } else {
                this.$el.addClass("bar-inactive");
            }

            // TODO: bar-success
        }
    });

    var WizardProgressView = Backbone.Marionette.CollectionView.extend({
        tagName: "div",
        className: "progress",
        template: "#wizard_progress_template",
        itemView: WizardProgressItemView,

        initialize: function() {
            this.collection = new NewHireWizardStepsCollection();
            this.collection.fetch();
        }
    });

    return WizardProgressView;
});