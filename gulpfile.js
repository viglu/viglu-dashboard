/*
=========================================================
* viglu - Dashboard
=========================================================
* Custom modifications by Luc Vigato (2025)
* Based on Volt Free Bootstrap 5 Dashboard
* Original Product Page: https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard
* Original Copyright 2021 Themesberg (https://www.themesberg.com)
* License: MIT (https://themesberg.com/licensing)
=========================================================
*/

var browserSync = require('browser-sync').create();
var cleanCss = require('gulp-clean-css');
var del = require('del');
const htmlmin = require('gulp-html-minifier-terser');
const cssbeautify = require('gulp-cssbeautify');
var gulp = require('gulp');
const npmDist = require('gulp-npm-dist');
var sass = require('gulp-sass')(require('sass'));
var wait = require('gulp-wait');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');

// FIXED: Import autoprefixer correctly for version 9.0.0+
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');

// Get environment from command line or default to 'development'
// Usage: gulp --env production
//    or: gulp --env=production
//    or: NODE_ENV=production gulp
const args = require('yargs').argv;
const environment = args.env || process.env.NODE_ENV || 'development';

// Log the current environment
console.log('Building for environment:', environment);

// Define paths
const paths = {
    dist: {
        base: './dist/',
        css: './dist/css',
        html: './dist/pages',
        assets: './dist/assets',
        img: './dist/assets/img',
        vendor: './dist/vendor'
    },
    dev: {
        base: './html&css/',
        css: './html&css/css',
        html: './html&css/pages',
        assets: './html&css/assets',
        img: './html&css/assets/img',
        vendor: './html&css/vendor'
    },
    base: {
        base: './',
        node: './node_modules'
    },
    src: {
        base: './src/',
        css: './src/css',
        html: './src/pages/**/*.html',
        assets: './src/assets/**/*.*',
        partials: './src/partials/**/*.html',
        scss: './src/scss',
        node_modules: './node_modules/',
        vendor: './vendor'
    },
    temp: {
        base: './.temp/',
        css: './.temp/css',
        html: './.temp/pages',
        assets: './.temp/assets',
        vendor: './.temp/vendor'
    }
};

// Compile SCSS
gulp.task('scss', function () {
    return gulp.src([paths.src.scss + '/custom/**/*.scss', paths.src.scss + '/viglu/**/*.scss', paths.src.scss + '/viglu.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            overrideBrowserslist: ['> 1%']
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.temp.css))
        .pipe(browserSync.stream());
});

gulp.task('index', function() {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            indent: true,
            context: {
                environment: environment
            }
        }))
        .pipe(gulp.dest(paths.temp.base))
        .pipe(browserSync.stream());
})

gulp.task('html', function() {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            indent: true,
            context: {
                environment: environment
            }
        }))
        .pipe(gulp.dest(paths.temp.html))
        .pipe(browserSync.stream());
})

gulp.task('assets', function() {
    return gulp.src([paths.src.assets])
        .pipe(gulp.dest(paths.temp.assets))
        .pipe(browserSync.stream());
})

gulp.task('vendor', function() {
    return gulp.src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.temp.vendor));
})

gulp.task('serve', gulp.series('scss', 'html', 'index', 'assets', 'vendor', function() {
    browserSync.init({
        server: paths.temp.base,
        port: 3000
    });

    gulp.watch([paths.src.scss + '/custom/**/*.scss', paths.src.scss + '/viglu/**/*.scss', paths.src.scss + '/viglu.scss'], gulp.series('scss'));
    gulp.watch([paths.src.html, paths.src.base + '*.html', paths.src.partials], gulp.series('html', 'index'));
    gulp.watch([paths.src.assets], gulp.series('assets'));
}));

// CSS beautify
gulp.task('beautify:css', function() {
    return gulp.src([
        paths.dev.css + '/viglu.css'
    ])
        .pipe(cssbeautify())
        .pipe(gulp.dest(paths.dev.css))
});

// Minify CSS
gulp.task('minify:css', function() {
    return gulp.src([
        paths.dev.css + '/viglu.css'
    ])
        .pipe(sourcemaps.init())
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css))
});

// Minify Html
gulp.task('minify:html', function() {
    return gulp.src([paths.dev.html + '/**/*.html'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest(paths.dist.html));
});

// Clean
gulp.task('clean:dev', function(done) {
    del.sync(paths.dev.base);
    done();
});

gulp.task('clean:dist', function(done) {
    del.sync(paths.dist.base);
    done();
});

// Compile and copy scss/css
gulp.task('copy:css', function() {
    return gulp.src([paths.src.scss + '/custom/**/*.scss', paths.src.scss + '/viglu/**/*.scss', paths.src.scss + '/viglu.scss'])
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer({
            overrideBrowserslist: ['> 1%']
        })]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dev.css))
});

// Copy Html
gulp.task('copy:html', function() {
    return gulp.src([paths.src.html])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            indent: true,
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.dev.html));
})

// Copy index
gulp.task('copy:index', function() {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            indent: true,
            context: {
                environment: 'development'
            }
        }))
        .pipe(gulp.dest(paths.dev.base));
})

// Copy assets
gulp.task('copy:assets', function() {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dev.assets))
});

// Copy assets to dist
gulp.task('copy:dist:assets', function() {
    return gulp.src(paths.src.assets)
        .pipe(gulp.dest(paths.dist.assets))
});

// Copy index to dist
gulp.task('copy:dist:index', function() {
    return gulp.src([paths.src.base + '*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './src/partials/',
            indent: true,
            context: {
                environment: 'production'
            }
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            html5: true,
            removeEmptyAttributes: true,
            removeTagWhitespace: true,
            sortAttributes: true,
            sortClassName: true
        }))
        .pipe(gulp.dest(paths.dist.base));
})

// Copy node_modules
gulp.task('copy:vendor', function() {
    return gulp.src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.dev.vendor));
});

// Copy node_modules to dist
gulp.task('copy:dist:vendor', function() {
    return gulp.src(npmDist(), { base: paths.src.node_modules })
        .pipe(gulp.dest(paths.dist.vendor));
});

gulp.task('build:dev', gulp.series('clean:dev', 'copy:css', 'copy:html', 'copy:index', 'copy:vendor', 'copy:assets', 'beautify:css'));
gulp.task('build:dist', gulp.series('clean:dist', 'copy:css', 'minify:css', 'minify:html', 'copy:dist:index', 'copy:dist:vendor', 'copy:dist:assets'));

// Default
gulp.task('default', gulp.series('serve'));