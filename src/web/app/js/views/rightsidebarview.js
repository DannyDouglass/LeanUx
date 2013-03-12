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
		}
	});

	return RightSideBarView;
});