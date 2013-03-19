define(
    ['jquery', 'underscore', 'backbone', 'router', 'collections/newhirescollection', 'views/breadcrumb', 'views/error'], 
    function($, _, Backbone, Router, NewHiresCollection, BreadcrumbView, ErrorView) {

        var initialize = function() {

            LeanUx.newHiresCollection = new NewHiresCollection();
            LeanUx.newHiresCollection.fetch({
                success: function() {
                    LeanUx.router = new Router();
                    LeanUx.breadcrumbView = new BreadcrumbView();

                    Backbone.history.start();
                },
                error: function() {
                    var errorView = new ErrorView();
                }
            });
        };

        return { 
            initialize: initialize
        };
    }
);