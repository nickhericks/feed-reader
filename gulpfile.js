/*eslint-env node */

/*
	===========================================
	TO USE GULP AND THESE PLUGINS ON A PROJECT:
	===========================================

	1. Node and npm should already be installed, but if not do that first.
	2. Add this gulpfile.js file to the root project directory.
	3. Open the Terminal/command line (CLI) and cd to the project directory.
	4. Run in the CLI: npm init
 			- This will create a package.json file.
			- Give it a title and leave all other fields blank.
	5. Run each of the following, separately in the CLI:
				npm install --save-dev gulp
				npm install --save-dev gulp-sass
				npm install --save-dev gulp-autoprefixer
				npm install --save-dev browser-sync
				npm install --save-dev gulp-eslint
				npm install --save-dev gulp-jasmine-phantom
				npm install --save-dev gulp-jasmine
				npm install --save-dev jasmine-jquery
				npm install --save-dev gulp-concat
				npm install --save-dev gulp-uglify
				npm install --save-dev gulp-babel babel-core babel-preset-env
				npm install --save-dev gulp-sourcemaps
				npm install --save-dev gulp-imagemin
				npm install --save-dev imagemin-pngquant
	6. If using Github, be sure to create a .gitignore file and have it ignore
	   node_modules so that the large directory doesn't get uploaded to Github.
		 Instructions here: https://discussions.udacity.com/t/how-to-remove-node-modules-directory-from-github-respository/40929
		 		- Create a file called					.gitignore
				- In the .gitignore file, add		node_modules
				- Run in the CLI								git rm -r --cached node_modules
*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
// var jasminePhantom = require('gulp-jasmine-phantom');
var jasmine = require('gulp-jasmine');
var jasmineJquery = require('jasmine-jquery');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');


// Default task is run automatically when you run 'gulp' in the CLI
// It also starts the watchers to act when files are saved
gulp.task('default', ['copy-html', 'copy-images', 'styles', 'scripts'], function() {
	gulp.watch('css/**/*.css', ['styles']);
	gulp.watch('*.html').on('change', browserSync.reload);
	gulp.watch('css/**/*.css', browserSync.reload);
	gulp.watch('js/**/*.js', browserSync.reload);
	gulp.watch('js/**/*.js', ['lint']);
	gulp.watch('./dist/index.html', ['copy-html']);
	browserSync.init({
		server: './dist'
	});
});

// Run 'gulp dist' when ready to prepare everything for production
// This will run the following tasks preparing our code in the dist folder.
gulp.task('dist', [
	'copy-html',
	'copy-images',
	'styles',
	'lint',
	'scripts-dist'
]);

// Add vendor prefixes for browsers and reload browser when files change
gulp.task('styles', function() {
	gulp.src('css/**/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});

// Concatenates JS files into one and places it in the dist directory
gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});

// Use when ready to distribute files for production
// Concatenates JS files into one and places it in the dist directory
// Also, minify the concatonated JS file.
gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});

// To make a copy of the index.html file in the dist directory
gulp.task('copy-html', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

// To make a copy of the images in the dist directory
gulp.task('copy-images', function() {
	gulp.src('img/*')
		.pipe(gulp.dest('dist/img'));
});

// Image compression
gulp.task('crunch-images', function() {
	return gulp.src('img/*')
		.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/img'));
});


// Runs ESlint in the CLI on page refresh
gulp.task('lint', function () {
	return gulp.src(['**/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// Runs test, but only if the test file exists. need to learn more about this...
// gulp.task('tests', function () {
// 	gulp.src('tests/spec/extraSpec.js')
// 		.pipe(jasminePhantom({
// 			integration: true,
// 			vendor: 'js/**/*.js'
// 		}));
// });
