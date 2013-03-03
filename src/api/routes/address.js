var Address = require('../models/address');

exports.list = function(req, res){
  Address.find(function(err, addresses) {
    if (err) throw err;

    res.json(addresses);
  });
};
