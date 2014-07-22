var pool = require('../db'),
    statusCode = require('../status');

module.exports = {
    getGroups: function(req, res) {
        pool.getConnection(function(err, connection) {
            if (err) {
                res.json([]);
                return;
            }

            connection.query("select * from myweb.webgroup_trial", function(err, rows) {
                if (err) {
                    res.json([]);
                    return;
                }

                res.json(rows);
                connection.release();
            });
        });
    },

    getGroup: function(req, res) {
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

            connection.query("select * from myweb.webgroup_trial where id=" + id, function(err, rows) {
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