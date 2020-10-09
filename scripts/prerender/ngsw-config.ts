import * as child_process from 'child_process';
import { readFile, writeFile } from 'fs-extra';
import { resolve } from 'path';
import { buildConfig } from '../build-config';
const minify = require('html-minifier').minify;

const minifyIndex = async () => {
  const indexHTMLPath = resolve(buildConfig.outputDir, 'index.html');
  const input = await readFile(indexHTMLPath);
  const output = minify(input.toString('UTF-8'), {
    removeComments: true,
    collapseWhitespace: true,
    preserveLineBreaks: true
  })
  await writeFile(indexHTMLPath, output);
}

export const generate = async () => {
  await minifyIndex();
  return new Promise((res, reject) => {
    const childProcess = child_process.spawn('node_modules/.bin/ngsw-config', ['dist', 'ngsw-config.json'], {
      env: { ...process.env },
      cwd: buildConfig.projectDir,
      stdio: ['pipe', 'ignore', 'ignore']
    });
    childProcess.on('close', (code: number) => {
      // tslint:disable-next-line:triple-equals
      code != 0 ? reject(`Process failed with code ${code}`) : res();
    });
  })
}
