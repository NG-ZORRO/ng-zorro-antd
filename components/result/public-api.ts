/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export * from './nz-result.module';
export * from './nz-result.component';
export * from './nz-result-cells';

// Making these partial components not visible to users but comprehensible to ng-packagr.
export { NzResultNotFoundComponent as ɵNzResultNotFoundComponent } from './partial/not-found';
export { NzResultServerErrorComponent as ɵNzResultServerErrorComponent } from './partial/server-error.component';
export { NzResultUnauthorizedComponent as ɵNzResultUnauthorizedComponent } from './partial/unauthorized';
