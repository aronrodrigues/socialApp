var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(require('./controllers'));

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server', process.pid, 'listening on', port);
});
