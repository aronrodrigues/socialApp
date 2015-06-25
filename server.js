var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());

var router = express.Router();

app.use('/api', router);

router.use('/posts', require('./controllers/api/posts'));

app.use('', require('./controllers/static'));
//app.get('/', express.static(__dirname + '/web/'));

app.listen(3000, function () {
  console.log('Server listening on', 3000);
});
