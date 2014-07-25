var express = require('express'),
    router = express.Router(),
    api = require('../api/web');

/* web services. */
router.get('/', function(req, res) {
    res.redirect('/');
});

router.get('/groups', function(req, res) {
    api.getGroups(res.json.bind(res));
});

router.get('/group', function(req, res) {
    api.getGroup(parseInt(req.query.id), res.json.bind(res));
});

router.get('/sites', function(req, res) {
    api.getSites(parseInt(req.query.group), res.json.bind(res));
});

router.get('/site', function(req, res) {
    api.getSite(parseInt(req.query.id), res.json.bind(res));
});

router.post('/group', function(req, res) {
    var body = req.body;
    body.id ? api.modifyGroup(parseInt(body.id), body.name, res.json.bind(res)) : api.addGroup(body.name, res.json.bind(res));
});

router.post('/site', function(req, res) {
    var body = req.body;
    body.id ? api.modifySite(parseInt(body.id), parseInt(body.group), body.name, body.url, body.remark, res.json.bind(res)) : api.addSite(parseInt(body.group), body.name, body.url, body.remark, res.json.bind(res));
});

router.get('/delgroup', function(req, res) {
    api.deleteGroup(parseInt(req.query.id), res.json.bind(res));
});

router.get('/cleargroup', function(req, res) {
    api.clearGroup(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delsite', function(req, res) {
    api.deleteSite(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delsites', function(req, res) {
    api.deleteSites(req.query.ids, res.json.bind(res));
});

module.exports = router;