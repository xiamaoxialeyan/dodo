var fs = require('fs'),
    utils = require('./utils');

function getOptions(opts) {
    opts || (opts = {});
    opts.dir || (opts.dir = './uploads');
    opts.maxSize || (opts.maxSize = 2 * 1024 * 1024);
    /\/$/.test(opts.dir) || (opts.dir += '/');
    return opts;
}

function ext(type) {
    return {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/bmp': 'bmp',
        'image/x-png': 'png',
        'image/x-icon': 'icon'
    }[type] || '';
}

function checkType(file, filters) {
    return filters ? filters.indexOf(file.type) > -1 : true;
}

function checkSize(file, maxSize) {
    return file.size <= maxSize;
}

function async(dir, file, cb) {
    var fname = utils.formatDate(new Date(), 'yyyyMMddhhmmssS') + Math.ceil(Math.random() * 10000) + '.' + ext(file.type),
        fp = dir + fname;
    fs.rename(file.path, fp, function(err) {
        cb(err, err ? null : fp.slice(9));
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
    r.message = err ? '上传文件失败' : '上传文件成功';
    r.path = err ? null : path;
    cb && cb(r);
}

function type_error(cb) {
    var r = {};
    r.message = '文件类型错误';
    r.path = null;
    cb && cb(r);
}

function size_error(cb) {
    var r = {};
    r.message = '文件太大';
    r.path = null;
    cb && cb(r);
}

function empty_error(cb) {
    var r = {};
    r.message = '无文件';
    r.path = null;
    cb && cb(r);
}

module.exports = {
    upload: function(file, opts, callback) {
        if (!file) {
            empty_error(callback);
            return;
        }

        opts = getOptions(opts);
        Array.isArray(file) ? saves(file, opts, callback) : save(file, opts, callback);
    }
}