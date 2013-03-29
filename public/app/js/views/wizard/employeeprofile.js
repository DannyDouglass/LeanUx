define(["marionette", "views/fadetransitionregion", 'tpl!templates/employee.info.details.html', 'tpl!templates/employee.info.thumb.html', 'tpl!templates/employee.info.html', 'views/rightsidebarview'], 
    function(Marionette, FadeTransitionRegion, employeeInfoDetailsTmpl, employeeInfoThumbTmpl, employeeInfoTmpl, RightSideBarView) {

    var EIDetail = Marionette.ItemView.extend({

        template: employeeInfoDetailsTmpl,
        tagName: "div",

        templateHelpers: {
            formatDate: function(whichDate) {
                if (!this[whichDate]) { return ""; }

                var theDate = this[whichDate];
                var match = theDate.match(/^(\d{4})-(\d{2})-(\d{2})/);

                if (match) {
                    return match[2] + "/" + match[3] + "/" + match[1];
                }

                return theDate;
            },

            formatSSN: function(ssn) {
                var match = ssn.match(/^(?:\d{3})-(?:\d{2})-(\d{4})/);

                if (match) {
                    return "XXX-XX-" + match[1];
                }

                return ssn;
            }
        }
    });

    var EIThumbnail = Marionette.ItemView.extend({

        template: employeeInfoThumbTmpl,
        tagName: "ul",
        className: "inline",

        templateHelpers: {
            formatDate: function(whichDate) {
                if (!this[whichDate]) { return ""; }

                var theDate = this[whichDate];

                var match = theDate.match(/^(\d{4})-(\d{2})-(\d{2})/);

                if (match)
                {
                    return match[2] + "/" + match[3] + "/" + match[1];
                }

                return theDate;
            }
        }
    });

    var EmployeeInformationView = Marionette.Layout.extend({
        template: employeeInfoTmpl,
        regionType: FadeTransitionRegion,

        regions: {
            body: ".wizard-step-body"
        },

        states: {
            thumbnailed: {
                View: EIThumbnail
            },

            details: {
                View: EIDetail
            }
        },

        events: {
            "click #start_new_hire": "startNewHire",
            "click #done": "done"
        },

        initialize: function() {
            this.on("state:changed", this._stateChanged);
            $("#stepInstructionMessage").html("Please enter all the employee&apos;s profile information.");

            this._setCurrentState(this.model.isNew() ? this.states.thumbnailed : this.states.details);
        },

        _setCurrentState: function(state) {
            this.currentState = state;
            this.trigger("state:changed");
        },

        _stateChanged: function() {
            this._showCurrentState();
        },

        _showCurrentState: function() {
            this.body.show(new this.currentState.View({ model: this.model }));
        },

        onRender: function() {
            this._showCurrentState();
        },

        startNewHire: function() {
            var ssn = this.$("#socialSecurityNumber").val();
            var dateOfHire = this.$("#dateOfHire").val();

            LeanUx.newHiresCollection.add(this.model);

            var that = this;
            this.model.save({ socialSecurityNumber: ssn, dateOfHire: dateOfHire }, {
                success: function() {
                    LeanUx.router.navigate("employeeProfile/" + that.model.id);
                    that._setCurrentState(that.states.details);
                    this.rightSideBar = new RightSideBarView({ model: that.model });
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

            var that = this;

            this.model.save(attr, {
                success: function() {
                    that.trigger("done");
                },
                error: function() {
                    alert("Something went horribly wrong.");
                }
            });
        }
    });

    return EmployeeInformationView;
});