const express = require('express');
const router = express.Router();
const constants = require('../constants');
const fs = require('fs');
const path = require('path');
const hljs = require('../../node_modules/highlight.js/lib/highlight')
hljs.registerLanguage('xml', require('../../node_modules/highlight.js/lib/languages/xml'))

const getRouteInfo = key => {
  let route = constants.SAMPLE_ROUTES.find(r => r.key === key);
  let routes = constants.SAMPLE_ROUTES.map(r => ({
    ...r,
    isActive: r.key === key
  }))
  let rawHtml = fs.readFileSync(path.join('./', 'views', 'samples', route.key + '.html'), 'utf8')
  let html = hljs.highlight('xml', rawHtml).value
  
  return {
    title: route.title,
    key: route.key,
    partialPath: 'samples/' + route.key,
    html,
    sourceCode: fs.readFileSync(path.join('./', 'public', 'scripts', 'samples', route.key + '.js'), 'utf8'),
    routes
  }
}

router.get('/', function (req, res, next) {
  res.render('samples/index', getRouteInfo('autoComplete'));
});

router.get('/:key', function (req, res, next) {
  res.render('samples/index', getRouteInfo(req.params.key));
});

module.exports = router;
