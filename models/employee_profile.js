var db = require('../lib/db');
var _ = require('underscore');

var EmployeeProfileSchema = new db.Schema({
  socialSecurityNumber : { type : String } ,
  dateOfHire           : { type : Date   } ,
  salutation           : { type : String } ,
  firstName            : { type : String } ,
  middleName           : { type : String } ,
  lastName             : { type : String } ,
  suffix               : { type : String } ,
  maritalStatus        : { type : String } ,
  dateOfBirth          : { type : Date   } ,
  status               : { type : String } ,
  statusLocation       : { type : String } , 
  benefitOptions       : { four01k : {
                              employeePercentage : { type: Number  },
                              companyPercentage : { type: Number  }
                            }
                          }   
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

module.exports.findById = function(id, callback) {
  EmployeeProfile.findById(id, callback);
};

module.exports.save = function(employeeProfile, callback) {
  var sanitizedEmployeeProfile = sanitizeClientModel(employeeProfile);
  var employeeProfileModel = new EmployeeProfile(sanitizedEmployeeProfile);

  employeeProfileModel.save(callback);
};

module.exports.update = function(id, employeeProfile, callback) {
  /* we could call model.findByIdAndUpdate, which is syntactically
   * sweeter, except if we had any validations, middleware, defaults,
   * or setters, the would not get executed. don't want to get spoiled
   * with the sugar when in reality, we'd most likely want to validate
   * an object before it gets updated. model.findByIdAndUpdate basically
   * means you trust the client.
   */
  EmployeeProfile.findById(id, function(err, employeeProfileModel) {
    if (err)
      callback(err, null);
    if (!employeeProfileModel)
      callback(null, null);

    var sanitizedEmployeeProfile = sanitizeClientModel(employeeProfile);
    var updatedEmployeeProfile = _.extend(employeeProfileModel, sanitizedEmployeeProfile);

    updatedEmployeeProfile.save(callback);
  });
};

// would like to use delete, but it's a reserved keyword so using remove instead
module.exports.remove = function(id, callback) {
  EmployeeProfile.findByIdAndRemove(id, callback);
};

// white-list expected incoming attributes to prevent mass assignment.
function sanitizeClientModel(model) {
  var sanitizedClientModel = _.pick(model, 'socialSecurityNumber', 'dateOfHire', 'salutation',
  'firstName', 'middleName', 'lastName', 'suffix', 'maritalStatus', 'dateOfBirth',
  'status', 'statusLocation');

  return sanitizedClientModel;
}
