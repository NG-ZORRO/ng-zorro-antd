// tslint:disable-next-line:no-any
export function isPromise(obj: any): obj is Promise<any> {
  return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function';
}
