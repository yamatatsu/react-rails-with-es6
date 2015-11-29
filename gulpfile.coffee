gulp = require 'gulp'
babel = require 'gulp-babel'
browserify = require 'browserify'
babelify = require 'babelify'
source = require 'vinyl-source-stream'
glob = require 'glob'

basejsPath = './frontend/javascript/components/TaskEditor.jsx'

gulp.task 'build', ->
  files = glob.sync './frontend/javascript/components/TaskEditor.jsx'
  browserify
    entries: files,
    debug: true
  .transform babelify, {presets: ["es2015", "react"]}
  .bundle()
  .pipe source 'bundle.js'
  .pipe gulp.dest 'app/assets/javascripts/components'

gulp.task 'watch', ->
  gulp.watch('./frontend/javascript/components/**/*.jsx', ['build'])

gulp.task 'default', ['build']
