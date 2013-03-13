var Four01kPlan = require("../models/Four01kplan");

exports.findAll = function(req, res) {

    Four01kPlan.findAll(function(err, plans) {

        if (err) {
            throw err;
        }

        res.json(plans);
    });
};