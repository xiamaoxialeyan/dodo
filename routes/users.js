var express = require('express'),
    router = express.Router(),
    user = require('../users/user');

/* users services. */
router.post('/login', function(req, res) {
    res.send(200, JSON.stringify(user.login(req.body)) + '<a href="/users/logout">logout</a>');
});

router.get('/logout', function(req, res) {
    user.logout();
    res.redirect('/');
});

module.exports = router;