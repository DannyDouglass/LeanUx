define(['jquery', 'underscore', 'backbone', 'router', 'collections/newhirescollection'], function($, _, Backbone, Router, NewHiresCollection){

  var initialize = function() {

    LeanUx.router = new Router();
  };

  return { initialize: initialize };

});