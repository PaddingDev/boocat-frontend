@ECHO OFF
cd dist
COPY index.html 404.html
ECHO boocat.org>CNAME
type NUL > .nojekyll
PAUSE