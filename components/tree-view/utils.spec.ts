/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  getParent,
  getDescendants,
  getNextSibling,
  getParentForNestedData,
  getNextSiblingForNestedData,
  getDescendantsForNestedData,
  flattenNestedNodes
} from './utils';

interface FlatNode {
  name: string;
  level: number;
}

interface NestedNode {
  name: string;
  children?: NestedNode[];
}

describe('TreeView Utils', () => {
  const flatNodes: FlatNode[] = [
    { name: '1', level: 0 },
    { name: '1-1', level: 1 },
    { name: '1-2', level: 1 },
    { name: '1-3', level: 1 },
    { name: '1-3-1', level: 2 },
    { name: '1-3-2', level: 2 },
    { name: '2', level: 0 },
    { name: '2-1', level: 1 }
  ];

  const nestedNodes: NestedNode[] = [
    {
      name: '1',
      children: [{ name: '1-1' }, { name: '1-2' }, { name: '1-3', children: [{ name: '1-3-1' }, { name: '1-3-2' }] }]
    },
    { name: '2', children: [{ name: '2-1' }] }
  ];

  const getLevel = (node: FlatNode): number => node.level;
  const getChildren = (node: NestedNode): NestedNode[] => node.children ?? [];

  describe('getParent', () => {
    it('should return the parent node', () => {
      const parent = getParent(flatNodes, flatNodes[5], getLevel);
      expect(parent).toBe(flatNodes[3]);
    });

    it('should return null if no parent found', () => {
      const parent = getParent(flatNodes, flatNodes[6], getLevel);
      expect(parent).toBeNull();
    });
  });

  describe('getDescendants', () => {
    it('should return all descendants', () => {
      const descendants = getDescendants(flatNodes, flatNodes[0], getLevel);
      expect(descendants).toEqual([flatNodes[1], flatNodes[2], flatNodes[3], flatNodes[4], flatNodes[5]]);
    });

    it('should return an empty array if no descendants found', () => {
      const descendants = getDescendants(flatNodes, flatNodes[1], getLevel);
      expect(descendants).toEqual([]);
    });
  });

  describe('getNextSibling', () => {
    it('should return the next sibling', () => {
      const nextSibling = getNextSibling(flatNodes, flatNodes[1], getLevel);
      expect(nextSibling).toBe(flatNodes[2]);
    });

    it('should return null if no next sibling found', () => {
      const nextSibling = getNextSibling(flatNodes, flatNodes[3], getLevel);
      expect(nextSibling).toBeNull();
    });

    it('should return the first sibling after _index loc if enter _index', () => {
      const nextSibling = getNextSibling(flatNodes, flatNodes[1], getLevel, 2);
      expect(nextSibling).toBe(flatNodes[3]);
    });
  });

  describe('getParentForNestedData', () => {
    it('should return the parent node in nested data', () => {
      const parent = getParentForNestedData(nestedNodes, nestedNodes[0].children![0], getChildren);
      expect(parent).toBe(nestedNodes[0]);
    });

    it('should return null if no parent found in nested data', () => {
      const parent = getParentForNestedData(nestedNodes, nestedNodes[0], getChildren);
      expect(parent).toBeNull();
    });
  });

  describe('getNextSiblingForNestedData', () => {
    it('should return the next sibling in nested data', () => {
      const nextSibling = getNextSiblingForNestedData(nestedNodes, nestedNodes[0].children![0], getChildren);
      expect(nextSibling).toBe(nestedNodes[0].children![1]);
    });

    it('should return null if no next sibling found in nested data', () => {
      const nextSibling = getNextSiblingForNestedData(nestedNodes, nestedNodes[0].children![2], getChildren);
      expect(nextSibling).toBeNull();
    });
  });

  describe('getDescendantsForNestedData', () => {
    it('should return all descendants in nested data', () => {
      const descendants = getDescendantsForNestedData(nestedNodes[0], getChildren);
      expect(descendants).toEqual([
        nestedNodes[0].children![0],
        nestedNodes[0].children![1],
        nestedNodes[0].children![2],
        nestedNodes[0].children![2].children![0],
        nestedNodes[0].children![2].children![1]
      ]);
    });

    it('should return an empty array if no descendants found in nested data', () => {
      const descendants = getDescendantsForNestedData(nestedNodes[1].children![0], getChildren);
      expect(descendants).toEqual([]);
    });
  });

  describe('flattenNestedNodes', () => {
    it('should flatten nested nodes', () => {
      const flattenedNodes = flattenNestedNodes(nestedNodes, getChildren);
      expect(flattenedNodes).toEqual([
        nestedNodes[0],
        nestedNodes[0].children![0],
        nestedNodes[0].children![1],
        nestedNodes[0].children![2],
        nestedNodes[0].children![2].children![0],
        nestedNodes[0].children![2].children![1],
        nestedNodes[1],
        nestedNodes[1].children![0]
      ]);
    });
  });
});
