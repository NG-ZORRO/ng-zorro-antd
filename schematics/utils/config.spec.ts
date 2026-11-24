/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { getProjectFromWorkspace } from '@angular/cdk/schematics';

import { Tree } from '@angular-devkit/schematics';
import { readWorkspace } from '@schematics/angular/utility';

import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { getAppOptions } from './config';

describe('layout schematic component defaults', () => {
  it('merges explicit global, workspace and project options in CLI order', async () => {
    const configHome = await mkdtemp(join(tmpdir(), 'ng-zorro-schematic-config-'));
    vi.stubEnv('XDG_CONFIG_HOME', configHome);

    try {
      const globalConfigDir = join(configHome, 'angular');
      await mkdir(globalConfigDir);
      await writeFile(
        join(globalConfigDir, 'config.json'),
        JSON.stringify({
          version: 1,
          schematics: { '@schematics/angular:component': { inlineStyle: true, style: 'sass' } }
        })
      );

      const tree = Tree.empty();
      tree.create(
        '/angular.json',
        JSON.stringify({
          version: 1,
          schematics: { '@schematics/angular:component': { exportDefault: true, style: 'scss' } },
          projects: {
            app: {
              projectType: 'application',
              root: 'projects/app',
              schematics: {
                '@schematics/angular:component': { type: 'flat' },
                '@schematics/angular': { component: { type: 'nested', style: 'less' } }
              }
            }
          }
        })
      );

      const workspace = await readWorkspace(tree);
      const project = getProjectFromWorkspace(workspace, 'app');
      expect(await getAppOptions(workspace, project)).toEqual({
        componentOptions: { exportDefault: true, inlineStyle: true, style: 'less', type: 'nested' },
        sourceDir: 'projects/app/src/app'
      });
    } finally {
      vi.unstubAllEnvs();
      await rm(configHome, { recursive: true, force: true });
    }
  });
});
