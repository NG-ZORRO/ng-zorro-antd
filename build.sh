#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}
rm -rf src/release
cp -r src/components src/__gen_components
node ./less.convert.js
cd src/__gen_components && ../../node_modules/@angular/compiler-cli/src/main.js
cd .. && rm -rf __gen_components
