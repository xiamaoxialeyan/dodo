var pool = require('../db'),
    statusCode = require('../status'),
    crypto = require('crypto');

module.exports = {
    check: function(req) {
        var sess = req.session;
        return sess && !!sess.uid;
    },

    login: function(req, res) {
        var params = req.body,
            sess = req.session;

        if (params.name && params.pwd && params.captha) {
            if (!sess.captha) {
                res.json({
                    status: statusCode.CAPTCHA_EXPIRE
                });
                return;
            }

            if (params.captha.toLowerCase() != sess.captha.toLowerCase()) {
                res.json({
                    status: statusCode.CAPTCHA_ERROR
                });
                return;
            }

            var name = pool.escape(params.name).trim(),
                pwd = pool.escape(params.pwd).trim();

            pool.getConnection(function(err, connection) {
                if (err) {
                    res.json({
                        status: statusCode.DATABASE_ERROR
                    });
                    return;
                }

                connection.query("select uid,name,pwd,actived from myweb.user where name=" + name + " or email=" + name, function(err, rows) {
                    if (err) {
                        res.json({
                            status: statusCode.USER_NO_EXIST
                        });
                        return;
                    }

                    var row = rows[0];

                    var md5 = crypto.createHash('md5');
                    md5.update(pwd);
                    pwd = md5.digest('hex');

                    if (row.pwd != $pwd) {
                        res.json({
                            status: statusCode.PASSWORD_ERROR
                        });
                        return;
                    }

                    if (row.actived == 0) {
                        res.json({
                            status: statusCode.NOT_ACTIVE
                        });
                        return;
                    }

                    var uid = row.uid;
                    pool.getConnection(function(err, con) {
                        err || con.query("update myweb.user set login_lasttime=now(),login_count=login_count+1 where uid=" + uid);
                    });

                    sess.uid = uid;
                    sess.username = row.name;
                    sess.rmbUser = params.rmb !== undefined ? params.rmb : 1; // 记住帐号，默认记住
                    sess.autoLogin = params.auto !== undefined ? params.auto : 1; // 下次自动登录，默认自动登录

                    var md5 = crypto.createHash('md5');
                    md5.update(uid);

                    sess.autoLogin && (sess.cookie.uid = md5.digest('hex'));
                    sess.rmbUser && (sess.cookie.username = row.name, sess.cookie.expires = new Date(Date.now() + 315360000));

                    sess.captcha = ''; //登录成功后清除验证码

                    res.json({
                        status: statusCode.SUCCESS
                    });

                    connection.release();
                });
            });
            return;
        }
        res.json({
            status: statusCode.PARAM_ERROR
        });
    },

    logout: function(req, res) {
        req.session.uid = '';
        res.redirect('/');
    }
}