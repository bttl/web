#! /bin/sh -e

. ./conf.sh

if [ "$NODE_ENV" = "production" ]; then

	html-minifier \
		--remove-comments \
		--remove-tag-whitespace \
		--collapse-whitespace \
		--minify-css \
		-o $OUTD/battle.html \
		$SRCD/battle.html

else

	cp $SRCD/battle-dev.html $OUTD/battle.html

fi

cp $SRCD/favicon.ico $OUTD/favicon.ico
