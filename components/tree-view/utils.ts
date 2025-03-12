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

export const getDescendants = <T>(nodes: T[], node: T, getLevel: (dataNode: T) => number): T[] => {
  let index = nodes.indexOf(node);
  if (index < 0) {
    return [];
  }
  const result = [];
  const level = getLevel(nodes[index]);
  for (index++; index < nodes.length; index++) {
    if (getLevel(nodes[index]) > level) {
      result.push(nodes[index]);
    } else {
      break;
    }
  }
  return result;
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

export const getParentForNestedData = <T>(nodes: T[], node: T, getChildren: (dataNode: T) => T[]): T | null => {
  for (const parent of flattenNestedNodes(nodes, getChildren)) {
    if (getChildren(parent)?.includes(node)) {
      return parent;
    }
  }

  return null;
};

export const getNextSiblingForNestedData = <T>(nodes: T[], node: T, getChildren: (dataNode: T) => T[]): T | null => {
  const len = nodes.length;
  for (let i = 0; i < len; i++) {
    if (nodes[i] === node) {
      return i + 1 < len ? nodes[i + 1] : null;
    }

    const children = getChildren(nodes[i]);
    if (children && children.length > 0) {
      const sibling = getNextSiblingForNestedData(children, node, getChildren);
      if (sibling) {
        return sibling;
      }
    }
  }
  return null;
};

export const getDescendantsForNestedData = <T>(node: T, getChildren: (dataNode: T) => T[]): T[] => {
  let result: T[] = [];
  const children = getChildren(node);
  if (children && children.length > 0) {
    children.forEach(child => {
      result.push(child);
      result = result.concat(getDescendantsForNestedData(child, getChildren));
    });
  }

  return result;
};

export const flattenNestedNodes = <T>(nodes: T[], getChildren: (dataNode: T) => T[]): T[] => {
  const flattenedNodes = [];
  for (const node of nodes) {
    flattenedNodes.push(node);
    if (getChildren(node)) {
      flattenedNodes.push(...flattenNestedNodes(getChildren(node), getChildren));
    }
  }
  return flattenedNodes;
};
