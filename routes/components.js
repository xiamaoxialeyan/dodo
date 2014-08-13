var express = require('express'),
    router = express.Router();

router.get('/:name', function(req, res) {
    console.log(req.params);
    res.set('Content-Type', req.get('Content-Type') || 'text/html');
    res.sendfile('static/components/' + req.params.name);
});

module.exports = router;