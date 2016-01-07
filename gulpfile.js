var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jshintReporter = require('jshint-stylish');
var watch = require('gulp-watch');
var shell = require('gulp-shell')

var sass = require('gulp-sass');


var paths = {
    'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json']

    ,
    'style': {
        all: './public/styles/**/*.scss',
        output: './public/styles/'
    },
    'fonts': {
        src: './node_modules/materialize-css/dist/font/**/*',
        output: './public/font/'
    },
    'materialize': {
        src: './node_modules/materialize-css/dist/js/**/*',
        output: './public/js/lib/materialize'
    },
    'materialize_components_sass': {
        src: './node_modules/materialize-css/sass/components/**/*',
        output: './public/styles/materialize/sass/components/'
    },
    'materialize_sass': {
        src: './node_modules/materialize-css/sass/materialize.scss',
        output: './public/styles/materialize/sass/'
    },

};

// gulp lint
gulp.task('lint', function(){
    gulp.src(paths.src)
        .pipe(jshint())
        .pipe(jshint.reporter(jshintReporter));
});

// gulp watcher for lint
gulp.task('watch:lint', function () {
    gulp.watch(paths.src, ['lint']);
});


gulp.task('watch:sass', function () {
    gulp.watch(paths.style.all, ['sass']);
});

gulp.task('sass', function(){
    gulp.src(paths.style.all)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.style.output));
});

gulp.task('materialize_sass', function() {
    return gulp.src(paths.materialize_sass.src)
        .pipe(gulp.dest(paths.materialize_sass.output))
});

gulp.task('materialize_components_sass', function() {
    return gulp.src(paths.materialize_components_sass.src)
        .pipe(gulp.dest(paths.materialize_components_sass.output))
});


gulp.task('fonts', function() {
    return gulp.src(paths.fonts.src)
        .pipe(gulp.dest(paths.fonts.output))
});

gulp.task('materialize', function() {
    return gulp.src(paths.materialize.src)
        .pipe(gulp.dest(paths.materialize.output))
});

gulp.task('runKeystone', shell.task('node keystone.js'));
gulp.task('watch', [

    'watch:sass',

    'watch:lint'
]);

gulp.task('build', ['materialize_sass', 'materialize_components_sass', 'fonts', 'materialize']);

gulp.task('default', ['build', 'watch', 'runKeystone']);
