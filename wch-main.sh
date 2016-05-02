#! /bin/sh -e

. ./conf.sh

watchify \
	-o $OUTD/bundle.js \
	-v -d \
	-x react-dom \
	-x react \
	-t babelify \
	--presets es2015
	$SRCD/app.js

#	--plugins babel-preset-es2015 \
