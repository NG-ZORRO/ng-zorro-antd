sed 's/components\/ng-zorro-antd.module.ts/publish/g
s/components/publish/g' site/tsconfig.app.json > site/tsconfig.app.json_back
mv site/tsconfig.app.json_back site/tsconfig.app.json
