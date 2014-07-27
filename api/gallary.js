/******api for gallary service*******/

var db = require('../db'),
    fs = require('fs'),
    status = require('../status.json'),
    uploader = require('../upload');

var dir = './uploads/photo/',
    def_cover = '/photo/cover.png',
    ns = ['画廊', '照片'];

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

var api = {
    upload: function(gallary, file, cb) {
        uploader.upload(file, {
            dir: './uploads/photo/gallary_' + gallary,
            maxSize: 5 * 1024 * 1025,
            filters: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/x-icon', 'image/x-png']
        }, cb);
    },

    getGallarys: function(cb) {
        db.query("select * from gallary", function(err, data) {
            query_result(err, null, data, cb, 0);
        });
    },

    getGallary: function(id, cb) {
        function get() {
            db.query("select * from gallary where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 0);
            });
        };
        !!id ? get() : param_error(cb);
    },

    findGallary: function(id, fn, cb) {
        this.getGallary(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 0);
        });
    },

    getPhotos: function(gallary, cb) {
        function get() {
            db.query("select * from photo where `gallary`=?", gallary, function(err, data) {
                query_result(err, null, data, cb, 1);
            });
        };
        !!gallary ? this.findGallary(gallary, get, cb) : param_error(cb);
    },

    getPhoto: function(id, cb) {
        function get() {
            db.query("select * from photo where `id`=?", id, function(err, data) {
                query_result(err, id, data, cb, 1);
            });
        };
        !!id ? get() : param_error(cb);
    },

    findPhoto: function(id, fn, cb) {
        this.getPhoto(id, function(result) {
            isExist(result) ? fn.call(api) : no_exist(id, cb, 1);
        });
    },

    ///创建相册，默认封面
    addGallary: function(name, desc, cb) {
        function insert() {
            db.query("insert into gallary set `name`=?,`desc`=?,`cover`=?,`supports`=?,`ctime`=now()", [name, desc, def_cover, 0], function(err, result) {
                err ? insert_result(err, result, cb, 0) : mkdir(result);
            });
        }
        name ? insert() : param_error(cb);

        //创建服务器相册目录，目录永不删除
        function mkdir(result) {
            var id = result.insertId;
            fs.mkdir(dir + 'gallary_' + id, function(err) {
                err ? mkdir(result) : insert_result(null, result, cb, 0);
            });
        }
    },

    ///创建照片，在这之前照片已经被上传保存到服务器
    addPhoto: function(gallary, name, desc, path, cb) {
        function insert() {
            db.query("insert into photo set `gallary`=?,`name`=?,`desc`=?,`path`=?,`supports`=?,ctime=now()", [gallary, name, desc, path, 0], function(err, result) {
                insert_result(err, result, cb, 1);
            });
        };
        !!gallary && name ? this.findGallary(gallary, insert, cb) : param_error(cb);

        function findPath() {
            /photo/20140725162918.jpg
            fs.exists()
        }
    },

    modifyGallary: function(id, name, desc, cover, supports, cb) {
        function update() {
            var settings = {};
            name !== undefined && (settings['name'] = name);
            desc !== undefined && (settings['desc'] = desc);
            cover !== undefined && (settings['cover'] = cover);
            supports !== undefined && (settings['supports'] = supports);

            db.query("update gallary set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 0);
            });
        };
        !!id && (name !== undefined || desc !== undefined || cover !== undefined || supports !== undefined) ? this.findGallary(id, update, cb) : param_error(cb);
    },

    ///编辑照片，照片路径地址不可编辑
    modifyPhoto: function(id, gallary, name, desc, supports, cb) {
        !!id && (!!gallary || name !== undefined || desc !== undefined || supports !== undefined) ? this.findPhoto(id, function() {
            !!gallary ? this.findGallary(gallary, update, cb) : update();
        }, cb) : param_error(cb);

        function update() {
            var settings = {};
            !!gallary && (settings['gallary'] = gallary);
            name !== undefined && (settings['name'] = name);
            desc !== undefined && (settings['desc'] = desc);
            supports !== undefined && (settings['supports'] = supports);

            db.query("update photo set " + db.escape(settings) + " where ??=?", ['id', id], function(err, result) {
                update_result(err, id, result, cb, 1);
            });
        }
    },

    deleteGallary: function(id, cb) {
        function del() {
            db.query("delete from gallary where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 0);
            });
        };
        !!id ? this.findGallary(id, del, cb) : param_error(cb);
    },

    clearGallary: function(id, cb) {
        function clear() {
            db.query("delete from photo where ??=?", ['gallary', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        };
        !!id ? this.findGallary(id, clear, cb) : param_error(cb);
    },

    deletePhoto: function(id, cb) {
        function del() {
            db.query("delete from photo where ??=?", ['id', id], function(err, result) {
                delete_result(err, id, result, cb, 1);
            });
        };
        !!id ? this.findPhoto(id, del, cb) : param_error(cb);
    },

    deletePhotos: function(ids, cb) {
        function del() {
            db.query("delete from photo where id in (" + ids + ")", function(err, result) {
                delete_result(err, ids, result, cb, 1);
            });
        };
        !!ids ? del() : param_error(cb);
    }
}

module.exports = api;