define(["marionette", "underscore", "views/fadetransitionregion", 'tpl!templates/employee.info.details.html',
       'tpl!templates/employee.info.thumb.html', 'tpl!templates/employee.info.html', 'tpl!templates/employee.info.summary.display.html',
       'views/rightsidebarview'],
    function(Marionette, _, FadeTransitionRegion, employeeInfoDetailsTmpl, employeeInfoThumbTmpl,
             employeeInfoTmpl, employeeInfoSummaryDisplayTmpl, RightSideBarView) {

    var formatDate =  function(whichDate) {
            if (!this[whichDate]) { return ""; }

            var theDate = this[whichDate];
            var match = theDate.match(/^(\d{4})-(\d{2})-(\d{2})/);

            if (match) {
                return match[2] + "/" + match[3] + "/" + match[1];
            }

            return theDate;
    };

    var formatSSN = function(ssn) {
        var match = ssn.match(/^(?:\d{3})-(?:\d{2})-(\d{4})/);

        if (match) {
            return "XXX-XX-" + match[1];
        }

        return ssn;
    };

    var EIDetail = Marionette.ItemView.extend({

        template: employeeInfoDetailsTmpl,
        tagName: "div",

        templateHelpers: {
            formatDate: formatDate,
            formatSSN: formatSSN
        }
    });

    var EIThumbnail = Marionette.ItemView.extend({

        template: employeeInfoThumbTmpl,
        tagName: "ul",
        className: "inline",

        templateHelpers: {
            formatDate: formatDate
        }
    });

    var EISummary = Marionette.ItemView.extend({
        template: employeeInfoSummaryDisplayTmpl,
        tagName: "div",
        className: "summary-display",

        templateHelpers: {
            formatSSN: formatSSN
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
            },

            summary: {
                View: EISummary
            }
        },

        events: {
            "click #start_new_hire": "startNewHire",
            "click #done": "done",
            "click button.cancel": "cancel",
            "click #employee-info-summary-edit": "edit"
        },

        initialize: function() {
            this.on("state:changed", this._stateChanged);

            var that = this;
            var expectedAttrs = ["firstName", "lastName", "gender", "dateOfBirth", "socialSecurityNumber", "dateOfHire"];

            this.completed = _.every(expectedAttrs, function(attr) {
                var value = that.model.get(attr);

                return !_.isEmpty(value) && !_.isUndefined(value) && !_.isNull(value);
            });

            $("#stepInstructionMessage").html("Please enter all the employee&apos;s profile information.");
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

            if (this.currentState === this.states.summary || this.currentState == this.states.thumbnailed)
                this.$("#employee-info-summary-edit").show();
            else
                this.$("#employee-info-summary-edit").hide();
        },

        onRender: function() {
            this._setCurrentState(this.model.isNew() ? this.states.thumbnailed: this.states.details);
        },

        startNewHire: function() {
            var ssn = this.$("#socialSecurityNumber").val();
            var dateOfHire = this.$("#dateOfHire").val();

            LeanUx.newHiresCollection.add(this.model);

            var that = this;

            this.model.save({ socialSecurityNumber: ssn, dateOfHire: dateOfHire, lastSaved: new Date() }, {
                success: function() {
                    LeanUx.router.navigate("employeeProfile/" + that.model.id);

                    that._setCurrentState(that.states.details);
                    that.rightSideBar = new RightSideBarView({ model: that.model });
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
                maritalStatus: this.$("#marital_status").val(),
                dateOfBirth: this.$("#dateOfBirth").val(),
                lastSaved: new Date()
            };

            if (this.$("#gender_male").is(":checked")) {
                attr.gender = "Male";
            }
            else if (this.$("#gender_female").is(":checked")) {
                attr.gender = "Female";
            }

            var that = this;

            this.model.save(attr, {
                success: function() {
                    that.completed = true;
                    that._setCurrentState(that.states.summary);
                    that.rightSideBar = new RightSideBarView({ model: that.model });
                },
                error: function() {
                    alert("Something went horribly wrong.");
                }
            });
        },

        cancel: function() {
            this._setCurrentState(this.completed ? this.states.summary : this.states.thumbnailed);
        },

        edit: function() {
            this._setCurrentState(this.states.details);
        }
    });

    return EmployeeInformationView;
});
