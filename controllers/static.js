var express = require('express');
var router = express.Router();

router.use(express.static(__dirname + '/../web/'));

module.exports = router;
