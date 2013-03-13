require.config({
  nodeRequire: require,
  paths: {
    "jquery" : "../lib/jquery/jquery.min",
    "bootstrap" : "../lib-local/bootstrap/js/bootstrap.min",
    "underscore" : "../lib/underscore-amd/underscore-min",
    "backbone" : "../lib/backbone-amd/backbone-min",
    "marionette": "../lib/backbone.marionette/lib/backbone.marionette.min",
    "backbone.babysitter": "../lib/backbone.babysitter/lib/backbone.babysitter",
    "backbone.wreqr": "../lib/backbone.wreqr/lib/backbone.wreqr",
    "text": "../lib/requirejs-text/text"
  },
  shim: { 
  	"bootstrap" : {
  		deps: ["jquery"],
  		exports: "$.fn.dropdown"
  	},
    "marionette": {
      deps: ["jquery", "underscore", "backbone"],
      exports: "Marionette"
    }
  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'app'], function($, Bootstrap, _, Backbone, App)
{ 
    App.initialize();
});

LeanUx = {};