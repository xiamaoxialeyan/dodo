/******api for gallary service*******/

var db = require('../db'),
    fs = require('fs'),
    formidable = require('formidable'),
    status = require('../status.json'),
    utils = require('../utils');

var uploadDir = './uploads/photo/';
var ns = ['画廊', '照片'];

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

function upload_result(err, path, cb) {
    var r = {};
    r.status = err ? status.FAILED : status.SUCCESS;
    r.message = err ? '上传图片失败' : '上传图片成功';
    r.path = path;
    cb && cb(r);
}

function ext(type) {
    return {
        'image/pjpeg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/x-png': 'png',
        'image/gif': 'gif',
        'image/bmp': 'bmp'
    }[type] || 'png';
}

var api = {
    upload: function(req, cb) {
        var form = new formidable.IncomingForm({
            uploadDir: './temp'
        });

        form.parse(req, function(err, fields, files) {
            err ? upload_result(err, null, cb) : save(files.photo);
        });

        function save(file) {
            var fname = utils.formatDate(new Date(), 'yyyyMMddhhmmss') + '.' + ext(file.type);
            fs.rename(file.path, uploadDir + fname, function(err) {
                upload_result(err, '/photo/' + fname, cb);
                fs.unlink(file.path, function(err) {});
            });
        }
    }
}

module.exports = api;