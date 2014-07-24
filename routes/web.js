var express = require('express'),
    router = express.Router(),
    api = require('../api/web');

/* web services. */
router.get('/', function(req, res) {
    res.redirect('/');
});

router.get('/groups', function(req, res) {
    api.getGroups(function(result) {
        res.json(result);
    });
});

router.get('/group', function(req, res) {
    api.getGroup(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/sites', function(req, res) {
    api.getSites(parseInt(req.query.group), function(result) {
        res.json(result);
    });
});

router.get('/site', function(req, res) {
    api.getSite(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/siteall', function(req, res) {
    api.getSiteAll(function(result) {
        res.json(result);
    });
});

router.post('/group', function(req, res) {
    var body = req.body;
    body.id ? api.modifyGroup(parseInt(body.id), body.name, function(result) {
        res.json(result);
    }) : api.addGroup(body.name, function(result) {
        res.json(result);
    });
});

router.post('/site', function(req, res) {
    var body = req.body;
    body.id ? api.modifySite(parseInt(body.id), parseInt(body.group), body.name, body.url, body.remark, function(result) {
        res.json(result);
    }) : api.addSite(parseInt(body.group), body.name, body.url, body.remark, function(result) {
        res.json(result);
    });
});

router.get('/delgroup', function(req, res) {
    api.deleteGroup(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/cleargroup', function(req, res) {
    api.clearGroup(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delsite', function(req, res) {
    api.deleteSite(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delsites', function(req, res) {
    api.delSites(req.query.ids, function(result) {
        res.json(result);
    });
});

module.exports = router;