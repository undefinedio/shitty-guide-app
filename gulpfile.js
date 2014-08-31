var gulp = require('gulp');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var plumber = require('gulp-plumber');
var cssimport = require("gulp-cssimport");

//paths
var paths = {
    sass: ['./src/scss/**/*.scss'],
    js: ['src/js/**/*.js'],
    bower: ['src/bower/**/*.js'],
    templates: ['src/js/**/*.html']
};


//on default start watching files
gulp.task('default', function () {
    gulp.watch(paths.sass, compileSass);
    gulp.watch(paths.js, concatJS);
    gulp.watch(paths.bower, concatBower);
    gulp.watch(paths.templates, compileTemplates);

    //run all compilation/concatination
    compileSass();
    concatJS();
    concatBower();
    compileTemplates();
});

function concatBower() {
    console.log('Concat bower javascript');
    gulp.src([
            'src/bower/jquery/dist/jquery.js',
            'src/bower/lodash/dist/lodash.js',
            'src/bower/angular/angular.js',
            'src/bower/ngCordova/dist/ng-cordova.js',
            'src/bower/angular-animate/angular-animate.js',
            'src/bower/angular-sanitize/angular-sanitize.js',
            'src/bower/angular-ui-router/release/angular-ui-router.js',
            'src/bower/ionic/js/ionic.js',
            'src/bower/ionic/js/ionic-angular.js',
            'src/bower/leaflet/dist/leaflet.js',
            'src/bower/angular-leaflet-directive/dist/angular-leaflet-directive.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('thirdparty.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('www/js/'))
}

function concatJS() {
    console.log('Concat javascript');
    gulp.src([
            'src/js/**/module.js',
            'src/js/**/*.js',
            '!src/js/bootstrap.js'
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        //.pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('www/js/'));

    gulp.src([
            'src/js/bootstrap.js'
        ])
        .pipe(plumber())
        .pipe(concat('bootstrap.js'))
        .pipe(gulp.dest('www/js/'))
        .on('end', function () {
            console.log("Concat javascript done");
        });
}

function compileSass() {
    console.log("Compile sass");
    gulp.src('./src/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe( cssimport() )
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./www/css/'));

}

function compileTemplates() {
    console.log("Compile templates");
    gulp.src('src/js/**/*.html')
        .pipe(plumber())
        .pipe(templateCache('templates.js', { module: 'templates', standalone: true }))
        .pipe(gulp.dest('./www/js/'));
}