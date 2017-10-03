var gulp = require('gulp'),
connect = require('gulp-connect'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
mainBowerFiles = require('main-bower-files');

gulp.task('connect', function() {
    connect.server({
        port: 8080,
        root: 'build',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./build/*.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
    gulp.src('./build/css/*.css')
    .pipe(connect.reload());
});

gulp.task('sass', function () {
    return gulp.src('./build/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('build', function () {
    gulp.src(['./build/js/**', './build/css/**', './build/index.html'],  {base: "./build"})
    .pipe(gulp.dest('dist')) 
});

gulp.task('bower-files', function() {
    return gulp.src(mainBowerFiles())
        .pipe(gulp.dest('build/js/libs'))
});

gulp.task('watch', function () {
    gulp.watch(['./build/*.html'], ['html']);
    gulp.watch('./build/sass/**/*.scss', ['sass']);
    gulp.watch('./build/css/*.css', ['css']);
});

gulp.task('default', ['connect', 'watch']);