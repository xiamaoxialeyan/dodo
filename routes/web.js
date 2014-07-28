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


router.route('/group').get(function(req, res) {
    api.getGroup(parseInt(req.query.id), res.json.bind(res));
}).post(function(req, res) {
    api.addGroup(req.body.name, res.json.bind(res));
}).put(function(req, res) {
    var body = req.body;
    api.modifyGroup(parseInt(body.id), body.name, res.json.bind(res));
}).delete(function(req, res) {
    api.deleteGroup(parseInt(req.body.id), res.json.bind(res));
});


router.route('/sites').get(function(req, res) {
    api.getSites(parseInt(req.query.group), res.json.bind(res));
}).delete(function(req, res) {
    var body = req.body;
    body.group ? api.clearGroup(parseInt(body.group), res.json.bind(res)) : api.deleteSites(body.ids, res.json.bind(res));
});


router.route('/site').get(function(req, res) {
    api.getSite(parseInt(req.query.id), res.json.bind(res));
}).post(function(req, res) {
    var body = req.body;
    api.addSite(parseInt(body.group), body.name, body.url, body.remark, res.json.bind(res));
}).put(function(req, res) {
    var body = req.body;
    api.modifySite(parseInt(body.id), parseInt(body.group), body.name, body.url, body.remark, res.json.bind(res));
}).delete(function(req, res) {
    api.deleteSite(parseInt(req.body.id), res.json.bind(res));
});


module.exports = router;