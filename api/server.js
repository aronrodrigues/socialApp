var express = require('express');
var bodyParser = require('body-parser');
var Post = require('./models/Post');
var app = express();

app.use(bodyParser.json());
app.get('/api/posts', function (req, res) {
  Post.find(function (err, posts) {
    if (err) { return next(err) }
    res.jsonp(posts);
  });
});

app.post('/api/posts', function (req, res, next) {
  console.log('post received');
  var post = new Post({
    username: req.body.username,
    body: req.body.body
  });

  post.save(function (err, post) {
    if (err) { return next(err); }
    res.status(201).jsonp(post);
  });
  
});

app.listen(3000, function () {
  console.log('Server listening on', 3000);
});
