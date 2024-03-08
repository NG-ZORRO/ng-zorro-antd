/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

declare module 'sitemap' {
  interface Sitemap {
    toXML(fun: (err: Error, xml: string) => void): void;
    toString(): string;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function createSitemap(option: any): Sitemap;
}
