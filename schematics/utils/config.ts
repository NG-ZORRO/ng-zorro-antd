/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { json, normalize, workspaces } from '@angular-devkit/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import type { Schema } from '@schematics/angular/component/schema';
import type { ProjectDefinition, WorkspaceDefinition } from '@schematics/angular/utility';

import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

function getComponentDefaults(schematics: json.JsonValue | undefined): Partial<Schema> {
  if (!schematics || !json.isJsonObject(schematics)) {
    return {};
  }

  const qualified = schematics['@schematics/angular:component'];
  const collection = schematics['@schematics/angular'];
  const nested = collection && json.isJsonObject(collection) ? collection['component'] : undefined;

  return {
    ...(qualified && json.isJsonObject(qualified) ? qualified : {}),
    ...(nested && json.isJsonObject(nested) ? nested : {})
  };
}

async function readGlobalSchematicDefaults(): Promise<Partial<Schema>> {
  const home = homedir();
  if (!home) {
    return {};
  }

  // Match the Angular CLI's global configuration lookup order.
  const xdgConfigHome = process.env['XDG_CONFIG_HOME'];
  const angularConfigDir = join(xdgConfigHome || join(home, '.config'), 'angular');
  const config = [
    join(angularConfigDir, 'config.json'),
    join(xdgConfigHome || angularConfigDir, '.angular-config.json'),
    join(home, '.angular-config.json')
  ].find(file => existsSync(file));
  if (!config) {
    return {};
  }

  const host = workspaces.createWorkspaceHost(new NodeJsSyncHost());
  const { workspace } = await workspaces.readWorkspace(config, host, workspaces.WorkspaceFormat.JSON);
  return getComponentDefaults(workspace.extensions['schematics']);
}

export async function getAppOptions(
  workspace: WorkspaceDefinition,
  project: ProjectDefinition
): Promise<{
  componentOptions: Partial<Schema>;
  sourceDir: string;
}> {
  const componentOptions = {
    ...(await readGlobalSchematicDefaults()),
    ...getComponentDefaults(workspace.extensions['schematics']),
    ...getComponentDefaults(project.extensions['schematics'])
  };
  componentOptions.type ??= '';

  const appDir = normalize(project.root);
  const sourceDir = `${appDir}/src/app`;

  return {
    componentOptions,
    sourceDir
  };
}
