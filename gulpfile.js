const { src, watch, dest, series } = require('gulp');
const htmlMinifier = require('gulp-htmlmin');
const compileLess = require('gulp-less');
const prefixer = require('gulp-autoprefixer');
const cssMinifier = require('gulp-clean-css');
const babel = require('gulp-babel');
const jsMinifier = require('gulp-minify');
const browsersync = require('browser-sync').create();

// Creating different tasks

// HTML process
function html() {
    return src('./src/*.html')
        .pipe( htmlMinifier({ collapseWhitespace: true }) )
        .pipe( dest('./dist'));
}

// LESS process
function less() {
    return src('./src/less/style.less')
        .pipe( compileLess({
            plugins: [require('less-plugin-glob')]
        }) )
        .pipe( prefixer() )
        .pipe( cssMinifier() )
        .pipe( dest('./dist/css') )
}

// JS process
function js() {
    return src('./src/js/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe( jsMinifier() )
        .pipe( dest('./dist/js') )
}

// Browser Sync Serve
function browsersyncServe( callback ) {
    browsersync.init({
        server: {
            baseDir: './dist'
        }
    });
    callback();
}

// Browser Sync Reload
function browsersyncRelaod( callback ) {
    browsersync.reload();
    callback();
}

// Watch tasks
function watchTasks() {
    watch( './src/*.html', series( html, browsersyncRelaod ) )
    watch( './src/less/**/*.less', series( less, browsersyncRelaod ) )
    watch( './src/js/**/*.js', series( js, browsersyncRelaod ) )
}

exports.default = series(
    html,
    less,
    js,
    browsersyncServe,
    watchTasks
);

