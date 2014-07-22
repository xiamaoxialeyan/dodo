var express = require('express'),
    router = express.Router(),
    user = require('../users/user');

/* users services. */
router.post('/login', function(req, res) {
    user.login(req, res);
});

router.get('/logout', function(req, res) {
    user.logout(req, res);
});

module.exports = router;