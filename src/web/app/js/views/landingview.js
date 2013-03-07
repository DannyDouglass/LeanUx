define(['backbone', 'jquery', 'bootstrap', '../router', 'views/rightsidebarview'], function(Backbone, $, Bootstrap, Router, RightSideBarView){
	var LandingView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#newHireLandingTemplate").html()),

		initialize: function(){
		},
		render: function(){
			this.$el.empty();
			var rightSideBarView = new RightSideBarView();
			this.$el.html(this.template);
			rightSideBarView.render();
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