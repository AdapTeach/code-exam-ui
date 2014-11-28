var gulp = require('gulp'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence'),
    del = require('del'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    copy = require('gulp-copy'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    annotate = require('gulp-ng-annotate'),
    path = require('path'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    rev = require('gulp-rev'),
    templateCache = require('gulp-angular-templatecache'),
    ts = require('gulp-typescript'),
    awspublish = require('gulp-awspublish'),
    s3 = require('./s3');

var livereloadport = 35729,
    serverport = 5000;


// DEV SERVER
var devServer = express();
devServer.use(livereload({port: livereloadport}));
devServer.use(express.static('./src'));
devServer.all('/*', function (req, res) {
    res.sendFile('index.html', {root: 'src/app'});
});

// PATHS
var pathToIndexFile = 'src/index.html';
var pathToTsSource = 'src/app/**/*.ts';
var pathToCssSource = 'src/app/**/*.scss';
var pathToTemplates = 'src/app/**/*.html';

gulp.task('default', ['dev'], function () {
});

gulp.task('dev', [
    'buildDev',
    'startDevServer',
    'watchSource'
], function () {
});

gulp.task('buildDev', [
    'buildTs',
    'buildStyle',
    'cacheTemplates'
], function () {
});

gulp.task('buildTs', function () {
    gulp.src(pathToTsSource)
        .pipe(ts({
            declarationFiles: true
        }))
        .pipe(concat('all-ts-source.js'))
        .pipe(gulp.dest('src/build'))
        .pipe(refresh(lrserver));
});

gulp.task('buildStyle', function () {
    gulp.src(pathToCssSource)
        .pipe(sass())
        .pipe(gulp.dest('src/build'));
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});

gulp.task('cacheTemplates', function () {
    gulp.src(pathToTemplates)
        .pipe(templateCache({module: 'app'}))
        .pipe(gulp.dest('src/build'))
        .pipe(refresh(lrserver));
});

gulp.task('startDevServer', function () {
    devServer.listen(serverport);
    lrserver.listen(livereloadport);
});

gulp.task('watchSource', function () {
    gulp.watch(pathToTsSource, ['buildTs']);
    gulp.watch(pathToCssSource, ['buildStyle']);
    gulp.watch(pathToIndexFile, ['reloadIndex']);
    gulp.watch(pathToTemplates, ['cacheTemplates']);
});

gulp.task('reloadIndex', function () {
    gulp.src(pathToIndexFile)
        .pipe(refresh(lrserver));
});


/////////////////////////////////////
/////////////// PROD ///////////////
///////////////////////////////////


gulp.task('prod', [
    'dist',
    'startProdServer'
], function () {
});

gulp.task('dist', function () {
        runSequence(
            'cleanDistFolder',
            'buildDev',
            'buildDist'
        );
    }
);

gulp.task('cleanDistFolder', function (cb) {
    del('dist', cb);
});

gulp.task('buildDist', function () {
    gulp.src('src/app/index.html')
        .pipe(usemin({
            css: [minifyCss()],
            html: [minifyHtml({empty: true})],
            js: [annotate(), uglify(), rev()]
        }))
        .pipe(gulp.dest('dist'));
    gulp.src('src/img/**')
        .pipe(copy('dist', {prefix: 1}));
});

gulp.task('startProdServer', function () {
    var server = express();
    server.use(express.static('./dist'));
    server.all('/*', function (req, res) {
        res.sendFile('index.html', {root: 'dist'});
    });
    server.listen(serverport);
});

gulp.task('s3', function () {
    var publisher = awspublish.create(s3);
    var headers = {
        'Cache-Control': 'max-age=5, no-transform, public' // 5 seconds cache TTL
    };
    return gulp.src('dist/**/*')
        .pipe(publisher.publish(headers))
        .pipe(publisher.cache()) // create a cache file to speed up consecutive uploads
        .pipe(awspublish.reporter());
});