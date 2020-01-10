declare module 'sitemap' {
  interface Sitemap {
    toXML(fun: (err: Error, xml: string) => void): void;
    toString(): string;
  }
  // tslint:disable-next-line:no-any
  export function createSitemap(option: any): Sitemap;
}
