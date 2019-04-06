import { CascaderOption } from './nz-cascader-definitions';

export function isChildOption(o: CascaderOption): boolean {
  return o.isLeaf || !o.children || !o.children.length;
}

export function isParentOption(o: CascaderOption): boolean {
  return !!o.children && !!o.children.length && !o.isLeaf;
}

export function isObject<T>(x: T): boolean {
  return x != null && typeof x === 'object';
}

export function clone<T>(value: T): T;
export function clone(value: Date): Date;
export function clone(value: CascaderOption): CascaderOption {
  if (!isObject(value) || value instanceof RegExp) {
    return value;
  }

  if (Object.prototype.toString.call(value) === '[object Date]') {
    return new Date((value as Date).getTime());
  }

  if (Array.isArray(value)) {
    return value.slice(0).map(v => clone(v));
  }

  const result = { ...value };
  Object.keys(result).forEach(k => (result[k] = clone(result[k])));

  return result;
}
