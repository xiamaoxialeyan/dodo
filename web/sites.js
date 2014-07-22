var pool = require('../db'),
    statusCode = require('../status');

module.exports = {
    getSites: function(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) {
                res.json([]);
                return;
            }

            var gid = parseInt(req.query.gid);
            connection.query("select * from myweb.website_trial" + (!isNaN(gid) && (' where gid=' + gid) || ''), function(err, rows) {
                if (err) {
                    res.json([]);
                    return;
                }

                res.json(rows);
                connection.release();
            });
        });
    },

    getSite: function(req, res) {
        var id = parseInt(req.query.id);
        if (isNaN(id)) {
            res.json({
                status: statusCode.PARAM_ERROR
            });
            return;
        }

        pool.getConnection(function(err, connection) {
            if (err) {
                res.json({
                    status: statusCode.DATABASE_ERROR
                });
                return;
            }

            connection.query("select * from myweb.website_trial where id=" + id, function(err, rows) {
                if (err || !rows.length) {
                    res.json({
                        status: statusCode.NO_EXIST
                    });
                }

                res.json(rows[0]);
                connection.release();
            });
        });
    }
}