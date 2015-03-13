var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var path = require('path');
var envify = require('envify/custom');

/**
 * High Level Tasks
 */
gulp.task('lint', ['jshint', 'tslint']);
gulp.task('test', ['lint', 'spec']);
gulp.task('bundle', ['browser', 'browser-min']);
gulp.task('web-setup', ['scripts', 'bundle', 'public-files']);
gulp.task('default', ['web-setup', 'server', 'watch']);

/**
 * Gulpfile variables
 */
var _, env, globs, val;

/**
 * A gulp lazy loader for plugins
 * @type {Object}
 */
_ = loadPlugins({
  pattern: '{' + [
    'browser-sync',
    'browserify',
    'dts-bundle',
    'del',
    'event-stream',
    'glob',
    'gulp-*',
    'jsdom',
    'typescript-formatter',
    'vinyl-buffer',
    'vinyl-source-stream'
  ].join(',') + '}',
  scope: [
    'devDependencies'
  ],
  rename: {
    'gulp-gh-pages': 'gh_deploy'
  }
});

/**
 * Runs a function once and caches the value
 * @param  {Function} fn The value constructor
 * @return {Function}    The value accessor
 */
val = function(fn) {
  var value;
  return function() {
    if (value === undefined) {
      value = fn();
    }
    return value;
  };
};

/**
 * Task environment
 * @type {Object}
 */
env = {
  isTest: val(function() {
    return env.task() === 'test';
  }),
  isTravis: val(function() {
    return process.env.TRAVIS !== undefined;
  }),
  project: val(function() {
    return _.typescript.createProject({
      declarationFiles: false,
      module: 'commonjs',
      noExternalResolve: true,
      noImplicitAny: true,
      noLib: false,
      removeComments: true,
      sortOutput: false,
      target: 'ES5'
    });
  }),
  task: val(function() {
    return gulp.seq[gulp.seq.length - 1];
  })
};


/**
 * File globs
 * @type {Object}
 */
globs = {
  build: val(function() {
    return '_build';
  }),
  dist: val(function() {
    return 'dist';
  }),
  dists: val(function() {
    return path.join(globs.dist(), '**', '*');
  }),
  dts: val(function() {
    return [
      globs.ts(),
      'lib/**/*.d.ts',
      'typings/**/*.d.ts'
    ];
  }),
  gulp: val(function() {
    return 'gulpfile.js';
  }),
  scripts: val(function() {
    return path.join(globs.build(), globs.src(), '**', '*.js');
  }),
  src: val(function() {
    return 'src';
  }),
  test: val(function() {
    return 'test';
  }),
  tests: val(function() {
    return path.join(globs.build(), globs.test(), '**', '*.js');
  }),
  ts: val(function() {
    return path.join(
        '{' + globs.src() + ',' + globs.test() + '}', '**', '*.ts');
  }),
  build_index: val(function() {
    return './' + path.join(globs.build(), globs.src(), 'index.js');
  }),
  pub: val(function() {
    return 'public';
  }),
  pubs: val(function() {
    return path.join(globs.pub(), '**', '*.{html,css}');
  })
};

/**
 * Bundles the code, full version to `asana.js` and minified to `asana-min.js`
 */
function browserTask(minify, use_gh_pages) {
    return function() {
        var task = _.browserify(
            {
                entries: [globs.build_index()],
                standalone: 'AsanaTester'
            })
            .transform(envify({ USE_GH_PAGES: use_gh_pages || false }))
            .bundle()
            .pipe(_.vinylSourceStream('asana-tester' + (minify ? '-min' : '') + '.js'));
        if (minify) {
            task = task
                .pipe(_.vinylBuffer())
                .pipe(_.uglify());
        }
        return task.pipe(gulp.dest(globs.dist()));
    };
}
gulp.task('browser', ['scripts'], browserTask(false));
gulp.task('browser-min', ['scripts'], browserTask(true));
gulp.task('browser-gh-pages', ['scripts'], browserTask(false, true));

