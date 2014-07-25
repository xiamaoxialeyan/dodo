var fs = require('fs'),
    formidable = require('formidable');

module.exports = {
    formatDate: function(d, fmt) {
        fmt = fmt || 'yyyy-MM-dd hh:mm:ss'; //支持的格式模板部件有：y--年份，M--月份，d--日，h--24制小时，H--12制小时，m--分

        var o = {
            "M+": d.getMonth() + 1, //月份     
            "d+": d.getDate(), //日     
            "H+": d.getHours() % 12 === 0 ? 12 : d.getHours() % 12, //小时     
            "h+": d.getHours(), //小时     
            "m+": d.getMinutes(), //分     
            "s+": d.getSeconds(), //秒       
            "S": d.getMilliseconds() //毫秒     
        };

        /(y+)/.test(fmt) && (fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length)));

        for (var k in o) {
            var v = o[k];
            new RegExp("(" + k + ")").test(fmt) && (fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? v : ("00" + v).substr(("" + v).length)));
        }
        return fmt;
    },

    upload: function(req, opts, callback) {
        opts || (opts = {});

        opts.dir || (opts.dir = './uploads');
        opts.tempDir || (opts.tempDir = './temp');
        opts.maxSize || (opts.maxSize = 2 * 1024 * 1024);

        /\/$/.test(opts.dir) || (opts.dir += '/');

        var _ = this,
            len = 0,
            c = 0,
            ps = [];

        var form = new formidable.IncomingForm({
            uploadDir: opts.tempDir,
            multiples: true
        });

        form.parse(req, function(err, fields, files) {
            err ? result(err, null, null, callback) : (reserve(fields), save(files));
        });

        function reserve(fields) {
            opts.dir_fix && (opts.dir = opts.dir.replace(/\{([\s\S]*)\}/g, function(m, p) {
                return fields[p];
            }));
        }

        function save(files) {
            for (k in files) {
                var file = files[k];

                if (Array.isArray(file)) {
                    file.forEach(function(e) {
                        check(e) && (len++, async(e));
                    });
                    continue;
                }

                check(file) && (len++, async(file));
            }
            len || result({}, null, callback);
        }

        function check(file) {
            return file.size <= opts.maxSize && (opts.filters ? opts.filters.indexOf(file.type) > -1 : true);
        }

        function async(file) {
            var fname = _.formatDate(new Date(), 'yyyyMMddhhmmssS') + '.' + ext(file.type),
                fp = opts.dir + fname;
            fs.rename(file.path, fp, function(err) {
                c++;
                err || ps.push(fp.slice(9));
                c == len && result(err, ps, callback);
                fs.unlink(file.path, function(err) {});
            });
        }

        function ext(type) {
            return {
                'image/jpeg': 'jpg',
                'image/png': 'png',
                'image/gif': 'gif',
                'image/bmp': 'bmp',
                'image/x-png': 'png',
                'image/x-icon': 'icon'
            }[type] || 'png';
        }

        function result(err, path, cb) {
            var r = {};
            r.message = err ? '上传文件失败' : '上传文件成功';
            r.path = err ? null : path;
            cb && cb(r);
        }
    },

    rmdir: function(path, cb) {
        /\/$/.test(path) || (path += '/');

        var _files, p = 0;

        fs.exists(path, function(exists) {
            exists ? readdir() : cb && cb({
                status: 1,
                message: '目录不存在'
            });
        });

        function readdir() {
            fs.readdir(path, function(err, files) {
                err ? cb && cb({
                    status: 2,
                    message: '读取目录失败'
                }) : (_files = files, next());
            });
        }

        var _ = this;

        function next() {
            var file = _files[p++];
            if (!file) {
                fs.rmdir(path, function(err) {
                    cb && cb(err ? {
                        status: 3,
                        message: '删除目录失败'
                    } : null);
                });
                return;
            }

            var fp = path + file;
            fs.statSync(fp).isDirectory() ? _.rmdir(fp, next) : fs.unlink(fp, next);
        }
    }
}