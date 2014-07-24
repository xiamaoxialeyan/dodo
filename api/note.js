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

function recover_result(err, id, result, cb) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = (err || !result.affectedRows) ? '还原记事失败' : '还原记事成功';
    id && (r.data = {
        id: id
    });
    cb && cb(r);
}

function def_result(id, cb, n) {
    cb && cb({
        status: status.FAILED,
        message: '不能删除默认' + ns[n],
        data: {
            id: id
        }
    });
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
        };
        !!id ? get() : param_error(cb);
    },

    findNoteType: function(id, fn, cb) {
        this.getNoteType(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 0);
        });
    },

    getNoteGroups: function(type, cb) {
        function get() {
            db.query("select * from note_group where `type`=?", type, function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        };
        !!type ? this.findNoteType(type, get, cb) : param_error(cb);
    },

    getNoteGroup: function(id, cb) {
        function get() {
            db.query("select * from note_group where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        };
        !!id ? get() : param_error(cb);
    },

    findNoteGroup: function(id, fn, cb) {
        this.getNoteGroup(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 1);
        });
    },

    getNotes: function(group, cb) {
        function get() {
            db.query("select * from note where `group`=?", group, function(err, data) {
                query_result(err, null, data, cb, 2);
            });
        };
        !!group ? this.findNoteGroup(group, get, cb) : param_error(cb);
    },

    getNote: function(id, cb) {
        function get() {
            db.query("select * from note where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 2);
            });
        };
        !!id ? get() : param_error(cb);
    },

    findNote: function(id, fn, cb) {
        this.getNote(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 2);
        });
    },

    addNoteType: function(name, cb) {
        function insert() {
            db.query("insert into note_type set `name`=?,`ctime`=now()", name, function(err, result) {
                insert_result(err, result, cb, 0);
            });
        }
        name ? insert() : param_error(cb);
    },

    addNoteGroup: function(type, name, cb) {
        function insert() {
            db.query("insert into note_group set `type`=?,`name`=?,`ctime`=now()", [type, name], function(err, result) {
                insert_result(err, result, cb, 1);
            });
        };
        !!type && name ? this.findNoteType(type, insert, cb) : param_error(cb);
    },

    addNote: function(group, name, content, signature, cb) {
        function insert() {
            db.query("insert into note set `group`=?,`name`=?,`content`=?,`signature`=?,ctime=now()", [group, name, content, signature], function(err, result) {
                insert_result(err, result, cb, 2);
            });
        };
        !!group && name ? this.findNoteGroup(group, insert, cb) : param_error(cb);
    },

    modifyNoteType: function(id, name, cb) {
        function update() {
            db.query("update note_type set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb, 0);
            });
        };
        !!id && name ? this.findNoteType(id, update, cb) : param_error(cb);
    },

    modifyNoteGroup: function(id, type, name, cb) {
        !!id && (!!type || name !== undefined) ? this.findNoteGroup(id, function() {
            !!type ? this.findNoteType(type, update, cb) : update();
        }, cb) : param_error(cb);

        function update() {
            var settings = {};
            !!type && (settings['type'] = type);
            name !== undefined && (settings['name'] = name);

            db.query("update note_group set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 1);
            });
        }
    },

    modifyNote: function(id, group, name, content, signature, cb) {
        !!id && (!!group || name !== undefined || content !== undefined || signature !== undefined) ? this.findNote(id, function() {
            !!group ? api.findNoteGroup(group, update, cb) : update();
        }, cb) : param_error(cb);

        function update() {
            var settings = {};
            !!group && (settings['group'] = group);
            name !== undefined && (settings['name'] = name);
            content !== undefined && (settings['content'] = content);
            signature !== undefined && (settings['signature'] = signature);

            db.query("update note set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 2);
            });
        }
    },

    deleteNoteType: function(id, cb) {
        if (id === 1) {
            def_result(id, cb, 0);
            return;
        }

        !!id ? this.findNoteType(id, del, cb) : param_error(cb);

        function del() {
            db.query("delete from note_type where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 0);
            });
        }
    },

    deleteNoteGroup: function(id, cb) {
        if (id === 1) {
            def_result(id, cb, 1);
            return;
        }

        !!id ? this.findNoteGroup(id, del, cb) : param_error(cb);

        function del() {
            db.query("delete from note_group where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        }
    },

    clearNoteGroup: function(id, cb) {
        function clear() {
            db.query("delete from note where ??=?", ['group', id], function(err, result) {
                delete_result(err, id, result, cb, 2);
            });
        };
        !!id ? this.findNoteGroup(id, clear, cb) : param_error(cb);
    },

    deleteNote: function(id, cb) {
        function del() {
            db.query("delete from note where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 2);
            });
        };
        !!id ? this.findNote(id, del, cb) : param_error(cb);
    },

    delNotes: function(ids, cb) {
        function del() {
            db.query("delete from note where id in (?)", ids, function(err, result) {
                delete_result(err, ids, result, cb, 2);
            });
        };
        !!ids ? del() : param_error(cb);
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
        };
        !!id ? get() : param_error(cb);
    },

    findRecycle: function(id, fn, cb) {
        this.getRecycle(id, function(result) {
            isExist(result) ? fn.call(this, result.data) : no_exist(id, cb, 3);
        });
    },

    recycle: function(id, cb) {
        !!id ? this.findRecycle(id, recover, cb) : param_error(cb);

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
        function del() {
            db.query("delete from note_recycle where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 3);
            });
        };
        !!id ? this.findRecycle(id, del, cb) : param_error(cb);
    },

    clearRecycles: function(cb) {
        db.query("delete from note_recycle", function(err, result) {
            delete_result(err, null, result, cb, 3);
        });
    }
}

module.exports = api;