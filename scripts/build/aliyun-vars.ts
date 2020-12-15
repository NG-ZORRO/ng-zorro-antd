import * as fs from 'fs-extra';
import * as path from 'path';
import { buildConfig } from '../build-config';

// tslint:disable-next-line:no-any
const lessToJs = require('less-vars-to-js') as any;

const stylePath = path.join(buildConfig.componentsDir, 'style');
const aliyunLess = fs.readFileSync(path.join(stylePath, 'themes', 'aliyun.less'), 'utf8');

export const aliyunPaletteLess = lessToJs(`${aliyunLess}`, {
  stripPrefix: true,
  resolveVariables: false
});
