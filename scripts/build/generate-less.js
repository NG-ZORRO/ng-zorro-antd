const fs = require('fs-extra');
const path = require('path');
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');

function compileLess(content, savePath, min) {
  return new Promise((resolve, reject) => {
    const plugins = [];
    if (min) {
      const cleanCSSPlugin = new LessPluginCleanCSS({advanced: true});
      plugins.push(cleanCSSPlugin);
    }
    return less.render
      .call(less, content, { plugins })
      .then(({ css }) => {
        fs.writeFileSync(savePath, css);
        resolve();
      })
      .catch(err => reject(err));
  });
}

const sourcePath = path.resolve(__dirname, '../../components');
const targetPath = path.resolve(__dirname, '../../publish');

const targetFolder = fs.readdirSync(targetPath);
let componentsLessContent = '';
targetFolder.forEach(dir => {
    if (fs.existsSync(`${sourcePath}/${dir}/style/index.less`)) {
      componentsLessContent += `@import "./${path.join(dir, 'style', 'index.less')}";\n`
      fs.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);
    }
  }
)
fs.copySync(path.resolve(sourcePath, 'style'), path.resolve(targetPath, 'style'));
fs.writeFileSync(`${targetPath}/components.less`, componentsLessContent);
fs.writeFileSync(`${targetPath}/ng-zorro-antd.less`, fs.readFileSync(`${sourcePath}/ng-zorro-antd.less`));

const lessContent = `@import "${path.join(targetPath, 'ng-zorro-antd.less')}";`;
compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.css'), false);
compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.min.css'), true);
