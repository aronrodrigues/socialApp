var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

app.use(require('./auth'));
app.use('/api', router);

router.use('/posts', require('./controllers/api/posts'));
router.use('/sessions', require('./controllers/api/sessions'));
router.use('/users', require('./controllers/api/users'));

app.use('', require('./controllers/static'));
//app.get('/', express.static(__dirname + '/web/'));

app.listen(3000, function () {
  console.log('Server listening on', 3000);
});
