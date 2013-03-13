var EmployeeProfile = require('../models/employee_profile');

exports.getAll = function(req, res){
  EmployeeProfile.findAll(function(err, employeeProfiles) {
    if (err) throw err;

    //todo - figure out how to flatten collection

    res.json(employeeProfiles);
  });
};

exports.getById = function(req, res) {
  EmployeeProfile.findById(req.params.id, function(err, employeeProfile) {
    if (err) res.send(500);
    if (!employeeProfile) res.send(404);
    
    res.json(flattenEmployeeProfile(employeeProfile));
  });
};

exports.post = function(req, res) {
  EmployeeProfile.save(req.body, function(err, employeeProfile) {
    if (err) res.send(500);

    res.json(flattenEmployeeProfile(employeeProfile));
  });
};

exports.put = function(req, res) {
  EmployeeProfile.update(req.params.id, req.body, function(err, employeeProfile) {
    if (err) res.send(500);
    if (!employeeProfile) res.send(404);

    res.json(flattenEmployeeProfile(employeeProfile));
  });
};

exports.remove = function(req, res) {
  EmployeeProfile.remove(req.params.id, function(err, employeeProfile) {
    if (err) res.send(500);
    if (!employeeProfile) res.send(404);

    res.send(200);
  });
};

var flattenEmployeeProfile = function(employeeProfile){
  return flattenObject(employeeProfile.toJSON());
};

var flattenObject = function(ob) {
  var toReturn = {};
  
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    
    if ((typeof ob[i]) == 'object' && String(i) != '_id' ) {
      var flatObject = flattenObject(ob[i]);
      for (var x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};