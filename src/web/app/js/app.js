define(['jquery', 'underscore', 'backbone', 'router'], function($, _, Backbone, Router){

  var initialize = function() {
    LeanUx.router = new Router();
  };

  return { initialize: initialize };

});