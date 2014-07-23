/******api for web service*******/

var db = require('../db'),
    status = require('../status.json');

var ns = ['分组', '站点'];

function param_error(cb) {
    cb && cb({
        status: status.PARAM_ERROR,
        message: '参数不合法',
        data: null
    });
}

function isExist(result) {
    return result.status !== status.NO_EXIST && Object.keys(result.data).length;
}

function no_exist(id, cb, n) {
    cb && cb({
        status: status.NO_EXIST,
        message: ns[n] + '不存在',
        data: {
            id: id
        }
    });
}

function query_failed(cb, b) {
    cb && cb({
        status: status.FAILED,
        message: '查询' + ns[n] + '失败',
        data: null
    });
}

function query_success(data, cb, n) {
    cb && cb({
        status: status.SUCCESS,
        message: '查询' + ns[n] + '成功',
        data: data
    });
}

function query_result(err, id, data, cb, n) {
    err ? query_failed(cb, n) : (id ? (data.length ? query_success(data[0], cb, n) : no_exist(id, cb, n)) : query_success(data, cb, n));
}

function insert_result(err, result, cb, n) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = '添加' + ns[n] + (err ? '失败' : '成功');
    r.data = err ? null : {
        id: result.insertId
    };
    cb && cb(r);
}

function update_result(err, id, result, cb, n) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = '修改' + ns[n] + ((err || !result.changedRows) ? '失败' : '成功');
    r.data = {
        id: id
    };
    cb && cb(r);
}

function delete_result(err, id, result, cb, n) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = '删除' + ns[n] + ((err || !result.affectedRows) ? '失败' : '成功');
    r.data = {
        id: id
    };
    cb && cb(r);
}

var api = {
    getGroups: function(cb) {
        db.query("select * from web_group", function(err, data) {
            query_result(err, null, data, cb, 0);
        });
    },

    getGroup: function(id, cb) {
        function get() {
            db.query("select * from web_group where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 0);
            });
        }
        id ? get() : param_error(cb);
    },

    getSites: function(group, cb) {
        function find() {
            api.getGroup(group, function(result) {
                isExist(result) ? get() : no_exist(group, cb, 0);
            });
        }
        group ? find() : param_error(cb);

        function get() {
            db.query("select * from web_site where `group`=?", group, function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        }
    },

    getSite: function(id, cb) {
        function get() {
            db.query("select * from web_site where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        }
        id ? get() : param_error(cb);
    },

    getSiteAll: function(cb) {
        db.query("select * from web_site", function(err, data) {
            query_result(err, null, data, cb, 1);
        });
    },

    addGroup: function(name, cb) {
        function insert() {
            db.query("insert into web_group set `name`=?,`ctime`=now()", name, function(err, result) {
                insert_result(err, result, cb, 0);
            });
        }
        name ? insert() : param_error(cb);
    },

    addSite: function(group, name, url, remark, cb) {
        function find() {
            api.getGroup(group, function(result) {
                isExist(result) ? insert() : no_exist(group, cb, 0);
            });
        }
        group && name ? find() : param_error(cb);

        function insert() {
            db.query("insert into web_site set `group`=?,`name`=?,`url`=?,`remark`=?,ctime=now()", [group, name, url, remark], function(err, result) {
                insert_result(err, result, cb, 1);
            });
        }
    },

    modifyGroup: function(id, name, cb) {
        function find() {
            api.getGroup(id, function(result) {
                isExist(result) ? update() : no_exist(id, cb, 0);
            });
        }
        id && name ? find() : param_error(cb);

        function update() {
            db.query("update web_group set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb, 0);
            });
        }
    },

    modifySite: function(id, name, url, remark, cb) {
        function find() {
            api.getSite(id, function(result) {
                isExist(result) ? update() : no_exist(id, cb, 1);
            });
        }
        id && (name === undefined || url === undefined || remark === undefined) ? find() : param_error(cb);

        function update() {
            var settings = {};
            name !== undefined && (settings['name'] = name);
            url !== undefined && (settings['url'] = url);
            remark !== undefined && (settings['remark'] = remark);

            db.query("update web_site set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 1);
            });
        }
    },

    deleteGroup: function(id, cb) {
        function find() {
            api.getGroup(id, function(result) {
                isExist(result) ? del() : no_exist(id, cb, 0);
            });
        }
        id ? find() : param_error(cb);

        function del() {
            db.query("delete from web_group where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 0);
            });
        }
    },

    deleteSite: function(id, cb) {
        function find() {
            api.getSite(id, function(result) {
                isExist(result) ? del() : no_exist(id, cb, 1);
            });
        }
        id ? find() : param_error(cb);

        function del() {
            db.query("delete from web_site where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        }
    },

    deleteSites: function(group, cb) {
        function find() {
            api.getGroup(group, function(result) {
                isExist(result) ? clear() : no_exist(group, cb, 0);
            });
        }
        group ? find() : param_error(cb);

        function clear() {
            db.query("delete from web_site where ??=?", ['group', group], function(err, result) {
                delete_result(err, group, result, cb, 1);
            });
        }
    }
}

module.exports = api;