// web.js
var express = require("express");
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var app = express();
var payload = {};

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var output = '';
  if( "repository" in payload ){
    output += '<span>update to <em>' + payload.repository.url + '</em></span>';
    output += '<span>latest push by <em>'+payload.pusher.name+'</em></span>';
  }
  else{
    output += '<span>nothing to report. push some github webhooks to /github</span>';
  }
  res.send( output );
  //res.send('latest push by <span><em>'+payload.pusher.name+'</em></span>');
  //res.send('hey go ahead and push some github webhooks to /github.');
});

app.use(bodyParser());

app.post('/github', function(request, response){
  payload = request.body;
  console.log(request.body);
  response.send(request.body);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
