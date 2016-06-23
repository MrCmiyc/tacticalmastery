var gulp = require('gulp');
var uncss = require('gulp-uncss');
var nano = require('gulp-cssnano');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var fs = require('fs');

gulp.task('CSS index optimization', function () {
    return gulp.src(['../css/bootstrap_3.3.6.css', '../css/font-awesome.min.css', '../css/csss.css', '../css/common.css'])
            .pipe(concat('index.css'))
            .pipe(uncss({
                html: ['../index.html'],
                ignore: [
                    'modal',
                    /modal.*/,
                    '.fade.in',
                    'fade'
                ]
            }))
            .pipe(nano({discardComments: {removeAll: true}}))
            .pipe(gulp.dest('../css/optimized'));
});

gulp.task('JS index optimization', function () {
    return gulp.src(['../js/scripts.js', '../js/_index.js', '../js/locale.js'])
            .pipe(concat('index.js'))
            .pipe(uglify({mangle: {toplevel: false}}))
            .pipe(gulp.dest('../js/optimized'));
});

gulp.task('Crunching the index.html', [
    'CSS index optimization',
    'JS index optimization'
], function () {
    return gulp.src('../index.html')
            .pipe(replace(/<!-- block:dev -->[\s\S]*?<!-- blockEnd -->\s/mg, ''))
            .pipe(replace('</head>', function () {
                var style = fs.readFileSync('../css/optimized/index.css', 'utf8');
                return '<style>\n' + style + '\n</style>\n</head>';
            }))
            .pipe(replace(/<!-- block:js -->[\s\S]*?<!-- blockEnd -->\s/mg, '<script src="js/optimized/index.js" defer></script>'))
            .pipe(htmlmin({
                collapseWhitespace: true,
                removeComments: true,
                removeCommentsFromCDATA: true
            }))
            .pipe(rename('index_1.html'))
            .pipe(gulp.dest('../'));

});

gulp.task('default', ['Crunching the index.html'], function () {});