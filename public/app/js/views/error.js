define(['backbone', 'jquery', 'bootstrap', 'tpl!templates/error.html'], 
	function(Backbone, $, Bootstrap, errorTmpl){
	var ErrorView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		//template: _.template($("#errorTemplate").html()),
		template: errorTmpl,
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