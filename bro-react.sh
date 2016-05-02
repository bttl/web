#! /bin/sh -e

. ./conf.sh

browserify \
	-r react \
	-r react-dom \
	-o $OUTD/react-with-dom.js

uglifyjs \
	--compress \
	--mangle \
	-o $OUTD/react-with-dom.min.js \
	$OUTD/react-with-dom.js
