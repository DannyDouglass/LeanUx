require.config({
  paths: {
    "jquery" : "../lib/jquery/jquery",
    "bootstrap" : "../lib-local/bootstrap-amd/main",
    "underscore" : "../lib/lodash/dist/lodash",
    "backbone" : "../lib/backbone-amd/backbone-min",
    "marionette": "../lib/backbone.marionette/lib/core/amd/backbone.marionette",
    "backbone.babysitter": "../lib/backbone.babysitter/lib/amd/backbone.babysitter",
    "backbone.wreqr": "../lib/backbone.wreqr/lib/amd/backbone.wreqr",
    "text": "../lib/requirejs-text/text",
    "tpl": "../lib/requirejs-tpl/tpl",
    "templates": "templates"
  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'app'], function($, Bootstrap, _, Backbone, App)
{ 
    App.initialize();
});

LeanUx = {};