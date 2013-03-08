require.config({
  paths: {
    "jquery" : "../lib/jquery/jquery.min",
    "bootstrap" : "../lib-local/bootstrap/js/bootstrap.min",
    "underscore" : "../lib/underscore-amd/underscore-min",
    "backbone" : "../lib/backbone-amd/backbone-min"
  },
  shim: { 
  	"bootstrap" : {
  		deps: ["jquery"],
  		exports: "$.fn.dropdown"
  	}
  }
});

require(['jquery', 'bootstrap', 'underscore', 'backbone', 'app'], function($, Bootstrap, _, Backbone, App)
{ 
    App.initialize(); 
});

LeanUx = {};