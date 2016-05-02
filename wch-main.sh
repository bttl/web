#! /bin/sh -e

. ./conf.sh

watchify \
	-o $OUTD/bundle.js \
	-v -d \
	-x react-dom \
	-x react \
	-t babelify \
	$SRCD/app.js
