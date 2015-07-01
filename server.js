var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

var router = express.Router();

app.use(require('./auth'));
app.use('/api', router);

router.use('/posts', require('./controllers/api/posts'));
router.use('/sessions', require('./controllers/api/sessions'));
router.use('/users', require('./controllers/api/users'));
app.use('', require('./controllers/static'));

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Server', process.pid, 'listening on', port);
});
