define(
    ['jquery', 'underscore', 'backbone', 'router', 'collections/newhirescollection', 'views/breadcrumb'], 
    function($, _, Backbone, Router, NewHiresCollection, BreadcrumbView) {

        var initialize = function() {
            LeanUx.router = new Router();
            Backbone.history.start();
            
            LeanUx.breadcrumbView = new BreadcrumbView();
        };

        return { 
            initialize: initialize
        };
    }
);