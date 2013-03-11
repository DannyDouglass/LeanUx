var EmployeeProfile = require('../models/employee_profile');

exports.getAll = function(req, res){
  EmployeeProfile.findAll(function(err, employeeProfiles) {
    if (err) throw err;

    res.json(employeeProfiles);
  });
};

exports.getById = function(req, res) {
  EmployeeProfile.findById(req.params.id, function(err, employeeProfile) {
    if (err) res.send(500);
    if (!employeeProfile) res.send(404);

    res.json(employeeProfile);
  });
};

exports.post = function(req, res) {
  /*EmployeeProfile.save(req.body, function(err, employeeProfile) {
    if (err) res.send(500);

    res.json(employeeProfile);
  });*/

  res.json(req.body);
};

exports.put = function(req, res) {
  EmployeeProfile.update(req.params.id, req.body, function(err, employeeProfile) {
    if (err) res.send(500);
    if (!employeeProfile) res.send(404);

    res.json(employeeProfile);
  });
};

exports.remove = function(req, res) {
  EmployeeProfile.remove(req.params.id, function(err, employeeProfile) {
    if (err) res.send(500);
    if (!employeeProfile) res.send(404);

    res.send(200);
  });
};
