const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const gls = require('gulp-live-server');

// Couple SASS
gulp.task('sass', function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
            .pipe(sass())
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream());
});

// MOVE JS FILES TO SRC
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/tether/dist/js/tether.min.js'])
    .pipe(gulp.dest("src/js"))
    .pipe(browserSync.stream());

});

// Watch SASS & Serve
gulp.task('server', gulp.series(['sass']), function(){
    browserSync.init({
        watch: true,
        port: 3000,
        server: "./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss', ['sass']])
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Move Font Awesome Folder font to src
gulp.task('fonts', function(){
    return gulp.src("node_modules/font-awesome/fonts/*")
    .pipe(gulp.dest("src/fonts"));
});

// Move font-awesome css file
gulp.task('fa', function(){
    return gulp.src(['node_modules/font-awesome/css/font-awesome.min.css', 'node_modules/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest("src/css"));
});

gulp.task('default', gulp.series(['js', 'server', 'fa', 'fonts']));
