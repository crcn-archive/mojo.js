all:
	coffee -o public/lib -c src;
	cp -rf public/lib lib;
	jam rebuild;

all-watch:
	coffee -o lib -cw src;

clean:
	rm -rf public/lib
	rm -rf lib


test: 
	mocha . --timeout 99999

link:
	ln -s `cbd dir mojo` `cbd dir dojo`/public/js/teacher/web/vendor
