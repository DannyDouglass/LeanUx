define(['backbone', 'jquery', 'bootstrap', 'tpl!templates/right.sidebar.html'], function(Backbone, $, Bootstrap, rightSidebar){
	var RightSideBarView = Backbone.View.extend({
		el: "#rightSubContentColumn",
		template: rightSidebar,

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