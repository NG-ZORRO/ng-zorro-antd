import { CascaderOption } from './nz-cascader-definitions';

export function isChildOption(o: CascaderOption): boolean {
  return o.isLeaf || !o.children || !o.children.length;
}

export function isParentOption(o: CascaderOption): boolean {
  return !!o.children && !!o.children.length && !o.isLeaf;
}
