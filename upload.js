var fs = require('fs'),
    utils = require('./utils');

function getOptions(opts) {
    opts || (opts = {});
    opts.dir || (opts.dir = './uploads');
    opts.maxSize || (opts.maxSize = 2);
    /\/$/.test(opts.dir) || (opts.dir += '/');
    return opts;
}

function ext(type) {
    return {
        "application/json": "json",
        "application/msword": "doc",
        "application/octet-stream": "binary",
        "application/pdf": "pdf",
        "application/vnd.ms-excel": "xls",
        "application/vnd.ms-powerpoint": "ppt",
        "application/x-javascript": "js",
        "application/x-shockwave-flash": "swf",
        "application/zip": "zip",
        "audio/mpeg": "mp3",
        "audio/x-ms-wma": "wma",
        "audio/x-wav": "wav",
        "image/bmp": "bmp",
        "image/gif": "gif",
        "image/ief": "ief",
        "image/jpeg": "jpe",
        "image/png": "png",
        "image/svg+xml": "svg",
        "image/tiff": "tiff",
        "image/x-icon": "icon",
        "text/css": "css",
        "text/html": "html",
        "text/plain": "txt",
        "text/xml": "xml",
        "video/mpeg": "mpe",
        "video/mpeg4": "mp4",
        "video/quicktime": "mov",
        "video/x-ms-wmv": "wmv",
        "video/x-msvideo": "avi",
        "video/x-sgi-movie": "movie"
    }[type] || '';
}

function checkType(file, filters) {
    if (filters.indexOf('*') > -1 || filters.indexOf(file.type) >= 0)
        return true;

    for (var i = 0, l = filters.length; i < l; i++) {
        var ts = filters[i].split('/');
        if (ts[1] === '*') {
            return file.type.split('/')[0] === ts[0];
        }
    }
    return false;
}

function checkSize(file, maxSize) {
    return file.size <= maxSize * 1024 * 1024;
}

function async(dir, file, cb) {
    var fname = utils.formatDate(new Date(), 'yyyyMMddhhmmssS') + Math.ceil(Math.random() * 10000) + '.' + ext(file.type),
        fp = dir + fname;
    fs.rename(file.path, fp, function(err) {
        cb(err, err ? null : 'file' + fp.slice(9));
        fs.unlink(file.path, function(err) {});
    });
}

function save(file, opts, cb) {
    if (!checkType(file, opts.filters)) {
        type_error(cb);
        return;
    }

    if (!checkSize(file, opts.maxSize)) {
        size_error(cb);
        return;
    }

    async(opts.dir, file, function(err, path) {
        result(err, path, cb);
    });
}

function saves(files, opts, cb) {
    var len = files.length,
        c = 0,
        ps = [];

    files.forEach(function(file) {
        if (!checkType(file, opts.filters)) return;
        if (!checkSize(file, opts.maxSize)) return;

        async(opts.dir, file, function(err, path) {
            c++;
            err || ps.push(path);
            c == len && result(err, ps, cb);
        });
    });
    len || empty_error(cb);
}

function result(err, path, cb) {
    var r = {};
    r.code = err ? 0 : 1;
    r.message = err ? '上传文件失败' : '上传文件成功';
    r.path = err ? null : path;
    cb && cb(r);
}

function type_error(cb) {
    var r = {};
    r.code = 3;
    r.message = '文件类型不符合';
    r.path = null;
    cb && cb(r);
}

function size_error(cb) {
    var r = {};
    r.code = 4;
    r.message = '文件太大';
    r.path = null;
    cb && cb(r);
}

function empty_error(cb) {
    var r = {};
    r.code = 2;
    r.message = '无文件';
    r.path = null;
    cb && cb(r);
}

module.exports = {
    upload: function(files, opts, callback) {
        if (!files || (Array.isArray(files) && !files.length)) {
            empty_error(callback);
            return;
        }

        opts = getOptions(opts);
        Array.isArray(files) ? saves(files, opts, callback) : save(files, opts, callback);
    }
}