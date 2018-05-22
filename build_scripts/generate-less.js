const fs = require('fs');
const path = require('path');
const wrench = require('wrench');

const sourcePath = path.resolve(__dirname, '../components');
const targetPath = path.resolve(__dirname, '../publish/src');

const targetFolder = fs.readdirSync(targetPath);
let componentsLessContent = '';
targetFolder.forEach(dir => {
    if (fs.existsSync(`${sourcePath}/${dir}/style/index.less`)) {
      componentsLessContent += `@import "./${path.join(dir, 'style', 'index.less')}";\n`
      wrench.copyDirSyncRecursive(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);
    }
  }
)
wrench.copyDirSyncRecursive(path.resolve(sourcePath, 'style'), path.resolve(targetPath, 'style'));
fs.writeFileSync(`${targetPath}/components.less`, componentsLessContent);
fs.writeFileSync(`${targetPath}/ng-zorro-antd.less`, fs.readFileSync(`${sourcePath}/ng-zorro-antd.less`));