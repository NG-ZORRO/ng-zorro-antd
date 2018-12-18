import { filterNotEmptyNode } from './check';

export function findFirstNotEmptyNode(element: HTMLElement): Node {
  const children = element.childNodes;
  for (let i = 0; i < children.length; i++) {
    const node = children.item(i);
    if (filterNotEmptyNode(node)) {
      return node;
    }
  }
  return null;
}

export function findLastNotEmptyNode(element: HTMLElement): Node {
  const children = element.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const node = children.item(i);
    if (filterNotEmptyNode(node)) {
      return node;
    }
  }
  return null;
}