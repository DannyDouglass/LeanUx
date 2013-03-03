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

connect();

function connect() {
  var url = 'mongodb://' + username + ':' + password + address;

  mongoose.connect(url);
}

function disconnect() {
  mongoose.disconnect();
}

function dispose() {
  console.log('attemptin to dispose db connection');
  disconnect();
  console.log('successfully disposed db connection.');
}

process.on('SIGINT', function() {
  dispose();
  process.exit();
});
