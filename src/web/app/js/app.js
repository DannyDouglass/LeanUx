define(
    ['jquery', 'underscore', 'backbone', 'router', 'collections/newhirescollection', 'views/breadcrumb'], 
    function($, _, Backbone, Router, NewHiresCollection, BreadcrumbView) {

        var initialize = function() {
            LeanUx.router = new Router();
            LeanUx.breadcrumbView = new BreadcrumbView();

            Backbone.history.start();
        };

        return { 
            initialize: initialize
        };
    }
);