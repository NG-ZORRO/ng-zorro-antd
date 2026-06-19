/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export {};

declare module 'vitest' {
  interface Assertion<T = unknown> {
    toBeFalse(): void;
    toBeTrue(): void;
    toHaveClass(className: string): void;
    toHaveSize(size: number): void;
    withContext(message: string): Assertion<T>;
  }
}
