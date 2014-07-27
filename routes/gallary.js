var express = require('express'),
    router = express.Router(),
    multipart = require('multipart'),
    api = require('../api/gallary');

/* gallary services. */
router.get('/', function(req, res) {
    res.render('gallary', {
        title: '画廊之界 - DoDo'
    });
});

router.get('/upload', function(req, res) {
    res.render('upload');
});

router.post('/upload', multipart({
    uploadDir: './temp'
}), function(req, res) {
    api.upload(req.body.gallary, req.files['photo'], res.json.bind(res));
});

router.post('/uploads', multipart({
    uploadDir: './temp',
    multiples: true
}), function(req, res) {
    api.upload(req.body.gallary, req.files['photo[]'], res.json.bind(res));
});

router.get('/gallarys', function(req, res) {
    api.getGallarys(res.json.bind(res));
});

router.get('/gallary', function(req, res) {
    api.getGallary(parseInt(req.query.id), res.json.bind(res));
});

router.get('/photos', function(req, res) {
    api.getPhotos(parseInt(req.query.gallary), res.json.bind(res));
});

router.get('/photo', function(req, res) {
    api.getPhoto(parseInt(req.query.id), res.json.bind(res));
});

router.post('/gallary', function(req, res) {
    var body = req.body;
    body.id ? api.modifyGallary(parseInt(body.id), body.name, body.desc, body.cover, body.supports, res.json.bind(res)) : api.addGallary(body.name, body.desc, res.json.bind(res));
});

router.post('/photo', function(req, res) {
    var body = req.body;
    body.id ? api.modifyPhoto(parseInt(body.id), parseInt(body.gallary), body.name, body.desc, body.supports, res.json.bind(res)) : api.addPhoto(parseInt(body.gallary), body.name, body.desc, body.path, res.json.bind(res));
});

router.get('/delgallary', function(req, res) {
    api.deleteGallary(parseInt(req.query.id), res.json.bind(res));
});

router.get('/cleargallary', function(req, res) {
    api.clearGallary(parseInt(req.quey.id), res.json.bind(res));
});

router.get('/delphoto', function(req, res) {
    api.deletePhoto(parseInt(req.query.id), res.json.bind(res));
});

router.get('/delphotos', function(req, res) {
    api.deletePhotos(req.query.ids, res.json.bind(res));
});

router.use(function(err, req, res, next) {
    if (err.upload) {
        res.json({
            message: '上传文件失败',
            path: null
        });
        return;
    }
    next(err);
});

module.exports = router;