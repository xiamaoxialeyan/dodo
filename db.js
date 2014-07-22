var mysql = require('mysql');
var pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'dodo',
    dateStrings: true,
    multipleStatements: true
});

module.exports = {
    escape: function(str) {
        return pool.escape(str);
    },

    escapeId: function(id) {
        return pool.escapeId(id);
    },

    format: function(sql, inserts) {
        return mysql.format(sql, inserts);
    },

    query: function(sql, inserts, cb) {
        typeof inserts === 'function' && (cb = inserts, inserts = null);

        pool.getConnection(function(err, connection) {
            if (err) {
                cb && cb(err);
                return;
            }

            connection.query(sql, inserts, function(err, rows) {
                connection.release();
                cb && cb(err, rows);
            });
        });
    }
}