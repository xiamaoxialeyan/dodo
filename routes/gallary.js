var express = require('express'),
    router = express.Router(),
    api = require('../api/gallary');

/* gallary services. */
router.get('/', function(req, res) {
    res.render('gallary', {
        title: '画廊之界 - DoDo'
    });
});

router.post('/upload', function(req, res) {
    api.upload(req, function(result) {
        res.json(result);
    });
});

router.get('/gallarys', function(req, res) {
    api.getGallarys(function(result) {
        res.json(result);
    });
});

router.get('/gallary', function(req, res) {
    api.getGallary(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/photos', function(req, res) {
    api.getPhotos(parseInt(req.query.gallary), function(result) {
        res.json(result);
    });
});

router.get('/photo', function(req, res) {
    api.getPhoto(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.post('/gallary', function(req, res) {
    var body = req.body;
    body.id ? api.modifyGallary(parseInt(body.id), body.name, body.desc, body.cover, body.supports, function(result) {
        res.json(result);
    }) : api.addGallary(body.name, body.desc, body.cover, body.supports, function(result) {
        res.json(result);
    });
});

router.post('/photo', function(req, res) {
    var body = req.body;
    body.id ? api.modifyGallary(parseInt(body.id), parseInt(body.gallary), body.name, body.desc, body.path, body.supports, function(result) {
        res.json(result);
    }) : api.addGallary(parseInt(body.gallary), body.name, body.desc, body.path, body.supports, function(result) {
        res.json(result);
    });
});

router.get('/delgallary', function(req, res) {
    api.deleteGallary(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/cleargallary', function(req, res) {
    api.clearGallary(parseInt(req.quey.id), function(result) {
        res.json(result);
    });
});

router.get('/delphoto', function(req, res) {
    api.deletePhoto(parseInt(req.query.id), function(result) {
        res.json(result);
    });
});

router.get('/delphotos', function(req, res) {
    api.deletePhotos(req.query.ids, function(result) {
        res.json(result);
    });
});

module.exports = router;