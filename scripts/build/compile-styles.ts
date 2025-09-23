/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copy, pathExists, readdirSync, readFile, writeFile } from 'fs-extra';
import less from 'less';
import LessPluginCleanCSS from 'less-plugin-clean-css';
import NpmImportPlugin from 'less-plugin-npm-import';

import path from 'path';

import { buildConfig } from '../build-config';

async function compileLess(
  content: string,
  savePath: string,
  min: boolean,
  sub?: boolean,
  rootPath?: string
): Promise<void> {
  const plugins: Less.Plugin[] = [];
  const lessOptions: Less.Options = { plugins };

  if (min) {
    plugins.push(new LessPluginCleanCSS({ advanced: true }));
  }

  if (sub) {
    lessOptions.paths = [path.dirname(rootPath as string)];
    lessOptions.filename = rootPath;
    plugins.push(new NpmImportPlugin({ prefix: '~' }));
  }

  return less
    .render(content, lessOptions)
    .then(({ css }) => writeFile(savePath, css))
    .catch(err => Promise.reject(err));
}

const sourcePath = buildConfig.componentsDir;
const targetPath = buildConfig.publishDir;

export async function compile(): Promise<void | void[]> {
  const componentFolders = readdirSync(targetPath);
  const promiseList: Array<Promise<void>> = [];

  for (const dir of componentFolders) {
    if (await pathExists(`${sourcePath}/${dir}/style/index.less`)) {
      // Copy style files for each component.
      await copy(`${sourcePath}/${dir}/style`, `${targetPath}/${dir}/style`);

      // Compile `.less` files to CSS and delete the `entry.less` file.
      const buildFilePath = `${sourcePath}/${dir}/style/entry.less`;
      const componentLess = await readFile(buildFilePath, { encoding: 'utf8' });
      if (await pathExists(buildFilePath)) {
        // Rewrite `entry.less` file with `root-entry-name`
        const entryLessFileContent = needTransformStyle(componentLess)
          ? `@root-entry-name: default;\n${componentLess}`
          : componentLess;
        promiseList.push(
          compileLess(
            entryLessFileContent,
            path.join(targetPath, dir, 'style', `index.css`),
            false,
            true,
            buildFilePath
          )
        );
        promiseList.push(
          compileLess(
            entryLessFileContent,
            path.join(targetPath, dir, 'style', `index.min.css`),
            true,
            true,
            buildFilePath
          )
        );
      }
    }
  }

  // Copy concentrated `.less` files.
  await copy(path.resolve(sourcePath, 'style'), path.resolve(targetPath, 'style'));
  await writeFile(`${targetPath}/components.less`, await readFile(`${sourcePath}/components.less`));
  await writeFile(`${targetPath}/ng-zorro-antd.less`, await readFile(`${sourcePath}/ng-zorro-antd.less`));
  await writeFile(`${targetPath}/ng-zorro-antd.dark.less`, await readFile(`${sourcePath}/ng-zorro-antd.dark.less`));
  await writeFile(`${targetPath}/ng-zorro-antd.aliyun.less`, await readFile(`${sourcePath}/ng-zorro-antd.aliyun.less`));
  await writeFile(
    `${targetPath}/ng-zorro-antd.compact.less`,
    await readFile(`${sourcePath}/ng-zorro-antd.compact.less`)
  );

  await writeFile(
    `${targetPath}/ng-zorro-antd.variable.less`,
    await readFile(`${sourcePath}/ng-zorro-antd.variable.less`)
  );

  // Compile concentrated less file to CSS file.
  const lessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.less')}";`;
  promiseList.push(compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.css'), false));
  promiseList.push(compileLess(lessContent, path.join(targetPath, 'ng-zorro-antd.min.css'), true));

  // Compile the dark theme less file to CSS file.
  const darkLessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.dark.less')}";`;
  promiseList.push(compileLess(darkLessContent, path.join(targetPath, 'ng-zorro-antd.dark.css'), false));
  promiseList.push(compileLess(darkLessContent, path.join(targetPath, 'ng-zorro-antd.dark.min.css'), true));

  // Compile the compact theme less file to CSS file.
  const compactLessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.compact.less')}";`;
  promiseList.push(compileLess(compactLessContent, path.join(targetPath, 'ng-zorro-antd.compact.css'), false));
  promiseList.push(compileLess(compactLessContent, path.join(targetPath, 'ng-zorro-antd.compact.min.css'), true));

  // Compile the aliyun theme less file to CSS file.
  const aliyunLessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.aliyun.less')}";`;
  promiseList.push(compileLess(aliyunLessContent, path.join(targetPath, 'ng-zorro-antd.aliyun.css'), false));
  promiseList.push(compileLess(aliyunLessContent, path.join(targetPath, 'ng-zorro-antd.aliyun.min.css'), true));

  // Compile the aliyun theme less file to CSS file.
  const variableLessContent = `@import "${path.posix.join(targetPath, 'ng-zorro-antd.variable.less')}";`;
  promiseList.push(compileLess(variableLessContent, path.join(targetPath, 'ng-zorro-antd.variable.css'), false));
  promiseList.push(compileLess(variableLessContent, path.join(targetPath, 'ng-zorro-antd.variable.min.css'), true));

  // Compile css file that doesn't have component-specific styles.
  const cssIndexPath = path.join(sourcePath, 'style', 'entry.less');
  const cssIndex = await readFile(cssIndexPath, { encoding: 'utf8' });
  // Rewrite `entry.less` file with `root-entry-name`
  const entryLessInStyle = needTransformStyle(cssIndex) ? `@root-entry-name: default;\n${cssIndex}` : cssIndex;

  promiseList.push(
    compileLess(entryLessInStyle, path.join(targetPath, 'style', 'index.css'), false, true, cssIndexPath)
  );
  promiseList.push(
    compileLess(entryLessInStyle, path.join(targetPath, 'style', 'index.min.css'), true, true, cssIndexPath)
  );
  return Promise.all(promiseList).catch(e => console.log(e));
}

function needTransformStyle(content: string): boolean {
  return (
    content.includes('../../style/index.less') || content.includes('./index.less') || content.includes('/entry.less')
  );
}
