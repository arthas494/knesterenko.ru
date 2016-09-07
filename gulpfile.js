var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    cssmin = require('gulp-cssmin'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    svgmin = require('gulp-svgmin'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    flatten = require('gulp-flatten');

var photoswipe = 'node_modules/photoswipe/dist';    


gulp.task('clean', function() {
    return gulp.src('build', {
            read: false
        })
        .pipe(clean());
});

gulp.task('css', function() {
    return gulp.src('src/css/*.css')
//        .pipe(sourcemaps.init())//УБРАТЬ ПЕРЕД ПРД
        .pipe(autoprefixer())
        .pipe(concat('styles.css'))
        .pipe(cssmin())
  //      .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('build/js'))
});

gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('build'))
});

gulp.task('img',function () {
    return gulp.src('src/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});

gulp.task('font',function () {
    return gulp.src('src/fonts/*.*')
        .pipe(gulp.dest('build/fonts'))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'build'
        },
        notify: false
    });
});

gulp.task('photoswipe-js',function () {
    return gulp.src(photoswipe + '/**/*.min.js')
        .pipe(concat('_photoswipe.js'))
        .pipe(uglify())
        .pipe(gulp.dest('src/js'))
});
gulp.task('photoswipe-css',function () {
    return gulp.src(photoswipe + '/**/*.css')
        .pipe(autoprefixer())
        .pipe(concat('photoswipe.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'))
});

gulp.task('photoswipe-img',function () {
    return gulp.src(photoswipe + '/**/*.{jpg,jpeg,png,gif,svg}')
        .pipe(imagemin())
        .pipe(flatten())
        .pipe(gulp.dest('build/css'))
});


//-----------------------------------------
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('css-watch', ['css'], browserSync.reload);
gulp.task('img-watch', ['img'], browserSync.reload);
gulp.task('html-watch', ['html'], browserSync.reload);
gulp.task('font-watch', ['font'], browserSync.reload);
gulp.task('photoswipe', ['photoswipe-js', 'photoswipe-css', 'photoswipe-img']);

//-----------------------------------------

gulp.task('watch', ['browser-sync', 'js', 'css', 'img', 'html', 'font', 'photoswipe'], function() {
    gulp.watch(photoswipe + '/**/*.*', ['photoswipe-watch']);
    gulp.watch('src/*.html', ['html-watch']);
    gulp.watch('src/js/**/*.js', ['js-watch']);
    gulp.watch('src/css/**/*.css', ['css-watch']);
    gulp.watch('src/images/**/*.*', ['img-watch']);
    gulp.watch('src/fonts/*.*', ['font-watch']);
});
