/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export * from './result.module';
export * from './result.component';
export * from './result-cells';

// Making these partial components not visible to users but comprehensible to ng-packagr.
export { NzResultNotFoundComponent as ɵNzResultNotFoundComponent } from './partial/not-found';
export { NzResultServerErrorComponent as ɵNzResultServerErrorComponent } from './partial/server-error.component';
export { NzResultUnauthorizedComponent as ɵNzResultUnauthorizedComponent } from './partial/unauthorized';
