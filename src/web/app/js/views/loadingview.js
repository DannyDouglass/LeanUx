define(['backbone', 'jquery', 'bootstrap'], function(Backbone, $, Bootstrap){
	var LoadingView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#loadingTemplate").html()),

		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.empty();
			$('#rightSubContentColumn').empty();
			this.$el.html(this.template);
		}
	});

	return LoadingView;
});