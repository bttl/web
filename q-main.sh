#! /bin/sh -e

. ./conf.sh

NODE_ENV=$NODE_ENV \
		browserify \
		-x react-dom \
		-x react \
		-t babelify \
		-o $OUTD/bundle.js \
		$SRCD/app.js

# -t envify \

if [ "$NODE_ENV" = "production" ]; then

	uglifyjs \
		--compress=dead_code,evaluate,loops,unused \
		--mangle \
		-o $OUTD/bundle.min.js \
		$OUTD/bundle.js
	
fi

# "bbl-main": "babel --minified --no-comments -d lib src",
# "bbl-help": "babel --help",
