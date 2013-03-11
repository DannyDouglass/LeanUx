define(
	['backbone', 'jquery', 'bootstrap', '../router', 'models/newhiresmodel', 'views/rightsidebarview', 'text!../../templates/employeeProfile.html'], 
	function(Backbone, $, Bootstrap, Router, NewHiresModel, RightSideBarView, employeeProfileTemplate){
		var EmployeeProfileView = Backbone.View.extend({
			el: "#leftSubContentColumn",
			template: _.template(employeeProfileTemplate),

			events: {
				"click #start_new_hire": "startNewHire",
				"click button#done": "done"
			},

			initialize: function() {
				this.model = new NewHiresModel();
			},

			render: function(){
				var rightSideBarView = new RightSideBarView();
				this.$el.html(this.template());
				rightSideBarView.render();

				return this;
			},

			startNewHire: function() {
				var ssn = this.$("#ssn").val();
				var dateOfHire = this.$("#dateOfHire").val();

				LeanUx.newHiresCollection.add(this.model);
				this.model.save({ socialSecurityNumber: ssn, dateOfHire: dateOfHire }, {
					success: function() {
						$("#new_hire_details").slideToggle();
					},
					error: function() {
						console.log("error");
					}
				});
			},

			done: function() {
				var attr = {
					salutation: this.$("#salutation").val(),
					firstName: this.$("#firstName").val(),
					middleName: this.$("#middleName").val(),
					lastName: this.$("#lastName").val(),
					suffix: this.$("#suffix").val(),
					gender: "",
					maritalStatus: this.$("#martial_status").val(),
					dateOfBirth: this.$("#dateOfBirth").val()
				};

				if (this.$("#gender_male").is(":checked")) {
					attr.gender = "Male";
				}

				if (this.$("#gender_female").is(":checked")) {
					attr.gender = "Female";
				}

				this.model.save(attr, {
					success: function() {
						console.log("SUCCESS");
					},
					error: function() {
						console.log("error");
					}
				});
			}
		});

		return EmployeeProfileView;
	}
);