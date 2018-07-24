#!/usr/bin/env bash

readonly currentDir=$(cd $(dirname $0); pwd)
cd ${currentDir}
rm -rf publish
rm -rf __gen_components
rm -rf publish-es2015
cp -r components __gen_components
node ./build_scripts/inline-template.js

VERSION=$(node -p "require('./package.json').version")

echo "Package Version: ${VERSION}"
perl -p -i -e "s/0\.0\.0\-PLACEHOLDER/${VERSION}/g" $(grep -ril 0\.0\.0\-PLACEHOLDER __gen_components) < /dev/null 2> /dev/null

echo 'Compiling to es2015 via Angular compiler'
$(npm bin)/ngc -p tsconfig-build.json -t es2015 --outDir publish-es2015/src

echo 'Bundling to es module of es2015'
export ROLLUP_TARGET=esm
$(npm bin)/rollup -c rollup.config.js -f es -i publish-es2015/src/index.js -o publish-es2015/esm2015/antd.js

echo 'Compiling to es5 via Angular compiler'
$(npm bin)/ngc -p tsconfig-build.json -t es5 --outDir publish-es5/src

echo 'Bundling to es module of es5'
export ROLLUP_TARGET=esm
$(npm bin)/rollup -c rollup.config.js -f es -i publish-es5/src/index.js -o publish-es5/esm5/antd.js

echo 'Bundling to umd module of es5'
export ROLLUP_TARGET=umd
$(npm bin)/rollup -c rollup.config.js -f umd -i publish-es5/esm5/antd.js -o publish-es5/bundles/antd.umd.js

echo 'Bundling to minified umd module of es5'
export ROLLUP_TARGET=mumd
$(npm bin)/rollup -c rollup.config.js -f umd -i publish-es5/esm5/antd.js -o publish-es5/bundles/antd.umd.min.js

echo 'Unifying publish folder'
mv publish-es5 publish
mv publish-es2015/esm2015 publish/esm2015
rm -rf publish-es2015

echo 'Cleaning up temporary files'
rm -rf __gen_components
rm -rf publish/src/*.js
rm -rf publish/src/**/*.js

echo 'Normalizing entry files'
sed -e "s/from '.\//from '.\/src\//g" publish/src/index.d.ts > publish/antd.d.ts
sed -e "s/\":\".\//\":\".\/src\//g" publish/src/index.metadata.json > publish/antd.metadata.json
rm publish/src/index.d.ts publish/src/index.metadata.json

echo 'Building schematics'
npm run schematic:demo
npm run schematic:build
rm -rf schematics/demo

echo 'Copying package.json'
cp package.json publish/package.json

echo 'Copying README.md'
cp README.md publish/README.md

node ./build_scripts/generate-less.js