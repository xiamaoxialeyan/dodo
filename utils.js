var fs = require('fs');

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