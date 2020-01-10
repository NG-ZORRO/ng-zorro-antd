import { buildConfig } from '../build-config';

const fs = require('fs-extra');
const path = require('path');

export function setVersion(): void {
  fs.outputFileSync(
    path.join(buildConfig.projectDir, `schematics/utils/version-names.ts`),
    `
export const zorroVersion = '^${buildConfig.projectVersion}';
export const hammerjsVersion = '^2.0.8';
`);
}
