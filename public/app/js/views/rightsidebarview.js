define(['backbone', 'jquery', 'bootstrap', 'tpl!templates/right.sidebar.html', 'tpl!templates/right.sidebar.unsaved.html', 'tpl!templates/right.sidebar.saved.html', 'moment'], 
	function(Backbone, $, Bootstrap, rightSidebar, rightSidebarUnsaved, rightSidebarSaved, MomentJs){
	
	var RightSideBarView = Backbone.View.extend({
		el: "#rightSubContentColumn",
		viewHelpers: {
			getFriendlyDate: function(date){
				var savedDate = new Date(date);
				console.log(savedDate);
				var exactMoment = MomentJs([savedDate.getFullYear(), savedDate.getMonth(), savedDate.getUTCDate(), savedDate.getHours(), savedDate.getMinutes(), savedDate.getSeconds()]);
				var friendlyDate = exactMoment.fromNow();
				return friendlyDate;
			}
		},

		initialize: function(){
			this.$el.empty();
			
			if(!this.model)
				this.template = rightSidebar;
			else if(!this.model.get("lastSaved"))
				this.template = rightSidebarUnsaved;
			else {
				this.template = rightSidebarSaved;
			}

			this.render();
		},

		render: function(){
			if(this.model){
				this.model = this.model.toJSON();
				_.extend(this.model, this.viewHelpers);
			}
			this.$el.html(this.template(this.model));
		},
		events: {
			"click #viewAllNewHires" : "showNewHires"
		},
		showNewHires: function(ev){
			ev.preventDefault();
			LeanUx.router.navigate("", true);
		}
	});

	return RightSideBarView;
});