// web.js
var fs = require("fs");
var express = require("express");
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var app = express();
var payload = {};

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  var output = '';
  try{
    output += '<span>update to <em>' + payload.repository.url + '</em></span>';
    output += '<span>latest push by <em>'+payload.pusher.name+'</em></span>';
  }
  catch(e){
    output += '<span>nothing to report. push some github webhooks to /github</span>';
  }
  res.send( output );
});

app.use(bodyParser());

app.post('/github', function(request, response){
  payload = request.body;
  fs.writeFile('recent-push.json', JSON.stringify(request.body), function (err) {
    if (err) throw err;
  });
  console.log(request.body);
  response.send(request.body);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  fs.readFile('recent-push.json', {'encoding':'utf8'}, function(err,data){
    payload = data;
    console.log(payload);
  });
  console.log("Listening on " + port);
});

//curl -H "Content-Type: application/json" -d '{"username":"xyz","password":"xyz"}' http://localhost:5000/github
