var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    index = require('./routes/index'),
    components = require('./routes/components'),
    users = require('./routes/users'),
    data = require('./routes/web'),
    gallary = require('./routes/gallary'),
    note = require('./routes/note'),
    demo = require('./routes/demo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon('static/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/file', express.static(path.join(__dirname, 'uploads')));


app.use('/', index);
app.use('/components', components);
app.use('/users', users);
app.use('/web', data);
app.use('/gallary', gallary);
app.use('/note', note);
app.use('/demo', demo);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;