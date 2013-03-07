define(['backbone', 'jquery', 'bootstrap', '../router'], function(Backbone, $, Bootstrap, Router){
	var LandingView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#newHireLandingTemplate").html()),

		initialize: function(){
		},
		render: function(){
			this.$el.empty();
			this.$el.html(this.template);
		},
		events: {
	        "click #addNewHire": "addNewHire"
	    },
	    addNewHire: function(ev) {
	    	ev.preventDefault();
	    	LeanUx.router.navigate('employeeProfile', true);
	    }
	});

	return LandingView;
});