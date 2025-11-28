/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

// Note: This falls back to `setTimeout` if `requestAnimationFrame` is
// unintentionally called on the server, but ideally, we should never attempt
// to call `requestAnimationFrame` on the server — all invocations should be
// wrapped with isBrowser.
export const requestAnimationFrame =
  typeof globalThis.requestAnimationFrame === 'function' ? globalThis.requestAnimationFrame : globalThis.setTimeout;

export const cancelAnimationFrame =
  typeof globalThis.requestAnimationFrame === 'function' ? globalThis.cancelAnimationFrame : globalThis.clearTimeout;
