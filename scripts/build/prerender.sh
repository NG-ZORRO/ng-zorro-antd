#!/usr/bin/env bash

set -x
set -e

kill `lsof -t -i :4000` || true

npx http-server-spa dist index.html 4000 &

rm -fr /tmp/doc-prerender || true

npx prerender mirror -r /tmp/doc-prerender/ http://localhost:4000/

kill `lsof -t -i :4000` || true

mv /tmp/doc-prerender/localhost:4000/index.html /tmp/doc-prerender/localhost:4000/index_static.html
cp -r /tmp/doc-prerender/localhost:4000/* dist/

set +x
set +e
