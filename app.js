var express = require('express'),
  routes = require('./routes'),
  address = require('./routes/address'),
  Four01kplan = require("./routes/Four01kplan"),
  employeeProfile = require('./routes/employee_profile'),
  four01k = require("./routes/401k"),
  http = require('http'),
  path = require('path'),
  db = require('./lib/db');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.bodyParser());
  app.use(express.compress());
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/index', routes.index);

app.get('/addresses', address.findAll);

app.get("/401kplans", Four01kplan.findAll);

app.get('/newhire/employeeprofiles', employeeProfile.getAll);
app.get('/newhire/employeeprofiles/:id', employeeProfile.getById);
app.post('/newhire/employeeprofiles', employeeProfile.post);
app.put('/newhire/employeeprofiles/:id', employeeProfile.put);
app.del('/newhire/employeeprofiles/:id', employeeProfile.remove);

app.get("/newhire/employeeprofiles/:id/401k", four01k.get);
app.put("/newhire/employeeprofiles/:id/401k", four01k.put);

db.connect();

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});


process.on('SIGINT', function() {
  db.disconnect();
  process.exit();
});