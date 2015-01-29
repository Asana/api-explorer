var browserify = require('browserify');
var gulp = require('gulp');
var loadPlugins = require('gulp-load-plugins');
var path = require('path');
var uglify = require('gulp-uglify');
var vinylBuffer = require('vinyl-buffer');
var vinylSourceStream = require('vinyl-source-stream');

/**
 * Paths
 */
var index = './index.js';

/**
 * High Level Tasks
 */
gulp.task('lint', ['jshint', 'tslint']);
gulp.task('test', ['lint', 'spec']);
gulp.task('bundle', ['browser', 'browser-min']);
gulp.task('web-setup', ['scripts', 'browser-min', 'public-files']);
gulp.task('default', ['web-setup']);

/**
 * Bundles the code, full version to `asana.js` and minified to `asana-min.js`
 */
function browserTask(minify) {
    return function() {
        var task = browserify(
            {
                entries: [globs.build_index()],
                standalone: 'AsanaTester'
            })
            .bundle()
            .pipe(vinylSourceStream('asana-tester' + (minify ? '-min' : '') + '.js'));
        if (minify) {
            task = task
                .pipe(vinylBuffer())
                .pipe(uglify());
        }
        return task.pipe(gulp.dest(globs.dist()));
    };
}
gulp.task('browser', ['scripts'], browserTask(false));
gulp.task('browser-min', ['scripts'], browserTask(true));

/**
 * Set up files before running the web server.
 */
gulp.task('public-files', ['clean'], function() {
  gulp.src(globs.pubs()).pipe(gulp.dest(globs.dist()));
});

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
    'dts-bundle',
    'del',
    'event-stream',
    'glob',
    'gulp-*',
    'typescript-formatter',
  ].join(',') + '}',
  scope: [
    'devDependencies'
  ]
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
      declarationFiles: true,
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
    return path.join(globs.pub(), '**');
  })
};

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
gulp.task('scripts', ['clean', 'tslint'], function() {
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
            .pipe(_.mocha())
            .pipe(_.istanbul.writeReports())
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
