all:
	browserify lib/core.js -t babelify --outfile bundle.js