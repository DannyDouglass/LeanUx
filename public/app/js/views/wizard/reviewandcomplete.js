define(["jquery", "marionette", "views/fadetransitionregion"], function($, Marionette, FadeTransitionRegion) {

    var ReviewAndCompleteView = Backbone.Marionette.Layout.extend({
        
        template: "#review_and_complete",
        regionType: FadeTransitionRegion,

        regions: {
            body: ".wizard-step-body"
        },

        initialize: function(){
            this.on("state:changed", this._stateChanged);
            console.log(this.model);
            //todo: set current state
        },

        onRender: function(){
            this._showCurrentState();
        },

        _setCurrentState: function(state){
            this.currentState = state;
        },

        _stateChanged: function(){
            this._showCurrentState();
        },

        _showCurrentState: function(){
            this.body.show(new this.currentState.View())
        }
    });

    return ReviewAndCompleteView;
});