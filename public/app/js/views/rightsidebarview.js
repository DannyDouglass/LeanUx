define(['backbone', 'jquery', 'bootstrap'], function(Backbone, $, Bootstrap){
	var RightSideBarView = Backbone.View.extend({
		el: "#rightSubContentColumn",
		template: _.template($("#rightSideBarTemplate").html()),

		initialize: function(){
			this.$el.empty();
			this.render();
		},
		render: function(){
			this.$el.html(this.template);
		},
		events: {
			"click #viewAllNewHires" : "showNewHires"
		},
		showNewHires: function(ev){
			ev.preventDefault();
			LeanUx.router.navigate("", true);
		}
	});

	return RightSideBarView;
});