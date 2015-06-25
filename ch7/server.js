var express = require('express');
var jwt = require('jwt-simple');
var app = express();
var _ = require('lodash');
var bcrypt = require('bcryptjs');
var User = require('./user');

app.use(require('body-parser').json());


var secretKey = 'supersecretkey';
var users = [
  { username: 'dickeyxxxx', password: '$2a$10$RCUm8IgBBuY61Qrn1vIeMe.5WF42KqP9elKh6rHoFAGF0HAh.O6le' }, 
];

function findByUsername(username) {
  return User.find({ username: username })
}

function validateUser(user, password, cb) {
  return bcrypt.compare(password, user.password, cb);
}

app.post('/session', function (req, res, next) {

  var user = User.findOne({ username: req.body.username })
  .select({username: 1, password: 1})
  .exec(function (err, user) {

    if (!err && user) {
      
      validateUser(user, req.body.password, function (err, valid) {
        if (!err  && valid) {
          var token = jwt.encode({ username: user.username }, secretKey);
          return res.jsonp(token);
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
app.post('/user', function (req, res, next) {
  var user = new User({ username: req.body.username});
  bcrypt.hash(req.body.password, 10, function (err, hash) {
    if (err) { throw next(err); }
    user.password = hash;
    user.save(function (err) {
      if (err) { return next(err); }
      return res.status(201).send();
    })
    
  });
});

app.get('/user', function (req, res) {

  var token = req.headers['x-auth'];
  var auth = jwt.decode(token, secretKey);
  var user = User.findOne({ username: auth.username }, function (err, user) {

    if (!err && user) {
      return res.jsonp(user);
    } else {
      return res.status(401).send();
    }
  });

});

app.listen(3000);