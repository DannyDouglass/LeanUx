define(["backbone"], function(Backbone) {

    var Four01kOptions = Backbone.Model.extend({
        url: function() {
            return "/newhire/employeeprofiles/" + this.id + "/401k";
        }
    });

    return Four01kOptions;
});
