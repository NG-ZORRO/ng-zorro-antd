const fs = require('fs-extra');
const path = require('path');
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const NpmImportPlugin = require('less-plugin-npm-import');

function compileLess(content, savePath, min, sub, rootPath) {
  return new Promise((resolve, reject) => {
    const plugins = [];
    const lessOptions = { plugins: plugins, javascriptEnabled: true };

    if (min) {
      plugins.push(new LessPluginCleanCSS({ advanced: true }));
    }

    if (sub) {
      lessOptions.paths = [path.dirname(rootPath)];
      lessOptions.filename = rootPath;
      plugins.push(
        new NpmImportPlugin({
          prefix: '~'
        })
      );
    }

    return less
      .render(content, lessOptions)
      .then(({ css }) => {
        fs.writeFileSync(savePath, css);
        resolve();
      })
      .catch(err => reject(err));
  });
}

const sourcePath = path.resolve(__dirname, '../../components');
const targetPath = path.resolve(__dirname, '../../publish');
const componentFolders = fs.readdirSync(targetPath);

componentFolders.forEach(dir => {
  if (fs.existsSync(`${sourcePath}/${dir}/style/index.less`)) {
    // Copy style files for each component.
    fs.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);

    // Compile less files to CSS and delete the `entry.less` file.
    const buildFilePath = `${sourcePath}/${dir}/style/entry.less`;
    if (fs.existsSync(buildFilePath)) {
      compileLess(
        fs.readFileSync(buildFilePath, { encoding: 'utf8' }),
        path.join(targetPath, dir, 'style', `index.css`),
        false,
        true,
        buildFilePath
      ).catch(e => console.log(e));
      compileLess(
        fs.readFileSync(buildFilePath, { encoding: 'utf8' }),
        path.join(targetPath, dir, 'style', `index.min.css`),
        true,
        true,
        buildFilePath
      ).catch(e => console.log(e));
    }
  }
});

// Copy concentrated less files.
fs.copySync(path.resolve(sourcePath, 'style'), path.resolve(targetPath, 'style'));
fs.writeFileSync(`${targetPath}/components.less`, fs.readFileSync(`${sourcePath}/components.less`));
fs.writeFileSync(`${targetPath}/ng-zorro-antd.less`, fs.readFileSync(`${sourcePath}/ng-zorro-antd.less`));

// Compile concentrated less file to CSS file.
const lessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.less')}";`;
compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.css'), false).catch(e => console.log(e));
compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.min.css'), true).catch(e => console.log(e));

// Compile css file that doesn't have component-specific styles.
const cssIndexPath = path.join(sourcePath, 'style', 'entry.less');
const cssIndex = fs.readFileSync(cssIndexPath, { encoding: 'utf8' });
compileLess(cssIndex, path.join(targetPath, 'style', 'index.css'), false, true, cssIndexPath).catch(e =>
  console.log(e)
);
compileLess(cssIndex, path.join(targetPath, 'style', 'index.min.css'), true, true, cssIndexPath).catch(e =>
  console.log(e)
);
