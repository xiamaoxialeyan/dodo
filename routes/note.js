var express = require('express'),
    router = express.Router(),
    api = require('../note/note');

/* note services. */
router.get('/', function(req, res) {
    res.render('note', {
        title: '记事儿 - DoDo'
    });
});

router.get('/notetypes', function(req, res) {
    api.getNoteTypes(function(result) {
        res.json(result);
    });
});

router.get('/notetype', function(req, res) {
    api.getNoteType(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/notegroups', function(req, res) {
    api.getNoteGroups(parseInt(req.query.type), function(result) {
        res.json(result);
    });
});

router.get('/notegroup', function(req, res) {
    api.getNoteGroup(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/notes', function(req, res) {
    api.getNotes(parseInt(req.query.group), function(result) {
        res.json(result);
    });
});

router.get('/note', function(req, res) {
    api.getNote(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.post('/notetype', function(req, res) {
    var body = req.body;
    body.id ? api.modifyNoteType(parseInt(body.id), body.name, function(result) {
        res.json(result);
    }) : api.addNoteType(body.name, function(result) {
        res.json(result);
    });
});

router.post('/notegroup', function(req, res) {
    var body = req.body;
    body.id ? api.modifyNoteGroup(parseInt(body.id), body.name, function(result) {
        res.json(result);
    }) : api.addNoteGroup(parseInt(body.type), body.name, function(result) {
        res.json(result);
    });
});

router.post('/note', function(req, res) {
    var body = req.body;
    body.id ? api.modifyNote(parseInt(body.id), body.name, body.content, body.signature, function(result) {
        res.json(result);
    }) : api.addNote(parseInt(body.group), body.name, body.content, body.signature, function(result) {
        res.json(result);
    });
});

router.get('/delnotetype', function(req, res) {
    api.deleteNoteType(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delnotegroup', function(req, res) {
    api.deleteNoteGroup(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delnote', function(req, res) {
    api.deleteNote(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delnotes', function(req, res) {
    api.deleteNotes(parseInt(req.query.group), function(result) {
        res.json(result);
    });
});

router.get('/getrecycles', function(req, res) {
    api.getRecycles(function(result) {
        res.json(result);
    });
});

router.get('/getrecycle', function(req, res) {
    api.getRecycle(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/recycles', function(req, res) {
    api.recycles(function(result) {
        res.json(result);
    });
});

router.get('/recycle', function(req, res) {
    api.recycle(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delrecycle', function(req, res) {
    api.deleteRecycle(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/clearrecycles', function(req, res) {
    api.clearRecycles(function(result) {
        res.json(result);
    });
});

module.exports = router;