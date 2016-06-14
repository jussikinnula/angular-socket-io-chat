'use strict';

const del               = require('del');
const connect           = require('gulp-connect');
const nodemon           = require('gulp-nodemon');
const gulp              = require('gulp');
const gulpUtil          = require('gulp-util');
const historyApi        = require('connect-history-api-fallback');
const livereload        = require('gulp-livereload');
const sourcemaps        = require('gulp-sourcemaps');
const tslint            = require('gulp-tslint');
const webpack           = require('webpack');


//=========================================================
//  PATHS
//---------------------------------------------------------
const paths = {
    src: {
        ts: ['src/*.ts', 'src/**/*.ts'],
        client: ['src/client.ts', 'src/client/**', 'src/styles'],
        server: ['src/server.ts', 'src/server/**'],
        assets: {
            images: 'src/images/*.{png,jpg,svg}',
            styles: 'src/styles/'
        }
    },

    target: 'target'
};


let server = null;

//=========================================================
//  CONFIG
//---------------------------------------------------------
const config = {
    tslint: {
        report: {
            options: {emitError: true},
            type: 'verbose'
        }
    },

    webpack: {
        client: './webpack.client',
        dev: './webpack.dev',
        server: './webpack.server'
    }
};


//=========================================================
//  TASKS
//---------------------------------------------------------
gulp.task('clean', () => del(paths.target));


gulp.task('lint:client', () => {
  return gulp.src(paths.src.ts.client)
    .pipe(tslint())
    .pipe(tslint.report(
      config.tslint.report.type,
      config.tslint.report.options
    ));
});

gulp.task('lint:server', () => {
  return gulp.src(paths.src.ts.server)
    .pipe(tslint())
    .pipe(tslint.report(
      config.tslint.report.type,
      config.tslint.report.options
    ));
});

gulp.task('lint', gulp.series(
    'lint:client',
    'lint:server'
))


// Assets
gulp.task('assets:images', () => {
    return gulp.src([paths.src.assets.images])
        .pipe(gulp.dest(paths.target + '/assets/images'));
});

gulp.task('assets', gulp.series(
    'assets:images'
))


// Webpack
gulp.task('webpack:client', done => {
    let conf = require(config.webpack.client);
    webpack(conf).run((error, stats) => {
        if (error) throw new gulpUtil.PluginError('webpack:client', error);
        gulpUtil.log(stats.toString(conf.stats));
        done();
    });
});

gulp.task('webpack:dev', done => {
    let conf = require(config.webpack.dev);
    webpack(conf).watch(100, (error, stats) => {
        if (error) throw new gulpUtil.PluginError('webpack:dev', error);
        gulpUtil.log(stats.toString(conf.stats));
    });
    done();
});

gulp.task('webpack:server', done => {
    let conf = require(config.webpack.server);
    webpack(conf).run((error, stats) => {
        if (error) throw new gulpUtil.PluginError('webpack:server', error);
        gulpUtil.log(stats.toString(conf.stats));
        done();
    });
});

gulp.task('webpack', gulp.series(
    'webpack:server',
    'webpack:client'
));


// Watch
gulp.task('watch', done => {
    gulp.watch([paths.src.server], gulp.task('webpack:server'));
    gulp.watch([paths.src.assets.images], gulp.task('assets:images'));

    nodemon({
        script: paths.target + '/assets/js/server.js',
        watch: paths.target + '/assets/js/server.js',
        ext: 'js',
        env: { 'NODE_ENV': 'development' },
        ignore: [
           paths.target + '/assets/js/client.js',
           paths.target + '/assets/js/vendor.js',
           paths.assets
        ]
    })
    .on('restart', function () {
        console.log('Server restarted!');
    });

    console.log("Server started!");

    done();
});


//===========================
//  DEVELOPMENT
//---------------------------
gulp.task('compile', gulp.series(
    'clean',
    'webpack',
    'assets'
));


//===========================
//  RELEASE
//---------------------------
gulp.task('build', gulp.series(
    'lint',
    'compile'
));


//===========================
//  DEFAULT
//---------------------------
gulp.task('default', gulp.series(
    'clean',
    'assets',
    'webpack:server',
    'webpack:dev',
    'watch'
));
