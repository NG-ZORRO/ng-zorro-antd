/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { Project } from './devkit-utils/config';

/** Resolves the architect options for the build target of the given project. */
export function getProjectTargetOptions(project: Project | any, buildTarget: string) {
  if (project.targets &&
    project.targets[buildTarget] &&
    project.targets[buildTarget].options) {

    return project.targets[buildTarget].options;
  }

  // TODO(devversion): consider removing this architect check if the CLI completely switched
  // over to `targets`, and the `architect` support has been removed.
  // See: https://github.com/angular/angular-cli/commit/307160806cb48c95ecb8982854f452303801ac9f
  if (project.architect &&
    project.architect[buildTarget] &&
    project.architect[buildTarget].options) {

    return project.architect[buildTarget].options;
  }

  throw new Error(`Cannot determine project target configuration for: ${buildTarget}.`);
}
