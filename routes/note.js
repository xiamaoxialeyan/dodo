var express = require('express'),
    router = express.Router(),
    api = require('../api/note');

/* note services. */
router.get('/', function(req, res) {
    res.render('note', {
        title: '记事儿 - DoDo'
    });
});


router.get('/notetypes', function(req, res) {
    api.getNoteTypes(res.json.bind(res));
});


router.route('/notetype').get(function(req, res) {
    api.getNoteType(parseInt(req.query.id), res.json.bind(res));
}).post(function(req, res) {
    api.addNoteType(req.body.name, res.json.bind(res));
}).put(function(req, res) {
    var body = req.body;
    api.modifyNoteType(parseInt(body.id), body.name, res.json.bind(res))
}).delete(function(req, res) {
    api.deleteNoteType(parseInt(req.body.id), res.json.bind(res));
});


router.get('/notegroups', function(req, res) {
    api.getNoteGroups(parseInt(req.query.type), res.json.bind(res));
});


router.route('/notegroup').get(function(req, res) {
    api.getNoteGroup(parseInt(req.query.id), res.json.bind(res));
}).post(function(req, res) {
    var body = req.body;
    api.addNoteGroup(parseInt(body.type), body.name, res.json.bind(res));
}).put(function(req, res) {
    var body = req.body;
    api.modifyNoteGroup(parseInt(body.id), parseInt(body.type), body.name, res.json.bind(res))
}).delete(function(req, res) {
    api.deleteNoteGroup(parseInt(req.body.id), res.json.bind(res));
});


router.route('/notes').get(function(req, res) {
    api.getNotes(parseInt(req.query.group), res.json.bind(res));
}).delete(function(req, res) {
    var body = req.body;
    body.group ? api.clearNoteGroup(parseInt(body.group), res.json.bind(res)) : api.deleteNotes(req.body.ids, res.json.bind(res));
});


router.route('/note').get(function(req, res) {
    api.getNote(parseInt(req.query.id), res.json.bind(res));
}).post(function(req, res) {
    var body = req.body;
    api.addNote(parseInt(body.group), body.name, body.content, body.signature, res.json.bind(res));
}).put(function(req, res) {
    var body = req.body;
    api.modifyNote(parseInt(body.id), parseInt(body.group), body.name, body.content, body.signature, res.json.bind(res))
}).delete(function(req, res) {
    api.deleteNote(parseInt(req.body.id), res.json.bind(res));
});


router.route('/recycles').get(function(req, res) {
    api.getRecycles(res.json.bind(res));
}).delete(function(req, res) {
    api.deleteRecycles(res.json.bind(res));
});


router.route('/recycle').get(function(req, res) {
    api.getRecycle(parseInt(req.query.id), res.json.bind(res));
}).delete(function(req, res) {
    api.deleteRecycle(parseInt(req.body.id), res.json.bind(res));
});


router.get('/recovers', function(req, res) {
    api.recovers(res.json.bind(res));
});


router.get('/recover', function(req, res) {
    api.recover(parseInt(req.query.id), res.json.bind(res));
});


module.exports = router;