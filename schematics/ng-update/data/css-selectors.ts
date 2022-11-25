/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TargetVersion, VersionChanges } from '@angular/cdk/schematics';

export interface MaterialCssSelectorData {
  /** The CSS selector to replace. */
  replace: string;
  /** The new CSS selector. */
  replaceWith: string;
  /** Whitelist where this replacement is made. If omitted it is made in all files. */
  whitelist?: {
    /** Replace this name in stylesheet files. */
    stylesheet?: boolean,
    /** Replace this name in HTML files. */
    html?: boolean,
    /** Replace this name in TypeScript strings. */
    strings?: boolean
  };
}

export const cssSelectors: VersionChanges<MaterialCssSelectorData> = {
  [TargetVersion.V15]: []
};
