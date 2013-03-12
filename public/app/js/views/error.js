define(['backbone', 'jquery', 'bootstrap'], function(Backbone, $, Bootstrap){
	var ErrorView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#errorTemplate").html()),

		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.empty();
			$('#rightSubContentColumn').empty();
			this.$el.html(this.template);
		}
	});

	return ErrorView;
});