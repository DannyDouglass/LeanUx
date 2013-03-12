var Address = require('../models/address');

exports.findAll = function(req, res){
  Address.findAll(function(err, addresses) {
    if (err) throw err;

    res.json(addresses);
  });
};
