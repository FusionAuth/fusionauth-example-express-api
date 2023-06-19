var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/messages', function(req, res, next) {
  res.send({messages: ['Hello']});
});

module.exports = router;
