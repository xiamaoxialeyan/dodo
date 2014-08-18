var fs = require('fs');

var path = 'static/emoji/阿狸';

var files = fs.readdirSync(path);
files.forEach(function(file, i) {
    if (file != 'list.gif') {
        fs.renameSync(path + '/' + file, path + '/' + i + '.gif');
        console.log('rename:' + file);
    }
});