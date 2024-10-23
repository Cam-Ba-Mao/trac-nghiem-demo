const { src, dest, lastRun, watch, series, parallel } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cheerio = require('gulp-cheerio');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const del = require('del');
const debug = require('gulp-debug');
const dependents = require('gulp-dependents');
const filter = require('gulp-filter');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject');
const newer = require('gulp-newer');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const svgstore = require('gulp-svgstore');
const uglify = require('gulp-uglify');
const paths = {
    tiny: {
        src: ['src/assets/tinymce/**/*', '!src/assets/tinymce/custom.scss'],
        dest: 'dist/js/tinymce',
        css: 'src/assets/tinymce/custom.scss'
    }
};

/**
 * Define dependents
 */

const dependentsPugConfig = {
    '.pug': {
        parserSteps: [
            /^\s*(?:extends|include)\s+(.+?)\s*$/gm,
            function (str) {
                const absolute = str.match(/^[\\/]+(.+)/);
                if (absolute) {
                    str = resolve(absolute[1]);
                }
                return [str];
            },
        ],
        prefixes: ['_'],
        postfixes: ['.pug'],
    }
};

const filterAllPages = () => filter((file) => file.path.includes('pages'));
const filterPages = () => filter(['**/*.pug', '!**/_*.pug']);

/**
 * Define paths
 */

const SRC = 'src/';
const DEST = 'dist/';
const ADMIN = 'dist/admin/';

/**
 * Define tasks using plain functions
 */

function clean() {
    return del([DEST]);
}

function icons() {
    var svgs = src(SRC + 'assets/icons/*.svg')
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[stroke-width]').removeAttr('stroke-width');
            },
            parserOptions: { xmlMode: true }
        }))
        .pipe(rename({ prefix: 'icon-' }))
        .pipe(svgstore({ inlineSvg: true }));

    function fileContents(filePath, file) {
        return file.contents.toString();
    }

    return src(SRC + '_core/layouts/icon-sprites.html')
        .pipe(inject(svgs, { transform: fileContents }))
        .pipe(dest(SRC + '_core/layouts'))
        .pipe(dest(DEST))
        .pipe(browserSync.stream());
}

function images() {
    return src([SRC + 'assets/images/**/*'], { since: lastRun(images) })
        .pipe(newer(DEST + 'images'))
        .pipe(imagemin({
            verbose: true,
        }))
        .pipe(dest(DEST + 'images'));
}

function fonts() {
    return src(SRC + 'assets/fonts/*.*')
        .pipe(dest(DEST + 'fonts/'));
}

function bootstrap() {
    return src([SRC + 'assets/bootstrap/css/bootstrap.min.css'])
        .pipe(dest(DEST + 'css'));    
}

function tinymce() {
    return src(paths.tiny.src)
        // .pipe(fileInclude({
        //     prefix: '@@',
        //     basepath: '@file'
        // }))
        .pipe(dest(paths.tiny.dest))
}

function tinymceStyles() {
    return src(paths.tiny.css, { sourcemaps: true })
        .pipe(concat('custom.css'))
        .pipe(cleanCSS())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(paths.tiny.dest , { sourcemaps: true }))
        .pipe(browserSync.stream());
}

function html() {
    return src(SRC + '**/*.pug', { since: lastRun(html) })
        .pipe(dependents(dependentsPugConfig))
        .pipe(filterAllPages())
        .pipe(filterPages())
        .pipe(pug({ pretty: '    ' }))
        .pipe(rename({ dirname: '' }))
        .pipe(dest(DEST))
        .pipe(browserSync.stream({once: true}));
}

function css() {
    return src(SRC + 'main.scss', { sourcemaps: true })
        .pipe(sassGlob())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest(DEST + 'css', { sourcemaps: true }))
        .pipe(browserSync.stream())
        .pipe(cleanCSS({ debug: true }, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(DEST + 'css'));
}

function js() {
    return src([SRC + 'main.js', SRC + 'components/**/*.js', SRC + 'pages/**/*.js'])
        .pipe(concat('scripts.js'))
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest(DEST + 'js'))
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(dest(DEST + 'js'))
        .pipe(browserSync.stream());
}

function pluginsJs() {
    return src([SRC + 'assets/plugins/*.js', '!' + SRC + 'assets/plugins/_*.js'])
        .pipe(dest(DEST + 'js'));
}

