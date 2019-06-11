import * as fs from 'fs-extra';
import * as less from 'less';
import * as path from 'path';
import { buildConfig } from '../build-config';

const LessPluginCleanCSS = require('less-plugin-clean-css');
const NpmImportPlugin = require('less-plugin-npm-import');

function compileLess(content: string, savePath: string, min: boolean, sub?: boolean, rootPath?: string): Promise<Less.RenderOutput> {
  return new Promise((resolve, reject) => {
    // tslint:disable-next-line:no-any
    const plugins: any[] = [];
    const lessOptions: Less.Options = { plugins: plugins, javascriptEnabled: true };

    if (min) {
      plugins.push(new LessPluginCleanCSS({ advanced: true }));
    }

    if (sub) {
      lessOptions.paths = [path.dirname(rootPath as string)];
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

const sourcePath = buildConfig.componentsDir;
const targetPath = buildConfig.publishDir;

export function compile(): Promise<void | Less.RenderOutput[]> {
  const componentFolders = fs.readdirSync(targetPath);
  const promiseList = [];
  componentFolders.forEach((dir: string) => {
    if (fs.existsSync(`${sourcePath}/${dir}/style/index.less`)) {
      // Copy style files for each component.
      fs.copySync(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);

      // Compile less files to CSS and delete the `entry.less` file.
      const buildFilePath = `${sourcePath}/${dir}/style/entry.less`;
      if (fs.existsSync(buildFilePath)) {
        promiseList.push(compileLess(
          fs.readFileSync(buildFilePath, { encoding: 'utf8' }),
          path.join(targetPath, dir, 'style', `index.css`),
          false,
          true,
          buildFilePath
        ));
        promiseList.push(compileLess(
          fs.readFileSync(buildFilePath, { encoding: 'utf8' }),
          path.join(targetPath, dir, 'style', `index.min.css`),
          true,
          true,
          buildFilePath
        ));
      }
    }
  });

// Copy concentrated less files.
  fs.copySync(path.resolve(sourcePath, 'style'), path.resolve(targetPath, 'style'));
  fs.writeFileSync(`${targetPath}/components.less`, fs.readFileSync(`${sourcePath}/components.less`));
  fs.writeFileSync(`${targetPath}/ng-zorro-antd.less`, fs.readFileSync(`${sourcePath}/ng-zorro-antd.less`));

// Compile concentrated less file to CSS file.
  const lessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.less')}";`;
  promiseList.push(compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.css'), false));
  promiseList.push(compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.min.css'), true));

// Compile css file that doesn't have component-specific styles.
  const cssIndexPath = path.join(sourcePath, 'style', 'entry.less');
  const cssIndex = fs.readFileSync(cssIndexPath, { encoding: 'utf8' });
  promiseList.push(compileLess(cssIndex, path.join(targetPath, 'style', 'index.css'), false, true, cssIndexPath));
  promiseList.push(compileLess(cssIndex, path.join(targetPath, 'style', 'index.min.css'), true, true, cssIndexPath));
  return Promise.all(promiseList).catch(e => console.log(e))
}