/**
 * Set up files before running the web server.
 */
gulp.task('public-files', function() {
  gulp.src(globs.pubs()).pipe(gulp.dest(globs.dist()));
});

/**
 * Run a simple server for running the API tester.
 */
gulp.task('server', ['web-setup'], function() {
  _.browserSync({
    ghostMode: false,
    notify: false,
    online: false,
    port: process.env.PORT || 8338,
    server: {
      baseDir: globs.dist(),
    }
  });
});


/**
 * Watch for changes for live reloading.
 */
gulp.task('watch', function() {
  gulp.watch(globs.ts(), ['browser', _.browserSync.reload]);
  gulp.watch(globs.pubs(), ['public-files', _.browserSync.reload]);
});

/**
 * Cleans the build artifacts
 */
gulp.task('clean', function(callback) {
  _.del([
    globs.build(),
    globs.dist()
  ], callback);
});

/**
 * Auto format the TypeScript files
 */
gulp.task('format', function(callback) {
  _.glob(globs.ts(), function(err, files) {
    if (err) {
      return callback(err);
    }
    _.typescriptFormatter.processFiles(files, {
      editorconfig: false,
      replace: true,
      tsfmt: false,
      tslint: true
    });
    return callback(null);
  });
});

/**
 * Lint the JavaScript files
 */
gulp.task('jshint', function() {
  return gulp.src(globs.gulp())
      .pipe(_.jshint())
      .pipe(_.jshint.reporter('jshint-stylish'))
      .pipe(_.if(env.isTest(), _.jshint.reporter('fail')));
});


/**
 * Processes the TypeScript files
 */
gulp.task('scripts', ['tslint'], function() {
  var hasError = false;
  var compiler = gulp.src(globs.dts())
      .pipe(_.typescript(env.project()));
  var dts = compiler.dts
      .pipe(gulp.dest(globs.build()));
  var js = compiler.js
      .on('error', function() {
        hasError = true;
      })
      .on('end', function() {
        if (env.isTest() && hasError) {
          process.exit(8);
        }
      })
      .pipe(gulp.dest(globs.build()));
  return _.eventStream.merge(dts, js);
});

/**
 * Run the tests
 */
gulp.task('spec', ['scripts'], function(callback) {
  // Don't clutter test output for React isDOMNode warnings
  var consoleWarn = console.warn;
  console.warn = function(message) {
    if (message.indexOf("getDOMNode") === -1) {
      consoleWarn.apply(null, arguments);
    }
  };

  // Set up globals to emulate running on the browser.
  if (global.document === undefined) {
    // These need to exist before requiring React so canUseDOM is true.
    global.document = _.jsdom.jsdom("<body></body>");
    global.window = global.document.parentWindow;
    global.navigator = global.window.navigator;
  }

  var reporters = ['text', 'text-summary'];
  if (!env.isTravis()) {
    reporters.push('html');
  }

  gulp.src(globs.scripts())
      .pipe(_.istanbul({
        includeUntested: true
      }))
      .pipe(_.istanbul.hookRequire())
      .on('finish', function() {
        gulp.src(globs.tests())
            .pipe(_.mocha({
            reporter: env.isTravis() ? "spec" : "nyan"
          }))
            .pipe(_.istanbul.writeReports({
            reporters: ["text-summary", "html"]
          }))
            .on('end', callback);
      });
});

/**
 * Lint the TypeScript files
 */
gulp.task('tslint', function() {
  return gulp.src(globs.ts())
      .pipe(_.tslint())
      .pipe(_.tslint.report({
        emitError: env.isTest()
      }));
});

/**
 * Push to gh-pages branch.
 */
gulp.task('gh-pages', ['browser-gh-pages', 'public-files'], function() {
  return gulp.src(globs.dists()).pipe(_.gh_deploy({}));
});
