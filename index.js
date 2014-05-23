// web.js
var express = require("express");
var logfmt = require("logfmt");
var bodyParser = require('body-parser');
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {
  res.send('Hello World!?');
  console.log('someone connected');
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
