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
    r.message = !result.changedRows ? '无修改数据' : ('修改' + ns[n] + (err ? '失败' : '成功'));
    r.data = {
        id: id
    };
    cb && cb(r);
}

function delete_result(err, id, result, cb, n) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = !result.affectedRows ? '无删除数据' : ('删除' + ns[n] + (err ? '失败' : '成功'));
    r.data = {
        id: id
    };
    cb && cb(r);
}

function def_group(id, cb) {
    cb && cb({
        status: status.FAILED,
        message: '不能删除默认分组',
        data: {
            id: id
        }
    });
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
        };
        !!id ? get() : param_error(cb);
    },

    findGroup: function(id, fn, cb) {
        this.getGroup(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 0);
        });
    },

    getSites: function(group, cb) {
        function get() {
            db.query("select * from web_site where `group`=?", group, function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        };
        !!group ? this.findGroup(group, get, cb) : param_error(cb);
    },

    getSite: function(id, cb) {
        function get() {
            db.query("select * from web_site where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        };
        !!id ? get() : param_error(cb);
    },

    findSite: function(id, fn, cb) {
        this.getSite(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 1);
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
        function insert() {
            db.query("insert into web_site set `group`=?,`name`=?,`url`=?,`remark`=?,ctime=now()", [group, name, url, remark], function(err, result) {
                insert_result(err, result, cb, 1);
            });
        };
        !!group && name ? this.findGroup(group, insert, cb) : param_error(cb);
    },

    modifyGroup: function(id, name, cb) {
        function update() {
            db.query("update web_group set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb, 0);
            });
        };
        !!id && name ? this.findGroup(id, update, cb) : param_error(cb);
    },

    modifySite: function(id, group, name, url, remark, cb) {
        !!id && (!!group || name !== undefined || url !== undefined || remark !== undefined) ? this.findSite(id, function() {
            !!group ? this.findGroup(group, update, cb) : update();
        }, cb) : param_error(cb);

        function update() {
            var settings = {};
            !!group && (settings['group'] = group);
            name !== undefined && (settings['name'] = name);
            url !== undefined && (settings['url'] = url);
            remark !== undefined && (settings['remark'] = remark);

            db.query("update web_site set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 1);
            });
        }
    },

    deleteGroup: function(id, cb) {
        if (id === 1) {
            def_group(id, cb);
            return;
        }

        !!id ? this.findGroup(id, del, cb) : param_error(cb);

        function del() {
            db.query("delete from web_group where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 0);
            });
        }
    },

    clearGroup: function(id, cb) {
        function clear() {
            db.query("delete from web_site where ??=?", ['group', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        };
        !!id ? this.findGroup(id, clear, cb) : param_error(cb);
    },

    deleteSite: function(id, cb) {
        function del() {
            db.query("delete from web_site where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        };
        !!id ? this.findSite(id, del, cb) : param_error(cb);
    },

    deleteSites: function(ids, cb) {
        function del() {
            db.query("delete from web_site where id in (" + ids + ")", function(err, result) {
                delete_result(err, ids, result, cb, 1);
            });
        };
        !!ids ? del() : param_error(cb);
    }
}

module.exports = api;