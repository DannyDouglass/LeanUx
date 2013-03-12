define(
	['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {

		var BreadcrumbView = Backbone.View.extend({
			el: "#breadcrumb" ,
			tagName: "li",

			initialize: function(){
				LeanUx.router.on("route:showNewHires", this.renderNewHires, this);
				LeanUx.router.on("route:showEmployeeProfile", this.renderEmployeeProfile, this);
			},

			renderNewHires: function(){
				$(this.el).empty();
				$(this.el).append(this.renderBaseBreadcrumb);
				return this;
			},

			renderEmployeeProfile: function(){
				$(this.el).empty();
				$(this.el).append(this.renderBaseBreadcrumb);
				$(this.el).append(" <span class=\"divider\">/</span> <li><a href=\"\">New Hire</a></li>");  
				return this;
			},

			renderBaseBreadcrumb: function(){
				return "<li><a href=\"#\">Administration Home</a> <span class=\"divider\">/</span></li><li><a href=\"#\">Employee Administration</a></li>";
			}
		});

		return BreadcrumbView;
});