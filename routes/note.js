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

router.get('/notetype', function(req, res) {
    api.getNoteType(parseInt(req.query.id), res.json.bind(res));
});

router.get('/notegroups', function(req, res) {
    api.getNoteGroups(parseInt(req.query.type), res.json.bind(res));
});

router.get('/notegroup', function(req, res) {
    api.getNoteGroup(parseInt(req.query.id), res.json.bind(res));
});

router.get('/notes', function(req, res) {
    api.getNotes(parseInt(req.query.group), res.json.bind(res));
});

router.get('/note', function(req, res) {
    api.getNote(parseInt(req.query.id), res.json.bind(res));
});

router.post('/notetype', function(req, res) {
    var body = req.body;
    body.id ? api.modifyNoteType(parseInt(body.id), body.name, res.json.bind(res)) : api.addNoteType(body.name, res.json.bind(res));
});

router.post('/notegroup', function(req, res) {
    var body = req.body;
    body.id ? api.modifyNoteGroup(parseInt(body.id), parseInt(body.type), body.name, res.json.bind(res)) : api.addNoteGroup(parseInt(body.type), body.name, res.json.bind(res));
});

router.post('/note', function(req, res) {
    var body = req.body;
    body.id ? api.modifyNote(parseInt(body.id), parseInt(body.group), body.name, body.content, body.signature, res.json.bind(res)) : api.addNote(parseInt(body.group), body.name, body.content, body.signature, res.json.bind(res));
});

router.get('/delnotetype', function(req, res) {
    api.deleteNoteType(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delnotegroup', function(req, res) {
    api.deleteNoteGroup(parseInt(req.query.id), res.json.bind(res));
});

router.get('/clearnotegroup', function(req, res) {
    api.clearNoteGroup(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delnote', function(req, res) {
    api.deleteNote(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delnotes', function(req, res) {
    api.deleteNotes(req.query.ids, res.json.bind(res));
});

router.get('/getrecycles', function(req, res) {
    api.getRecycles(res.json.bind(res));
});

router.get('/getrecycle', function(req, res) {
    api.getRecycle(parseInt(req.query.id), res.json.bind(res));
});

router.get('/recycles', function(req, res) {
    api.recycles(res.json.bind(res));
});

router.get('/recycle', function(req, res) {
    api.recycle(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delrecycle', function(req, res) {
    api.deleteRecycle(parseInt(req.query.id), res.json.bind(res));
});

router.get('/clearrecycles', function(req, res) {
    api.clearRecycles(res.json.bind(res));
});

module.exports = router;