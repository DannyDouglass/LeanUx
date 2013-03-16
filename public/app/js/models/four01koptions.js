define(["backbone"], function(Backbone) {

    var Four01kOptions = Backbone.Model.extend({
        defaults: {
            companyPercentage: 0,
            employeePercentage: 0
        },

        url: function() {
            return "/newhire/employeeprofiles/" + this.id + "/401k";
        }
    });

    return Four01kOptions;
});