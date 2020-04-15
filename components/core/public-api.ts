/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NZ_CONFIG as NZ_CONFIG_FORM_CORE, NzConfig as NzConfigFormCore } from './config/config';
import { NzConfigService as NzConfigServiceFromCore } from './config/config.service';
import { NzNoAnimationModule as NzNoAnimationModuleFromCore } from './no-animation/nz-no-animation.module';
import { NzTreeNode as NzTreeNodeFromCore, NzTreeNodeOptions as NzTreeNodeOptionsFromCore } from './tree/nz-tree-base-node';
import {
  NzFormatBeforeDropEvent as NzFormatBeforeDropEventFromCore,
  NzFormatEmitEvent as NzFormatEmitEventFromCore
} from './tree/nz-tree-base.definitions';

/**
 * @deprecated This entry port will be removed,
 * use `import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation'` instead.
 * @breaking-change 10.0.0
 */
export const NzNoAnimationModule = NzNoAnimationModuleFromCore;

/**
 * @deprecated This entry port will be removed,
 * use `import { NZ_CONFIG } from 'ng-zorro-antd/core/config'` instead.
 * @breaking-change 10.0.0
 */
export const NZ_CONFIG = NZ_CONFIG_FORM_CORE;

/**
 * @deprecated This entry port will be removed,
 * use `import { NzConfig } from 'ng-zorro-antd/core/config'` instead.
 * @breaking-change 10.0.0
 */
export type NzConfig = NzConfigFormCore;

/**
 * @deprecated This entry port will be removed,
 * use `import { NzConfigService } from 'ng-zorro-antd/core/config'` instead.
 * @breaking-change 10.0.0
 */
export const NzConfigService = NzConfigServiceFromCore;

/**
 * @deprecated This entry port will be removed,
 * use `import { NzTreeNodeOptions } from 'ng-zorro-antd/tree'` instead.
 * @breaking-change 10.0.0
 */
export type NzTreeNodeOptions = NzTreeNodeOptionsFromCore;

/**
 * @deprecated This entry port will be removed,
 * use `import { NzFormatEmitEvent } from 'ng-zorro-antd/tree'` instead.
 * @breaking-change 10.0.0
 */
export type NzFormatEmitEvent = NzFormatEmitEventFromCore;

/**
 * @deprecated This entry port will be removed,
 * use `import { NzFormatBeforeDropEvent } from 'ng-zorro-antd/tree'` instead.
 * @breaking-change 10.0.0
 */
export type NzFormatBeforeDropEvent = NzFormatBeforeDropEventFromCore;

/**
 * @deprecated This entry port will be removed,
 * use `import { NzTreeNode } from 'ng-zorro-antd/tree'` instead.
 * @breaking-change 10.0.0
 */
export type NzTreeNode = NzTreeNodeFromCore;
