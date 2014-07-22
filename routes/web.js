var express = require('express'),
    router = express.Router(),
    groups = require('../web/groups'),
    sites = require('../web/sites');

/* data service. */
router.get('/getgroups', function(req, res) {
    groups.getGroups(req, res);
});

router.get('/getsites', function(req, res) {
    res.json(sites.getSites());
});

module.exports = router;