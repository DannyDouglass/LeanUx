define(
    ["jquery", "underscore", "backbone", "marionette"],
    function($, _, Backbone, Marionette) {

        var EmployeeInformationView = Backbone.Marionette.ItemView.extend({
            template: "#employee_information"
        });

        return EmployeeInformationView;
    }
);