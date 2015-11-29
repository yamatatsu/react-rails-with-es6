gulp = require 'gulp'
babel = require 'gulp-babel'
browserify = require 'browserify'
babelify = require 'babelify'
source = require 'vinyl-source-stream'
glob = require 'glob'

gulp.task 'build', ->
  files = glob.sync './frontend/javascript/components/HelloWorld.jsx' #'./frontend/javascripts/**/*.{js,jsx,coffee}'
  browserify
    entries: files,
    debug: true
  .transform babelify, {presets: ["es2015", "react"]}
  .bundle()
  .pipe source 'bundle.js'
  .pipe gulp.dest 'app/assets/javascripts/components'

gulp.task 'watch', ->
  gulp.watch('./frontend/javascripts/**/*.{js,jsx,coffee}', ['build'])

gulp.task 'default', ['build']
