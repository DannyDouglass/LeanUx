define(['backbone', 'jquery', 'bootstrap', '../router'], function(Backbone, $, Bootstrap, Router){
	var AddNewHireView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#addNewHireTemplate").html()),

		initialize: function(){
		},
		render: function(){
			this.$el.empty();
			this.$el.html(this.template);
		}
	});

	return AddNewHireView;
});