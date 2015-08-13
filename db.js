var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/socialApp', function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('mongodb connected');  
  }
});

module.exports = mongoose;
