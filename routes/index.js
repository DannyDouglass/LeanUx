 exports.index = function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to LeanUx API!\n');
};
