#! /bin/sh -e

. ./conf.sh

html-minifier \
	--remove-comments \
	--remove-tag-whitespace \
	--collapse-whitespace \
	--minify-css \
	-o $OUTD/battle.html \
	$SRCD/index.html
