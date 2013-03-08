define(['backbone', 'jquery', 'underscore', 'bootstrap', '../router', 'views/rightsidebarview', 'collections/newhirescollection'], 
	function(Backbone, $, _, Bootstrap, Router, RightSideBarView, NewHiresCollection){

	var NewHiresView = Backbone.View.extend({
		//el: "#leftSubContentColumn",
		tagName: "table",
		className: "table table-striped table-outlined",
		//template: _.template($("#newHireLandingTemplate").html()),

		initialize: function(){
			this.collection = new NewHiresCollection();
			this.collection.fetch();
		},
		render: function(){
			var self = this;
			var rows = [];

			this.collection.each(function (item) {
				var itemView = new NewHiresItemView({ model: item });
            	rows.push(itemView.render().el);
			});

			var rightSideBarView = new RightSideBarView();
			rightSideBarView.render();

			this.$el.append(_.template($("#newHireTableHeader").html())());
			this.$el.append(rows);
			$("#leftSubContentColumn")
				.empty()
				.append(_.template($("#newHireLandingHeader").html())())
				.append(this.$el);

			return this;
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

		initialize: function() {

		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return NewHiresView;
});