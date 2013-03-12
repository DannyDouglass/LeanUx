define(['backbone', 'jquery', 'underscore', 'bootstrap', '../router', 'views/rightsidebarview', 'collections/newhirescollection'], 
	function(Backbone, $, _, Bootstrap, Router, RightSideBarView, NewHiresCollection){

	var NewHiresView = Backbone.View.extend({
		tagName: "table",
		className: "table table-striped table-outlined",

		initialize: function(){
			this.collection = LeanUx.newHiresCollection;
			this.collection.bind("reset", this.render, this);
        	this.collection.bind("remove", this.render, this);
        	this.render();
		},
		render: function(){

			this.$el.empty();
			
			var self = this;
			var rows = [];

			var sorted = this.collection.sortBy(this.sort);
			_.each(sorted, function (item) {
				var itemView = new NewHiresItemView({ model: item });
            	rows.push(itemView.render().el);
			});

			var rightSideBarView = new RightSideBarView();

			this.$el.append(_.template($("#newHireTableHeader").html()));
			this.$el.append(rows);
			$("#leftSubContentColumn")
				.empty()
				.append(_.template($("#newHireLandingHeader").html()))
				.append(this.$el);
			return this;
		},

	    sort: function (newHire) {
	    	var status = newHire.get("status");
			if (status === "Not Completed") {
				return 0;
			} else if (status === "Pending Completion") {
				return 1;
			} else {
				return 2;
			}
	    }
	});

	var NewHiresItemView = Backbone.View.extend({
		tagName: "tr",
		template: _.template($("#NewHiresItemTemplate").html()),

		viewHelpers: {
			formatSSN: function() {
				var lastFour = /\d{3}-\d{2}-(\d{4})/.exec(this.socialSecurityNumber)[1];
				return "xxx-xx-" + lastFour;
			},

			formatDate: function(whichDate) {
				var theDate = this[whichDate];
				var parts = /^(\d{4})-(\d{2})-(\d{2})/.exec(theDate);

				return parts[2] + "/" + parts[3] + "/" + parts[1];
			}
		},

		initialize: function() {
		},

		render: function() {
			var data = this.model.toJSON();
			_.extend(data, this.viewHelpers);

			this.$el.html(this.template(data));

			return this;
		},

		events: {
	        "click .deleteNewHire": "deleteNewHire"
	    },

	    deleteNewHire: function(ev) {
	    	ev.preventDefault();
	        var confirmed = confirm("Delete this item?");
	        if (confirmed)
	            this.model.destroy();
	    }
	});

	return NewHiresView;
});