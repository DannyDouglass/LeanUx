var db = require("../lib/db");

var Four01kPlanSchema = new db.Schema({
    name: { type: String },
    employerSharingRate: { type: Number },
    employerSharingMinimum: { type: Number }
});

var Four01kPlan = db.mongoose.model("401kPlan", Four01kPlanSchema);

Four01kPlan.on("error", function(err) {
    console.error(err);
});

module.exports.findAll = function(callback) {
    Four01kPlan.find(callback);
};