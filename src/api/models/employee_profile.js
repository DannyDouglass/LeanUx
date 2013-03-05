var db = require('../lib/db');

var EmployeeProfileSchema = new db.Schema({
  socialSeurityNumber : { type : String } ,
  dateOfHire          : { type : Date   } ,
  salutation          : { type : String } ,
  firstName           : { type : String } ,
  middleName          : { type : String } ,
  lastName            : { type : String } ,
  suffix              : { type : String } ,
  maritalStatus       : { type : String } ,
  dateOfBirth         : { type : Date   }
});

var EmployeeProfile = db.mongoose.model('EmployeeProfile', EmployeeProfileSchema);

EmployeeProfile.on('error', function(err) {
  // maybe provide more robust error handling in future like writing to logs, etc.
  // a simple write to stdout will suffice for now
  console.error(err);
});

module.exports.findAll = function(callback) {
  EmployeeProfile.find(callback);
};
