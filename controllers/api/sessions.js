var User = require('../../models/user');
var router = require('express').Router();
var jwt = require('jwt-simple');
var bcrypt = require('bcryptjs');
var config = require('../../config.js');

router.post('/', function (req, res, next) {

  var user = User.findOne({ username: req.body.username })
  .select({username: 1, password: 1})
  .exec(function (err, user) {

    if (!err && user) {
      
      bcrypt.compare(req.body.password, user.password, function (err, valid) {
        if (!err  && valid) {
          var token = jwt.encode({ username: user.username }, config.secret);
          return res.send(token);
        }
        return res.status(401).send();
      });

    } else if (!user) {
      return res.status(401).send();
    } else {
      return next(err);
    }
  });

});

module.exports = router;
