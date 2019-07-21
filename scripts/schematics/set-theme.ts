import * as fs from 'fs-extra';
import * as path from 'path';
import { buildConfig } from '../build-config';

const theme = fs.readFileSync(path.join(buildConfig.scriptsDir, `site/_site/doc/theme.less`), 'utf8');

export function setTheme(): void {
  fs.outputFileSync(
    path.join(buildConfig.projectDir, `schematics/utils/create-custom-theme.ts`),
    `export function createCustomTheme(): string {
  return \`@import "../node_modules/ng-zorro-antd/ng-zorro-antd.less";
${theme.replace(/`/g, '\\`')}
\`;
}
`);
}
