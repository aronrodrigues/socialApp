var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/socialApp', function () {
  console.log('mongodb connected');
});

module.exports = mongoose;
