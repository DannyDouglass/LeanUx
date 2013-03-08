define(['backbone', 'jquery', 'bootstrap', '../router', 'views/rightsidebarview', 'collections/newhirescollection'], 
	function(Backbone, $, Bootstrap, Router, RightSideBarView, NewHiresCollection){

	var NewHiresView = Backbone.View.extend({
		el: "#leftSubContentColumn",
		template: _.template($("#newHireLandingTemplate").html()),

		initialize: function(){
			this.collection = new NewHiresCollection();
			var newHires = this.collection.fetch();
		},
		render: function(){
			this.$el.empty();
			
			var self = this;
			var rows = [];

			console.log(this.collection);
			this.collection.each(function (item) {
				var itemView = new self.NewHiresItemView({ model: item });
            	rows.push(itemView.render().el);
			});
			console.log(rows);

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

	var NewHiresItemView = Backbone.View.extend({
		tagName: "tr",
		template: _.template($("#NewHiresItemTemplate").html()),

		initialize: function(){

		},
		render: function(){

		}
	});

	return NewHiresView;
});