define(['backbone', 'jquery', 'bootstrap'], function(Backbone, jQuery, Bootstrap){
	var App = Backbone.View.extend({
		el: "#buttonGroupContainer",
		template: _.template($("#buttonTemplate").html()),

		initialize: function(){
			console.log('main app view loaded');
			this.render();
		},
		render: function(){
			// this.$el.html(this.template);
		}
	});

	return App;
});