var EmployeeProfile = require('../models/employee_profile');

exports.get = function(req, res) {

    EmployeeProfile.findById(req.params.id, function(err, employeeProfile) {
        if (err) res.send(500);
        if (!employeeProfile) res.send(404);

        res.json(employeeProfile.benefitOptions.four01k);
      });
};

exports.put = function(req, res) {

    EmployeeProfile.findById(req.params.id, function(err, employeeProfile) {
        if (err) res.send(500);
        if (!employeeProfile) res.send(404);

        var options = { employeePercentage: req.body.employeePercentage , companyPercentage: req.body.companyPercentage };

        if (!employeeProfile.benefitOptions) {
            employeeProfile.benefitOptions = {};
        }
        employeeProfile.benefitOptions.four01k = options;
        employeeProfile.save(function(err, employeeProfile) {
            if (err) res.send(500);

            res.json(employeeProfile.benefitOptions.four01k);
        });
    })
};