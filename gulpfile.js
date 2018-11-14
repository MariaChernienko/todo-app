const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

const distDirectory = 'dist';
const htmlBlob = 'src/*.html';
const imagesBlob = 'src/images/**';
const fontsBlob = 'src/fonts/**';
const jsBlob = 'src/js/**';
const stylesBlob = 'src/css/**';
const sassBlob = 'src/sass/**';


gulp.task('sass', () => {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('default', () => runSequence('build', 'serve'));
gulp.task('build', () => runSequence(
  'cleanDist',
  ['processStyles', 'processHtml', 'processImages', 'processFonts', 'processJs'],
));
gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: distDirectory,
    },
  });
  gulp.watch(htmlBlob, () => runSequence('processHtml', 'reloadBrowser'));
  gulp.watch(imagesBlob, () => runSequence('processImages', 'reloadBrowser'));
  gulp.watch(fontsBlob, () => runSequence('processFonts', 'reloadBrowser'));
  gulp.watch(stylesBlob, () => runSequence('processStyles', 'reloadBrowser'));
  gulp.watch(sassBlob, () => runSequence('sass', 'reloadBrowser'));
  gulp.watch(jsBlob, () => runSequence('processJs', 'reloadBrowser'));
});
gulp.task('cleanDist', () => gulp.src(distDirectory, { read: false, allowEmpty: true }).pipe(clean()));
gulp.task('processHtml', () => gulp.src(htmlBlob)
  .pipe(gulp.dest(distDirectory)));
gulp.task('processImages', () => gulp.src(imagesBlob)
  .pipe(gulp.dest(`${distDirectory}/images/`)));
gulp.task('processFonts', () => gulp.src(fontsBlob)
  .pipe(gulp.dest(`${distDirectory}/fonts/`)));
gulp.task('processJs', () => gulp.src(jsBlob)
  .pipe(gulp.dest(`${distDirectory}/js/`)));
gulp.task('processStyles', () => gulp.src(stylesBlob)
  .pipe(concat('styles.css'))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
  }))
  .pipe(gulp.dest(`${distDirectory}/css`)));
gulp.task('reloadBrowser', (done) => {
  browserSync.reload();
  done();
});
gulp.task('sass', () => gulp.src(sassBlob).pipe(sass()).pipe(gulp.dest(`${distDirectory}/css/`)));
