var express = require('express'),
    router = express.Router(),
    multipart = require('multipart'),
    uploader = require('../upload');


router.post('/upload', multipart({
    uploadDir: './temp',
    multiples: true
}), function(req, res) {
    uploader.upload(req.files['picture'], {
        dir: './uploads/demo/',
        maxSize: 10,
        filters: ['image/*']
    }, res.json.bind(res));
});

module.exports = router;