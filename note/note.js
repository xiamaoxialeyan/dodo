var db = require('../db'),
    status = require('../status.json');

var ns = ['类别', '分组', '记事', '回收站记事'];

function param_error(cb) {
    cb && cb({
        status: status.PARAM_ERROR,
        message: '参数不合法',
        data: null
    });
}

function isNoExist(result) {
    return result.status === status.NO_EXIST || !Object.keys(result.data).length;
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

function query_result(err, id, result, cb, n) {
    err ? query_failed(cb, n) : (id ? (result.data.length ? query_success(result.data[0], cb, n) : no_exist(id, cb, n)) : query_success(result.data, cb, n));
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

function update_result(err, id, result, cb) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = (err || !result.changedRows) ? '修改数据失败' : '修改数据成功';
    r.data = {
        id: id
    };
    cb && cb(r);
}

function delete_result(err, id, result, cb) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = (err || !result.affectedRows) ? '删除数据失败' : '删除数据成功';
    r.data = {
        id: id
    };
    cb && cb(r);
}

function recover_result(err, id, result, cb) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = (err || !result.affectedRows) ? '还原数据失败' : '还原数据成功';
    id && (r.data = {
        id: id
    });
    cb && cb(r);
}

var api = {
    getNoteTypes: function(cb) {
        db.query("select * from note_type", function(err, data) {
            query_result(err, null, data, cb, 0);
        });
    },

    getNoteType: function(id, cb) {
        function get() {
            db.query("select * from note_type where `id`=?", [id], function(err, data) {
                query_result(err, id, data, cb, 0);
            });
        }
        id ? get() : param_error(cb);
    },

    getNoteGroups: function(typeId, cb) {
        function check() {
            api.getNoteType(typeId, function(result) {
                isNoExist(result) ? no_exist(typeId, cb, 0) : get();
            });
        }
        typeId ? check() : param_error(cb);

        function get() {
            db.query("select * from note_group where `type`=?", [typeId], function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        }
    },

    getNoteGroup: function(id, cb) {
        function get() {
            db.query("select * from note_group where `id`=?", [id], function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        }
        id ? get() : param_error(cb);
    },

    getNotes: function(groupId, cb) {
        function check() {
            api.getNoteGroup(groupId, function(result) {
                isNoExist(result) ? no_exist(groupId, cb, 1) : get();
            });
        }
        groupId ? check() : param_error(cb);

        function get() {
            db.query("select * from note where `group`=?", [groupId], function(err, data) {
                query_result(err, null, data, cb, 2);
            });
        }
    },

    getNote: function(id, cb) {
        function get() {
            db.query("select * from note where `id`=?", [id], function(err, data) {
                query_result(err, id, data, cb, 2);
            });
        }
        id ? get() : param_error(cb);
    },

    addNoteType: function(name, cb) {
        function insert() {
            db.query("insert into note_type set ?", {
                name: name
            }, function(err, result) {
                insert_result(err, result, cb, 0);
            });
        }
        name ? insert() : param_error(cb);
    },

    addNoteGroup: function(typeId, name, cb) {
        function check() {
            api.getNoteType(typeId, function(result) {
                isNoExist(result) ? no_exist(typeId, cb, 0) : insert();
            });
        }
        typeId && name ? check() : param_error(cb);

        function insert() {
            db.query("insert into note_group set ?", {
                type: typeId,
                name: name
            }, function(err, result) {
                insert_result(err, result, cb, 1);
            });
        }
    },

    addNote: function(groupId, name, content, signature, cb) {
        function check() {
            api.getNoteGroup(groupId, function(result) {
                isNoExist(result) ? no_exist(groupId, cb, 1) : insert(result.data.type);
            });
        }
        groupId && name ? check() : param_error(cb);

        function insert(typeId) {
            db.query("insert into note set ?", {
                type: typeId,
                group: groupId,
                name: name,
                content: content || '',
                signature: signature || '',
                modify_date: null
            }, function(err, result) {
                insert_result(err, result, cb, 2);
            });
        }
    },

    modifyNoteType: function(id, name, cb) {
        function check() {
            api.getNoteType(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 0) : update();
            });
        }
        id && name ? check() : param_error(cb);

        function update() {
            db.query("update note_type set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb);
            });
        }
    },

    modifyNoteGroup: function(id, name, cb) {
        function check() {
            api.getNoteGroup(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 1) : update();
            });
        }
        id && name ? check() : param_error(cb);

        function update() {
            db.query("update note_group set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb);
            });
        }
    },

    modifyNote: function(id, name, content, signature, cb) {
        function check() {
            api.getNote(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 2) : update();
            });
        }
        id && (name || content || signature) ? check() : param_error(cb);

        function update() {
            var settings = {};
            name && (settings['name'] = name);
            content && (settings['content'] = content);
            signature && (settings['signature'] = signature);

            db.query("update note set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb);
            });
        }
    },

    deleteNoteType: function(id, cb) {
        function check() {
            api.getNoteType(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 0) : del();
            });
        }
        id ? check() : param_error(cb);

        function del() {
            db.query("delete from note_type where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb);
            });
        }
    },

    deleteNoteGroup: function(id, cb) {
        function check() {
            api.getNoteGroup(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 1) : del();
            });
        }
        id ? check() : param_error(cb);

        function del() {
            db.query("delete from note_group where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb);
            });
        }
    },

    clearNoteGroup: function(id, cb) {
        function check() {
            api.getNoteGroup(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 1) : clear();
            });
        }
        id ? check() : param_error(cb);

        function clear() {
            db.query("delete from note where ??=?", ['group', id], function(err, result) {
                delete_result(err, id, result, cb);
            });
        }
    },

    deleteNote: function(id, cb) {
        function check() {
            api.getNote(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 2) : del();
            });
        }
        id ? check() : param_error(cb);

        function del() {
            db.query("delete from note where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb);
            });
        }
    },

    getRecycles: function(cb) {
        db.query("select * from note_recycle", function(err, data) {
            query_result(err, null, data, cb, 3);
        });
    },

    getRecycle: function(id, cb) {
        function get() {
            db.query("select * from note_recycle where ??=?", ['id', id], function(err, data) {
                query_result(err, id, data, cb, 3);
            });
        }
        id ? get() : param_error(cb);
    },

    recycle: function(id, cb) {
        function check() {
            api.getRecycle(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 2) : recover(result.data);
            });
        }
        id ? check() : param_error(cb);

        function recover(data) {
            delete data.delete_date;
            db.query("insert into note set ?", data, function(err, result) {
                err ? recover_result(err, id, result, cb) : del();
            });
        }

        function del() {
            db.query("delete from note_recycle where ??=?", ['id', id], function(err, result) {
                recover_result(err, id, result, cb);
            });
        }
    },

    recycles: function(cb) {
        this.getRecycles(function(result) {
            isNoExist(result) ? recover_result({}, null, result, cb) : recover(result.data);
        });

        function recover(data) {
            var sql = [];
            for (var i = 0, l = data.length; i < l; i++) {
                var d = data[i];
                delete d.delete_date;
                sql[sql.length++] = "insert into note set " + db.escape(d);
            }

            db.query(sql.join(';'), function(err, result) {
                err ? recover_result(err, null, result, cb) : del();
            });
        }

        function del() {
            db.query("delete from note_recycle", function(err, result) {
                recover_result(err, null, result, cb);
            });
        }
    },

    deleteRecycle: function(id, cb) {
        function check() {
            api.getRecycle(id, function(result) {
                isNoExist(result) ? no_exist(id, cb, 2) : del();
            });
        }
        id ? check() : param_error(cb);

        function del() {
            db.query("delete from note_recycle where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb);
            });
        }
    },

    clearRecycles: function(cb) {
        db.query("delete from note_recycle", function(err, result) {
            delete_result(err, null, result, cb);
        });
    }
}

module.exports = api;