#! /bin/sh -e

. ./conf.sh

watchify \
	-v -d \
	-x react-dom \
	-x react \
	-t babelify \
	-o $OUTD/bundle.js \
	$SRCD/app.js
