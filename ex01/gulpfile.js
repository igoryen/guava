var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var sassdoc = require('sassdoc');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');

var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');

var strip = require('gulp-strip-comments');

gulp.task('default', defaultTask);

function defaultTask(done) {  
  done(); // 5
}

var input = [
  'css/ante/style.scss',
  'css/ante/interlinear.scss'

  // 'css/debug-desktop-first.scss', 
  // 'css/ante/debug-mobile-first.scss', 
  // 'css/ante/globals.scss',
   
  // 'css/ante/styles1.scss', 
  // 'css/ante/styles2.scss'  
];

var output = 'css/compiled/';

var inputjs = [
  'js/scripts.js'
  // 'js/scripts2.js'  
];
var outputjs = 'js/compiled/';

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
}; // 4

var autoprefixerOptions = {
  browsers: [
    // 'last 2 versions', 
    // '> 5%', 
    // 'Firefox ESR'
    '> 1%', 
    'last 2 versions', 
    'firefox >= 4', 
    'safari 7', 
    'safari 8', 
    'IE 8', 
    'IE 9', 
    'IE 10', 
    'IE 11'
  ]
};

var sassdocOptions = {
  dest: 'sassdoc'
};

gulp.task('sass', function () {
    return gulp    
    .src(input) // 1    

    .pipe(sourcemaps.init()) // 
    
    // .pipe(sass()) // 2
    .pipe(sass(sassOptions).on('error', sass.logError)) // 4
    
    
    
    // .pipe(autoprefixer()) // 8
    .pipe(autoprefixer(autoprefixerOptions)) // 9

    .pipe(concat('all.css'))


    // .pipe(cleanCSS())
    // .pipe(sourcemaps.write()) // 6

    .pipe(sourcemaps.write('.')) // 7
    
    .pipe(gulp.dest(output)) // 3

    
});

// 12
gulp.task('sassdoc', function () {
    return gulp
    .src(input)
    // .pipe(sassdoc()) // 10
    .pipe(sassdoc(sassdocOptions)) // 13
    .resume(); // 11
});

gulp.task('scripts', function(){
  return gulp.src(inputjs)
    .pipe(sourcemaps.init())
    // .pipe(useref())
    .pipe(strip()) // uglify strips comments too but also uglifies
    .pipe(concat('all.js')) // concatenates all JS files into one
    // Minifies only if it's a JavaScript file
    // .pipe(gulpIf('*.js', uglify())) // works but deactivated
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputjs))
});

//14
gulp.task('watch', function() {
    return gulp    
    .watch(input, ['sass']) // 15   
    .on('change', function(event) { // 16
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('watch', function() {
    gulp.watch(input, gulp.series('sass')); // 19
    gulp.watch(inputjs, gulp.series('scripts'));
  // gulp.watch('app/img/*', gulp.series('images'));
});


// gulp.task('default', ['sass', 'watch' /*, possible other tasks... */]); // 17

// 18
// gulp.task('prod', ['sassdoc'], function () {
//     return gulp
//     .src(input)
//     .pipe(sass({ outputStyle: 'compressed' }))
//     .pipe(autoprefixer(autoprefixerOptions))
//     .pipe(gulp.dest(output));
// });

// gulp.task('sass', function () {

//  gulp //add gulp without return to keep session going

//  // Find all .scss files from the sass/ folder

//  .src(input)

//  // Run Sass on those files || pipe adds everything together

//  .pipe(sass().on('error', sass.logError)) //error log to keep session going when scss contains error

//  .pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )

//  // Write the resulting CSS in the output folder

//  .pipe(gulp.dest(output));

// });


/*
  https://www.sitepoint.com/simple-gulpy-workflow-sass/

  1. Find all `.scss` files from the `stylesheets/` folder
  2. Run Sass on those files
  3. Write the resulting CSS in the output folder
  4. to compile stylesheets in expanded mode and to print errors in console
  5. place code for your default task here
  6. to have gulp-sourcemaps write the sourcemaps inline in the compiled CSS files. 
  7. to have gulp-sourcemaps write the sourcemaps in separate files instead
    this command should be at the bottom of the list
    before the command to write the CSS output.
  8. the default configuration from Autoprefixer which is 
    - Browsers with over 1% market share,
    - Last 2 versions of all browsers,
    - Firefox ESR,
    - Opera 12.1
  9. using a custom configuration defined in the "autoprefixerOptions"
  10. automatically generate SassDocs
  11. Release the pressure back and trigger flowing mode (drain)
      See: http://sassdoc.com/gulp/#drain-event
  12. have a separate task for generating SassDoc 
    because it can take up to a few of seconds to run (rarely above 3 as far as I’ve noticed), 
    and depending on the size of your project and the number of documented items,
    this might bee too long. 
  13. Using custom configuration
  14. watch for changes in stylesheets to recompile them again
    so you don’t have to run the "sass" task by hand every time you save a file.
  15. Watch the input folder for change, and run `sass` task when something happens
  16. When there is a change, log a message in the console
  17. a list of dependency tasks. 
    Basically, it tells Gulp to run those tasks before running the one specified as a third argument (if any).
  18. a prod task that could be run right before deploying to production (maybe with a git hook). 
    This task should:
    Compile Sass in compressed mode
    Prefix CSS with Autoprefixer
    Regenerate SassDoc documentation
    Avoid any sourcemaps
  19. gulp.watch(A, gulp.series(B)) -- the gulp 4.* way
    A = where to run the task
    B = what task to run (only a single task)
    
*/