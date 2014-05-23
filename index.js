// web.js
var express = require("express");
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('hey go ahead and push some github webhooks to /github.');
});

app.use(bodyParser());

app.post('/github', function(request, response){
  console.log(request.body);
  response.send(request.body);
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
