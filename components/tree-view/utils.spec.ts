/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { cloneDeep } from 'lodash';

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
      expect(getParent(flatNodes, flatNodes[1], getLevel)).toBe(flatNodes[0]);
      expect(getParent(flatNodes, flatNodes[2], getLevel)).toBe(flatNodes[0]);
      expect(getParent(flatNodes, flatNodes[3], getLevel)).toBe(flatNodes[0]);
      expect(getParent(flatNodes, flatNodes[4], getLevel)).toBe(flatNodes[3]);
      expect(getParent(flatNodes, flatNodes[5], getLevel)).toBe(flatNodes[3]);
      expect(getParent(flatNodes, flatNodes[7], getLevel)).toBe(flatNodes[6]);
    });

    it('should return null if the node not in nodes', () => {
      const equalNode = cloneDeep(flatNodes[1]);
      expect(getParent(flatNodes, equalNode, getLevel)).toBeNull();
    });

    it('should return null if no parent found', () => {
      expect(getParent(flatNodes, flatNodes[0], getLevel)).toBeNull();
      expect(getParent(flatNodes, flatNodes[6], getLevel)).toBeNull();
    });
  });

  describe('getDescendants', () => {
    it('should return all descendants', () => {
      expect(getDescendants(flatNodes, flatNodes[0], getLevel)).toEqual([
        flatNodes[1],
        flatNodes[2],
        flatNodes[3],
        flatNodes[4],
        flatNodes[5]
      ]);
      expect(getDescendants(flatNodes, flatNodes[3], getLevel)).toEqual([flatNodes[4], flatNodes[5]]);
    });

    it('should return an empty array if the node not in nodes', () => {
      const equalNode = cloneDeep(flatNodes[1]);
      expect(getDescendants(flatNodes, equalNode, getLevel)).toEqual([]);
    });

    it('should return an empty array if no descendants found', () => {
      expect(getDescendants(flatNodes, flatNodes[1], getLevel)).toEqual([]);
      expect(getDescendants(flatNodes, flatNodes[2], getLevel)).toEqual([]);
      expect(getDescendants(flatNodes, flatNodes[4], getLevel)).toEqual([]);
      expect(getDescendants(flatNodes, flatNodes[5], getLevel)).toEqual([]);
    });
  });

  describe('getNextSibling', () => {
    it('should return the next sibling', () => {
      expect(getNextSibling(flatNodes, flatNodes[1], getLevel)).toBe(flatNodes[2]);
      expect(getNextSibling(flatNodes, flatNodes[2], getLevel)).toBe(flatNodes[3]);
      expect(getNextSibling(flatNodes, flatNodes[4], getLevel)).toBe(flatNodes[5]);
    });

    it('should return null if no next sibling found', () => {
      expect(getNextSibling(flatNodes, flatNodes[3], getLevel)).toBeNull();
      expect(getNextSibling(flatNodes, flatNodes[7], getLevel)).toBeNull();
    });

    it('should return the first sibling after _index loc if enter _index', () => {
      const nextSibling = getNextSibling(flatNodes, flatNodes[1], getLevel, 2);
      expect(nextSibling).toBe(flatNodes[3]);
    });

    it('should return the null if _index less than 0', () => {
      const nextSibling = getNextSibling(flatNodes, flatNodes[1], getLevel, -1);
      expect(nextSibling).toBeNull();
    });
  });

  describe('getParentForNestedData', () => {
    it('should return the parent node in nested data', () => {
      expect(getParentForNestedData(nestedNodes, nestedNodes[0].children![0], getChildren)).toBe(nestedNodes[0]);
      expect(getParentForNestedData(nestedNodes, nestedNodes[0].children![1], getChildren)).toBe(nestedNodes[0]);
      expect(getParentForNestedData(nestedNodes, nestedNodes[0].children![2], getChildren)).toBe(nestedNodes[0]);
      expect(getParentForNestedData(nestedNodes, nestedNodes[0].children![2].children![0], getChildren)).toBe(
        nestedNodes[0].children![2]
      );
      expect(getParentForNestedData(nestedNodes, nestedNodes[0].children![2].children![1], getChildren)).toBe(
        nestedNodes[0].children![2]
      );
      expect(getParentForNestedData(nestedNodes, nestedNodes[1].children![0], getChildren)).toBe(nestedNodes[1]);
    });

    it('should return null if the node not in nodes', () => {
      const equalNode = cloneDeep(nestedNodes[0].children![0]);
      const parent = getParentForNestedData(nestedNodes, equalNode, getChildren);
      expect(parent).toBeNull();
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

    it('should return null if the node not in nodes', () => {
      const equalNode = cloneDeep(nestedNodes[0].children![0]);
      expect(getNextSiblingForNestedData(nestedNodes, equalNode, getChildren)).toBeNull();
    });

    it('should return null if no next sibling found in nested data', () => {
      expect(getNextSiblingForNestedData(nestedNodes, nestedNodes[0].children![2], getChildren)).toBeNull();
      expect(
        getNextSiblingForNestedData(nestedNodes, nestedNodes[0].children![2].children![1], getChildren)
      ).toBeNull();
      expect(getNextSiblingForNestedData(nestedNodes, nestedNodes[1], getChildren)).toBeNull();
      expect(getNextSiblingForNestedData(nestedNodes, nestedNodes[1].children![0], getChildren)).toBeNull();
    });
  });

  describe('getDescendantsForNestedData', () => {
    it('should return all descendants in nested data', () => {
      expect(getDescendantsForNestedData(nestedNodes[0], getChildren)).toEqual([
        nestedNodes[0].children![0],
        nestedNodes[0].children![1],
        nestedNodes[0].children![2],
        nestedNodes[0].children![2].children![0],
        nestedNodes[0].children![2].children![1]
      ]);
      expect(getDescendantsForNestedData(nestedNodes[0].children![2], getChildren)).toEqual([
        nestedNodes[0].children![2].children![0],
        nestedNodes[0].children![2].children![1]
      ]);
    });

    it('should return an empty array if no descendants found in nested data', () => {
      expect(getDescendantsForNestedData(nestedNodes[0].children![0], getChildren)).toEqual([]);
      expect(getDescendantsForNestedData(nestedNodes[0].children![1], getChildren)).toEqual([]);
      expect(getDescendantsForNestedData(nestedNodes[0].children![2].children![0], getChildren)).toEqual([]);
      expect(getDescendantsForNestedData(nestedNodes[0].children![2].children![1], getChildren)).toEqual([]);
      expect(getDescendantsForNestedData(nestedNodes[1].children![0], getChildren)).toEqual([]);
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
