#! /bin/sh -e

. ./conf.sh

NODE_ENV=$NODE_ENV \
		browserify \
		-r react \
		-r react-dom \
		-t babelify \
		-o $OUTD/react-with-dom.js

# works without it
# -t envify \

if [ "$NODE_ENV" = "production" ]; then

	uglifyjs \
		--compress=dead_code,evaluate,loops,unused \
		--mangle \
		-o $OUTD/react-with-dom.min.js \
		$OUTD/react-with-dom.js

fi
