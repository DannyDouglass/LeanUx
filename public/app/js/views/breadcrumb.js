define(
	['jquery', 'underscore', 'backbone'], 
	function($, _, Backbone) {

		var BreadcrumbView = Backbone.View.extend({
			el: "#breadcrumb" ,
			tagName: "li",

			initialize: function(){
				LeanUx.router.on("route:showNewHires", this.renderNewHires, this);
				LeanUx.router.on("route:showEmployeeProfile", this.renderAddNewHire, this);
				LeanUx.router.on("route:showBenefitOptions", this.renderAddNewHire)
				LeanUx.router.on("route:showReviewAndComplete", this.renderAddNewHire, this);
			},

			renderNewHires: function(){
				$(this.el).empty();
				$(this.el).append(this.renderBaseBreadcrumb);
				$(this.el).append("<li>New Hire</li>")
				return this;
			},

			renderAddNewHire: function(){
				$(this.el).empty();
				$(this.el).append(this.renderBaseBreadcrumb);
				$(this.el).append("<li><a href=\"\">New Hire</a><span class=\"divider\">/</span></li>");  
				$(this.el).append("<li>Add New Hire</li>")
				return this;
			},

			renderBaseBreadcrumb: function(){
				return "<li><a href=\"#\">Administration Home</a><span class=\"divider\">/</span></li><li><a href=\"#\">Employee Administration</a><span class=\"divider\">/</span></li>";
			}
		});

		return BreadcrumbView;
});