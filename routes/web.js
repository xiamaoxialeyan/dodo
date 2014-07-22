var express = require('express'),
    router = express.Router(),
    groups = require('../web/groups'),
    sites = require('../web/sites');

/* web services. */
router.get('/getgroups', function(req, res) {
    groups.getGroups(req, res);
});

router.get('/getGroup', function(req, res) {
    groups.getGroup(req, res);
});

router.get('/getsites', function(req, res) {
    sites.getSites(req, res);
});

router.get('/getsite', function(req, res) {
    sites.getSite(req, res);
});

module.exports = router;