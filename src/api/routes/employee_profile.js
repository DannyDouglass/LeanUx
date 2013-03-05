var EmployeeProfile = require('../models/employee_profile');

exports.findAll = function(req, res){
  EmployeeProfile.findAll(function(err, employeeProfiles) {
    if (err) throw err;

    res.json(employeeProfiles);
  });
};
