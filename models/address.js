var db = require('../lib/db');

var AddressSchema = new db.Schema({
  city    : { type: String },
  state   : { type: String },
  zipcode : { type: String },
  street1 : { type: String },
  street2 : { type: String }
});

var Address = db.mongoose.model('Address', AddressSchema);

Address.on('error', function(err) {
  // maybe provide more robust error handling in future like writing to logs, etc.
  // a simple write to stdout will suffice for now
  console.error(err);
});

module.exports.find = function(conditions, fields, options, callback) {
  return Address.find(conditions, fields, options, callback);
};

module.exports.findAll = function(callback) {
  Address.find(callback);
};

module.exports.save = function (address, callback) {
  var addressModel = new Address(address);

  addressModel.save(callback);
};
