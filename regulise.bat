@ECHO OFF
COPY "dist/index.html" "dist/404.html"
ECHO "boocat.org" > dist/CNAME
type NUL > dist/.nojekyll
PAUSE