export function NzEmptyContentTypeError(content: any): Error { // tslint:disable-line:no-any
  return TypeError(`[NG-ZORRO]: useDefaultContent expect 'string', 'templateRef' or 'component' but get ${content}`);
}
