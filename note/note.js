/******api for note service*******/

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
    r.message = '修改' + ns[n] + (err || !result.changedRows) ? '失败' : '成功';
    r.data = {
        id: id
    };
    cb && cb(r);
}

function delete_result(err, id, result, cb, n) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = '删除' + ns[n] + (err || !result.affectedRows) ? '失败' : '成功';
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
            db.query("select * from note_type where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 0);
            });
        }
        id ? get() : param_error(cb);
    },

    getNoteGroups: function(typeId, cb) {
        function find() {
            api.getNoteType(typeId, function(result) {
                isExist(result) ? get() : no_exist(typeId, cb, 0);
            });
        }
        typeId ? find() : param_error(cb);

        function get() {
            db.query("select * from note_group where `type`=?", typeId, function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        }
    },

    getNoteGroup: function(id, cb) {
        function get() {
            db.query("select * from note_group where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        }
        id ? get() : param_error(cb);
    },

    getNotes: function(groupId, cb) {
        function find() {
            api.getNoteGroup(groupId, function(result) {
                isExist(result) ? get() : no_exist(groupId, cb, 1);
            });
        }
        groupId ? find() : param_error(cb);

        function get() {
            db.query("select * from note where `group`=?", groupId, function(err, data) {
                query_result(err, null, data, cb, 2);
            });
        }
    },

    getNote: function(id, cb) {
        function get() {
            db.query("select * from note where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 2);
            });
        }
        id ? get() : param_error(cb);
    },

    addNoteType: function(name, cb) {
        function insert() {
            db.query("insert into note_type set `name`=?,`ctime`=now()", name, function(err, result) {
                insert_result(err, result, cb, 0);
            });
        }
        name ? insert() : param_error(cb);
    },

    addNoteGroup: function(typeId, name, cb) {
        function find() {
            api.getNoteType(typeId, function(result) {
                isExist(result) ? insert() : no_exist(typeId, cb, 0);
            });
        }
        typeId && name ? find() : param_error(cb);

        function insert() {
            db.query("insert into note_group set `type`=?,`name`=?,`ctime`=now()", [typeId, name], function(err, result) {
                insert_result(err, result, cb, 1);
            });
        }
    },

    addNote: function(groupId, name, content, signature, cb) {
        function find() {
            api.getNoteGroup(groupId, function(result) {
                isExist(result) ? insert(result.data.type) : no_exist(groupId, cb, 1);
            });
        }
        groupId && name ? find() : param_error(cb);

        function insert(typeId) {
            db.query("insert into note set `type`=?,`group`=?,`name`=?,`content`=?,`signature`=?,ctime=now()", [typeId, groupId, name, content, signature], function(err, result) {
                insert_result(err, result, cb, 2);
            });
        }
    },

    modifyNoteType: function(id, name, cb) {
        function find() {
            api.getNoteType(id, function(result) {
                isExist(result) ? update() : no_exist(id, cb, 0);
            });
        }
        id && name ? find() : param_error(cb);

        function update() {
            db.query("update note_type set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb, 0);
            });
        }
    },

    modifyNoteGroup: function(id, name, cb) {
        function find() {
            api.getNoteGroup(id, function(result) {
                isExist(result) ? update() : no_exist(id, cb, 1);
            });
        }
        id && name ? find() : param_error(cb);

        function update() {
            db.query("update note_group set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb, 1);
            });
        }
    },

    modifyNote: function(id, name, content, signature, cb) {
        function find() {
            api.getNote(id, function(result) {
                isExist(result) ? update() : no_exist(id, cb, 2);
            });
        }
        id && (name === undefined || content === undefined || signature === undefined) ? find() : param_error(cb);

        function update() {
            var settings = {};
            name !== undefined && (settings['name'] = name);
            content !== undefined && (settings['content'] = content);
            signature !== undefined && (settings['signature'] = signature);

            db.query("update note set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 2);
            });
        }
    },

    deleteNoteType: function(id, cb) {
        function find() {
            api.getNoteType(id, function(result) {
                isExist(result) ? del() : no_exist(id, cb, 0);
            });
        }
        id ? find() : param_error(cb);

        function del() {
            db.query("delete from note_type where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 0);
            });
        }
    },

    deleteNoteGroup: function(id, cb) {
        function find() {
            api.getNoteGroup(id, function(result) {
                isExist(result) ? del() : no_exist(id, cb, 1);
            });
        }
        id ? find() : param_error(cb);

        function del() {
            db.query("delete from note_group where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        }
    },

    deleteNote: function(id, cb) {
        function find() {
            api.getNote(id, function(result) {
                isExist(result) ? del() : no_exist(id, cb, 2);
            });
        }
        id ? find() : param_error(cb);

        function del() {
            db.query("delete from note where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 2);
            });
        }
    },

    deleteNotes: function(groupId, cb) {
        function find() {
            api.getNoteGroup(groupId, function(result) {
                isExist(result) ? clear() : no_exist(groupId, cb, 1);
            });
        }
        groupId ? find() : param_error(cb);

        function clear() {
            db.query("delete from note where ??=?", ['group', groupId], function(err, result) {
                delete_result(err, groupId, result, cb, 2);
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
        function find() {
            api.getRecycle(id, function(result) {
                isExist(result) ? recover(result.data) : no_exist(id, cb, 3);
            });
        }
        id ? find() : param_error(cb);

        function recover(data) {
            delete data.dtime;
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
            isExist(result) ? recover(result.data) : recover_result({}, null, result, cb);
        });

        function recover(data) {
            var sql = [];
            for (var i = 0, l = data.length; i < l; i++) {
                var d = data[i];
                delete d.dtime;
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
        function find() {
            api.getRecycle(id, function(result) {
                isExist(result) ? del() : no_exist(id, cb, 3);
            });
        }
        id ? find() : param_error(cb);

        function del() {
            db.query("delete from note_recycle where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 3);
            });
        }
    },

    clearRecycles: function(cb) {
        db.query("delete from note_recycle", function(err, result) {
            delete_result(err, null, result, cb, 3);
        });
    }
}

module.exports = api;