define(['backbone', 'jquery', 'bootstrap', 'tpl!templates/loading.html'], function(Backbone, $, Bootstrap, loadingTmpl){
	var LoadingView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		//template: _.template($("#loadingTemplate").html()),
		template: loadingTmpl,
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