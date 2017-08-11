var express = require('express');
var router = express.Router();
var constants = require('../constants');
var fs = require('fs');
var path = require('path');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'samples' }); //back to home page
});

router.get('/:key', function (req, res, next) {
  let route = constants.SAMPLE_ROUTES.find(r => r.key === req.params.key);
  res.render('samples/index', {
    title: route.title,
    key: route.key,
    partialPath: 'samples/' + route.key,
    sourceCode: fs.readFileSync(path.join('./', 'public', 'scripts', 'samples', route.key + '.js'), 'utf8')
  });
});

module.exports = router;
