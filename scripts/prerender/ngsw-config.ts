import * as child_process from 'child_process';
import { sync as glob } from 'glob';
import { resolve } from 'path';
import { buildConfig } from '../build-config';
import { minifyFile } from './minify';

const distFiles: {
  [key: string]: string[]
} = {
  html: [
    'index.html',
    'docs/**/index.html',
    'experimental/**/index.html',
    'components/**/index.html'
  ],
  js: ['ngsw-worker.js', 'worker-basic.min.js', 'safety-worker.js'],
  json: ['manifest.json']
}

async function minifyFiles(): Promise<void> {
  for (const type of Object.keys(distFiles)) {
    const paths: string[] = distFiles[type].map(pattern => glob(pattern, { cwd: buildConfig.outputDir })).reduce((a, b) => [...a, ...b], []);
    for (const contentPath of paths) {
      await minifyFile(resolve(buildConfig.outputDir, contentPath), type);
    }
  }
}

export const generate = async () => {
  await minifyFiles();
  return new Promise((res, reject) => {
    const childProcess = child_process.spawn('node_modules/.bin/ngsw-config', ['dist', 'ngsw-config.json'], {
      env: { ...process.env },
      cwd: buildConfig.projectDir,
      stdio: ['pipe', 'ignore', 'ignore']
    });
    childProcess.on('close', (code: number) => {
      code !== 0 ? reject(`Process failed with code ${code}`) : res();
    });
  })
}
