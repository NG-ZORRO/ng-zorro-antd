/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { copySync, emptyDirSync, removeSync } from 'fs-extra';
import * as minimatch from 'minimatch';

import { join } from 'path';

import { buildConfig } from '../build-config';
import { GitClient } from './git-client';

const docDir = join(buildConfig.projectDir, 'ng-zorro.github.io');

export function releaseSite(version: string): boolean {
  emptyDirSync(docDir);
  const git = new GitClient(docDir, 'https://github.com/NG-ZORRO/ng-zorro.github.io.git');
  const branchName = `release/${version}`;

  git.clone();
  git.checkoutNewBranch(branchName);
  emptyDirSync(docDir);

  copySync(buildConfig.outputDir, docDir, {
    overwrite: true,
    filter: file => {
      const fileGlobs = [
        '.DS_Store',
        '.gitignore',
        'sitemap.js?(.map)',
        'static.paths.js?(.map)',
        'prerender.js?(.map)',
        'server/**/*',
        '.idea/**/*',
        '.vscode/**/*',
        '.git/**/*'
      ].map(f => join(buildConfig.outputDir, f));
      return !fileGlobs.some(p => minimatch.minimatch(file, p));
    }
  });

  git.stageAllChanges();
  git.createNewCommit(`release: ${version}`);
  const pushed = git.pushBranchToRemote(branchName, true);
  removeSync(docDir);
  return pushed;
}
