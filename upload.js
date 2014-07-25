var fs = require('fs'),
    formidable = require('formidable'),
    utils = require('./utils');

function getOptions(opts) {
    opts || (opts = {});
    opts.dir || (opts.dir = './uploads');
    opts.tempDir || (opts.tempDir = './temp');
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

function reserve(dir, fix, fields) {
    fix && (dir = dir.replace(/\{([\s\S]*)\}/g, function(m, p) {
        return fields[p];
    }));
    return dir;
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
    for (var k in file) file = file[k];

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
    for (k in files) files = files[k];

    var len = 0,
        c = 0,
        ps = [];

    if (Array.isArray(files)) {
        files.forEach(function(file) {
            if (!checkType(file, opts.filters)) return;
            if (!checkSize(file, opts.maxSize)) return;

            async(opts.dir, file, function(err, path) {
                c++;
                err || ps.push(path);
                c == len && result(err, ps, cb);
            });
            len++;
        });
    }
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
    upload: function(req, opts, callback) {
        opts = getOptions(opts);

        var form = new formidable.IncomingForm({
            uploadDir: opts.tempDir
        });

        form.parse(req, function(err, fields, files) {
            err ? result(err, null, callback) : (opts.dir = reserve(opts.dir, opts.dir_fix, fields), save(files, opts, callback));
        });
    },

    uploads: function(req, opts, callback) {
        opts = getOptions(opts);

        var form = new formidable.IncomingForm({
            uploadDir: opts.tempDir,
            multiples: true
        });

        form.parse(req, function(err, fields, files) {
            err ? result(err, null, callback) : (opts.dir = reserve(opts.dir, opts.dir_fix, fields), saves(files, opts, callback));
        });
    }
}