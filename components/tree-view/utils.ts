/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

export const getParent = <T>(nodes: T[], node: T, getLevel: (dataNode: T) => number): T | null => {
  let index = nodes.indexOf(node);
  if (index < 0) {
    return null;
  }
  const level = getLevel(node);
  for (index--; index >= 0; index--) {
    const preLevel = getLevel(nodes[index]);
    if (preLevel + 1 === level) {
      return nodes[index];
    }
    if (preLevel + 1 < level) {
      return null;
    }
  }
  return null;
};

export const getNextSibling = <T>(
  nodes: T[],
  node: T,
  getLevel: (dataNode: T) => number,
  _index?: number
): T | null => {
  let index = typeof _index !== 'undefined' ? _index : nodes.indexOf(node);
  if (index < 0) {
    return null;
  }
  const level = getLevel(node);

  for (index++; index < nodes.length; index++) {
    const nextLevel = getLevel(nodes[index]);
    if (nextLevel < level) {
      return null;
    }
    if (nextLevel === level) {
      return nodes[index];
    }
  }
  return null;
};
