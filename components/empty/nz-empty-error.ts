// tslint:disable-next-line:no-any
export function getEmptyContentTypeError(content: any): Error {
  return TypeError(`[NG-ZORRO]: useDefaultContent expect 'string', 'templateRef' or 'component' but get ${content}`);
}
