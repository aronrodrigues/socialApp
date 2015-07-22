var User = require('../../models/user');
var router = require('express').Router();
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var config = require('../../config.js');

router.post('/', function (req, res, next) {
  var user = new User({ username: req.body.username});
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) { throw next(err); }
    user.password = hash;
    user.save(function (err) {
      if (err) { return next(err); }
      return res.status(201).send();
    });
    
  });
});

router.get('/', function (req, res) {

  if (!req.headers['x-auth']) {
    return res.status(401).send();
  }
  var auth = jwt.decode(req.headers['x-auth'], config.secret);
  var user = User.findOne({ username: auth.username }, function (err, user) {

    if (!err && user) {
      return res.jsonp(user);
    } else {
      return res.status(401).send();
    }
  });

});

module.exports = router;
