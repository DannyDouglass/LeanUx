var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var connection = mongoose.connection;

module.exports.mongoose = mongoose;
module.exports.Schema = Schema;

var username = "leanux";
var password = "leanux8!";
var address = '@ds051437.mongolab.com:51437/leanux';

connection.on('error', console.error.bind(console, 'connection error:'));

connection.on('open', function() {
  console.log('Successfully established connection to leanux database.');
});

module.exports.connect = function() {
  var url = 'mongodb://' + username + ':' + password + address;

  mongoose.connect(url);
};

module.exports.disconnect = function() {
  mongoose.disconnect();
};

function dispose() {
  console.log('disposing db connection');
  disconnect();
  console.log('successfully disposed db connection.');
}
