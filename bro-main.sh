#! /bin/sh -e

. ./conf.sh

browserify -o $OUTD/bundle.js \
		   -x react-dom \
		   -x react \
		   -t babelify \
		   $SRCD/app.js

uglifyjs --compress \
		 --mangle \
		 -o $OUTD/bundle.min.js \
		 $OUTD/bundle.js

# "bbl-main": "babel --minified --no-comments -d lib src",
# "bbl-help": "babel --help",
