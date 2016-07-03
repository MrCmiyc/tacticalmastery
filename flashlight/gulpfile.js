'use strict';

var gulp = require('gulp'),
    concat = require('gulp-concat'),
// jade = require('gulp-jade'),
    connect = require('gulp-connect-php'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    uncss = require('gulp-uncss'),
    rename = require('gulp-rename'),
    sass = require('gulp-ruby-sass'),
    maps = require('gulp-sourcemaps'),
    del = require('del'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    critical = require('critical'),
    path = require('path');

//////////////////////////////////////////////////

gulp.task('browser-sync', function() {
    connect.server({}, function (){
        browserSync({
            proxy: 'localhost:8000'
        });
    });

    gulp.watch('**/*.php').on('change', function () {
        browserSync.reload();
    });
});



//////////////////////////////////////////////////

// gulp.task('compileJade', function() {
//   var YOUR_LOCALS = {};

//   gulp.src('./*.jade')
//     .pipe(jade({
//       locals: YOUR_LOCALS,
//       pretty: true
//     }))
//     .pipe(gulp.dest('./'))
//     .pipe(livereload())
//     .pipe(browserSync.stream());
// });

//////////////////////////////////////////////////


gulp.task("minifyScripts", function() {
    return gulp.src("scripts/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('scripts/min'))
        .pipe(livereload())
        .pipe(browserSync.stream());
});

gulp.task('scriptsConcat', function() {
    gulp.src(['scripts/sc.js', 'scripts/_ch.js', 'scripts/lo.js'])
        .pipe(concat('all-checkout.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts/min'));

    gulp.src(['scripts/timer.js', 'scripts/scripts.js', 'scripts/_index.js'])
        .pipe(concat('all-index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('scripts/min'));
});

//////////////////////////////////////////////////

gulp.task('compileCompass', function() {
    gulp.src('./styles/sass/*.scss')
        .pipe(plumber())
        .pipe(compass({
            config_file: './config.rb',
            css: 'styles/css',
            sass: 'styles/sass'
        })).pipe(minifyCss())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })).pipe(plumber.stop())
        .pipe(gulp.dest('styles/css'))
        .pipe(livereload())
        .pipe(browserSync.stream());
});

gulp.task("stripCommonCss", function() {

        gulp.src('styles/css/common.css')
        .pipe(uncss({
            html: ['*.html'],
            ignore: ['.tingle']
        })).pipe(minifyCss())
        .pipe(rename('common.tiny.css'))
        .pipe(gulp.dest('styles/css'));
});


gulp.task("stripBootstrap", function() {
    gulp.src('css/bootstrap.css')
        .pipe(uncss({
            html: ['*.html']
        })).pipe(minifyCss())
        .pipe(gulp.dest('styles/css'));
});
gulp.task("stripJquery", function() {
    gulp.src('css/jquery.modal.css')
        .pipe(uncss({
            html: ['*.html']
        })).pipe(minifyCss())
        .pipe(gulp.dest('styles/css'));
});

//////////////////////////////////////////////////

gulp.task('clean', function() {
    del(['dist', 'styles/css', 'scripts/min', 'scripts/all_scripts.js', 'scripts/all_scripts.js.map']);
});

//////////////////////////////////////////////////

gulp.task('watchFiles', function() {

    var server = livereload();

    gulp.start('browser-sync');

    gulp.watch('styles/sass/**/*.scss', ['compileCompass', 'critical']);
    gulp.watch('scripts/*.js', ['minifyScripts']);
    gulp.watch('_*.html', ['critical']);
    // gulp.watch('*.jade', ['compileJade']);
    //gulp.watch("*.html").on('change', browserSync.reload);
});

//////////////////////////////////////////////////

//gulp.task("build", ['clean', 'minifyScripts', 'compileCompass', 'scriptsConcat', 'critical']);
gulp.task("build", function() {
    gulp.start('clean');
    gulp.start('compileCompass');
    gulp.start('stripCommonCss');
    gulp.start('scriptsConcat');
    gulp.start('minifyScripts');
    gulp.start('critical');
});

gulp.task('critical', function (cb) {
    gulp.start('critical-index');
    gulp.start('critical-tm2');
    gulp.start('critical-tm8');
    //gulp.start('critical-checkout');
    gulp.start('critical-recharge');
});

gulp.task('critical-index', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: '_index.html',
        css: ['styles/css/common.css','styles/css/index.css'],
        dest: 'index.html',
        width: 1400,
        height: 800,
        minify: true
    });
});

gulp.task('critical-tm2', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: '_tm2.html',
        dest: 'tm2.html',
        width: 1400,
        height: 800,
        minify: true
    });
});

gulp.task('critical-tm8', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: '_tm8.html',
        dest: 'tm8.html',
        width: 1400,
        height: 800,
        minify: true
    });
});

gulp.task('critical-checkout', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: '_checkout.html',
        dest: 'checkout.html',
        width: 1400,
        height: 800,
        minify: true
    });
});

gulp.task('critical-recharge', function (cb) {
    critical.generate({
        inline: true,
        base: '.',
        src: '_us_recharge.html',
        dest: 'us_recharge.html',
        width: 1400,
        height: 800,
        minify: true
    });
});

//////////////////////////////////////////////////

gulp.task('serve', ['watchFiles']);

//////////////////////////////////////////////////
gulp.task("default", function() {
    gulp.start('build');
    gulp.start('serve');
});