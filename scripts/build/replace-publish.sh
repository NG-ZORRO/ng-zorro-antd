sed 's/components\/ng-zorro-antd.module.ts/publish/g' site/src/tsconfig.app.json > site/src/tsconfig.app.json_back
mv site/src/tsconfig.app.json_back site/src/tsconfig.app.json
