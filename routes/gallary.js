var express = require('express'),
    router = express.Router(),
    api = require('../gallary/gallary');

/* gallary services. */
router.get('/', function(req, res) {
    res.redirect('/');
});

module.exports = router;