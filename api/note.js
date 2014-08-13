/******api for note service*******/

var db = require('../db'),
    status = require('../status.json'),
    uploader = require('../upload');

var ns = ['类别', '记事本', '记事', '回收站记事'];

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

function query_failed(cb, b, n) {
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

function recover_result(err, id, result, cb) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = !result.affectedRows ? '无还原记事' : (err ? '还原记事失败' : '还原记事成功');
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

    getNoteBooks: function(type, cb) {
        function get() {
            db.query("select * from note_book where `type`=?", type, function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        };
        !!type ? this.findNoteType(type, get, cb) : param_error(cb);
    },

    getNoteBook: function(id, cb) {
        function get() {
            db.query("select * from note_book where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        };
        !!id ? get() : param_error(cb);
    },

    findNoteBook: function(id, fn, cb) {
        this.getNoteBook(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 1);
        });
    },

    getNotes: function(book, cb) {
        function get() {
            db.query("select * from note where `book`=?", book, function(err, data) {
                query_result(err, null, data, cb, 2);
            });
        };
        !!book ? this.findNoteBook(book, get, cb) : param_error(cb);
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

    addNoteBook: function(type, name, desc, cb) {
        function insert() {
            db.query("insert into note_book set `type`=?,`name`=?,`desc`=?,`ctime`=now()", [type, name, desc], function(err, result) {
                insert_result(err, result, cb, 1);
            });
        };
        !!type && name ? this.findNoteType(type, insert, cb) : param_error(cb);
    },

    addNote: function(book, name, content, signature, cb) {
        function insert() {
            db.query("insert into note set `book`=?,`name`=?,`content`=?,`signature`=?,ctime=now()", [book, name, content, signature], function(err, result) {
                insert_result(err, result, cb, 2);
            });
        };
        !!book && name ? this.findNoteBook(book, insert, cb) : param_error(cb);
    },

    modifyNoteType: function(id, name, cb) {
        function update() {
            db.query("update note_type set ??=? where ??=?", ['name', name, 'id', id], function(err, result) {
                update_result(err, id, result, cb, 0);
            });
        };
        !!id && name ? this.findNoteType(id, update, cb) : param_error(cb);
    },

    modifyNoteBook: function(id, type, name, desc, cb) {
        !!id && (!!type || name !== undefined || desc !== undefined) ? this.findNoteBook(id, function() {
            !!type ? this.findNoteType(type, update, cb) : update();
        }, cb) : param_error(cb);

        function update() {
            var settings = {};
            !!type && (settings['type'] = type);
            name !== undefined && (settings['name'] = name);
            desc !== undefined && (settings['desc'] = desc);

            db.query("update note_book set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 1);
            });
        }
    },

    modifyNote: function(id, book, name, content, signature, cb) {
        !!id && (!!book || name !== undefined || content !== undefined || signature !== undefined) ? this.findNote(id, function() {
            !!book ? api.findNoteBook(book, update, cb) : update();
        }, cb) : param_error(cb);

        function update() {
            var settings = {};
            !!book && (settings['book'] = book);
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

    deleteNoteBook: function(id, cb) {
        /* if (id === 1) {
            def_result(id, cb, 1);
            return;
        }*/

        !!id ? this.findNoteBook(id, del, cb) : param_error(cb);

        function del() {
            db.query("delete from note_book where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        }
    },

    clearNoteBook: function(id, cb) {
        function clear() {
            db.query("delete from note where ??=?", ['book', id], function(err, result) {
                delete_result(err, id, result, cb, 2);
            });
        };
        !!id ? this.findNoteBook(id, clear, cb) : param_error(cb);
    },

    deleteNote: function(id, cb) {
        function del() {
            db.query("delete from note where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 2);
            });
        };
        !!id ? this.findNote(id, del, cb) : param_error(cb);
    },

    deleteNotes: function(ids, cb) {
        function del() {
            db.query("delete from note where id in (" + ids + ")", function(err, result) {
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

    recovers: function(cb) {
        this.getRecycles(function(result) {
            isExist(result) ? rec(result.data) : recover_result({}, null, result, cb);
        });

        function rec(data) {
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

    recover: function(id, cb) {
        !!id ? this.findRecycle(id, rec, cb) : param_error(cb);

        function rec(data) {
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

    deleteRecycle: function(id, cb) {
        function del() {
            db.query("delete from note_recycle where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 3);
            });
        };
        !!id ? this.findRecycle(id, del, cb) : param_error(cb);
    },

    deleteRecycles: function(cb) {
        db.query("delete from note_recycle", function(err, result) {
            delete_result(err, null, result, cb, 3);
        });
    },

    upload: function(files, cb) {
        uploader.upload(files, {
            dir: './uploads/note/',
            maxSize: 10,
            filters: ['image/*']
        }, cb);
    }
}

module.exports = api;