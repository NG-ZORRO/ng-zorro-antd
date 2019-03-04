const fs = require('fs-extra');
const path = require('path');

const sourcePath = path.resolve(__dirname, `../../publish`);
const targetPath = path.resolve(__dirname, `../../publish/src`);

fs.mkdirsSync(targetPath);
fs.copySync(path.resolve(sourcePath, `style`), path.resolve(targetPath, `style`));
fs.copySync(path.resolve(sourcePath, `ng-zorro-antd.css`), path.resolve(targetPath, `ng-zorro-antd.css`));
fs.copySync(path.resolve(sourcePath, `ng-zorro-antd.min.css`), path.resolve(targetPath, `ng-zorro-antd.min.css`));
fs.outputFileSync(path.resolve(targetPath, `ng-zorro-antd.less`), `@import "../style/index.less";
@import "../components.less";`);
