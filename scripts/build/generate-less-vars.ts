import * as fs from 'fs-extra';
import * as path from 'path';
import { buildConfig } from '../build-config';
import { compactPaletteLess } from './compact-vars';
import { darkPaletteLess } from './dark-vars';

export function generateLessVars(): void {
  const dist = buildConfig.publishDir;
  fs.writeFileSync(path.join(dist, 'dark-theme.js'), `module.exports = ${JSON.stringify(darkPaletteLess)}`, 'utf8');
  fs.writeFileSync(path.join(dist, 'compact-theme.js'), `module.exports = ${JSON.stringify(compactPaletteLess)}`, 'utf8');
}