function bundleCss() {
    return src([SRC + 'assets/bundle/**/*.css', '!' + SRC + 'assets/bundle/**/_*.css', '!' + SRC + 'assets/bundle/_*/**'])
        .pipe(concat('bundle.min.css'))
        .pipe(cleanCSS())
        .pipe(dest(DEST + 'css'));
}

function bundleJs() {
    return src([SRC + 'assets/bundle/**/*.js', '!' + SRC + 'assets/bundle/**/_*.js', '!' + SRC + 'assets/bundle/_*/**'])
        .pipe(concat('bundle.min.js'))
        .pipe(uglify())
        .pipe(dest(DEST + 'js'));
}

function watcher() {
    browserSync.init({
        server: DEST,
        port: 8191
    });
    watch(SRC + 'assets/icons/*.svg', icons);
    // watch(SRC + 'assets/images/**/*', images);
    watch(SRC + 'assets/bootstrap/scss/**/*.scss', bootstrap);
    watch(SRC + '**/*.pug', html);
    watch([SRC + '**/*.scss', '!' + SRC + 'assets/**/*.scss'], css);
    watch([SRC + 'main.js', SRC + 'components/**/*.js', SRC + 'pages/**/*.js'], js);
    watch(SRC + 'assets/tinymce/*.scss', tinymceStyles);
}

/*
 * Settings for email template
 */

function emailHtml() {
    return src([SRC + 'email/*.pug', '!' + SRC + 'email/_*.pug'], { since: lastRun(html) })
        .pipe(pug({ pretty: '    ' }))
        .pipe(rename({ dirname: '' }))
        .pipe(dest(DEST + 'email'))
        .pipe(browserSync.stream({once: true}));
}

function emailCss() {
    return src(SRC + 'email/*.scss', { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest(DEST + 'email', { sourcemaps: true }))
        .pipe(browserSync.stream());
}

function emailWatcher() {
    browserSync.init({
        server: DEST,
        port: 8192
    });
    watch(SRC + 'email/*.pug', emailHtml);
    watch(SRC + 'email/*.scss', emailCss);
}

/*
 * Settings admin template
 */
function adminCss() {
    return src(SRC + 'admin/*.scss', { sourcemaps: true })
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest(DEST + 'admin/css', { sourcemaps: true }))
        .pipe(browserSync.stream());
}

function adminHtml() {
    return src(SRC + 'admin/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(rename({ dirname: '' })) // Để output ra đúng nơi
        .pipe(dest(DEST + 'admin'))
        .pipe(browserSync.stream());
}

function adminJs() {
    return src(SRC + 'admin/*.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(dest(DEST + 'admin/js'))
        .pipe(uglify()) // Nén file JS
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest(DEST + 'admin/js'))
        .pipe(browserSync.stream());
}


// function adminJs() {
//     return src(SRC + 'admin/*.js')
//         .pipe(dest(DEST + 'admin'));
// }

function adminWatcher() {
    browserSync.init({
        server: {
            baseDir: ADMIN,
            index: "bm-index.html"  
        },
        port: 8192
    });

    watch(SRC + 'admin/*.scss', adminCss);
    watch(SRC + 'admin/*.pug', adminHtml);
    watch(SRC + 'admin/*.js', adminJs);
}

/*
 * Specify if tasks run in series or parallel using `series` and `parallel`
 */

const build = series(clean, icons, images, fonts, bootstrap, pluginsJs, bundleCss, bundleJs, html, css, js, tinymce, tinymceStyles, adminCss, adminHtml, adminJs, adminWatcher);
const start = series(icons, html, css, js, watcher);
const plugins = parallel(pluginsJs, bundleCss, bundleJs, tinymce, tinymceStyles);
const email = series(emailHtml, emailCss, emailWatcher);
const admin = series(adminCss, adminHtml, adminJs, adminWatcher);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */

exports.clean = clean;
exports.bootstrap = bootstrap;
exports.fonts = fonts;
exports.html = html;
exports.css = css;
exports.js = js;
exports.bundleCss = bundleCss;
exports.bundleJs = bundleJs;
exports.images = images;
exports.icons = icons;
exports.build = build;
exports.start = start;
exports.plugins = plugins;
exports.email = email;
exports.admin = admin;

/*
 * Define default task that can be called by just running `gulp` from cli
 */

exports.default = build;