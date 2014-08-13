var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', home);
router.get('/index', home);
router.get('/home', home);

function home(req, res) {
    res.render('index', {
        title: 'Home - DoDo'
    });
}

router.get('/error', function(req, res) {
    res.render('error', {
        title: 'Error - DoDo',
        message: '错误页',
        error: {}
    });
});

router.get('/api', function(req, res) {
    res.render('api', {
        title: 'API Debug - DoDo'
    });
});
router.get('/editor', function(req, res) {
    res.render('editor');
});

module.exports = router;