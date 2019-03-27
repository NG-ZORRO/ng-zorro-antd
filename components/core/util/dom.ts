import { Observable } from 'rxjs';

import { filterNotEmptyNode } from './check';

/**
 * Silent an event by stopping and preventing it.
 */
export function silentEvent(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}

export function getElementOffset(elem: HTMLElement): { top: number, left: number } {
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  const rect = elem.getBoundingClientRect();
  const win = elem.ownerDocument!.defaultView;
  return {
    top : rect.top + win!.pageYOffset,
    left: rect.left + win!.pageXOffset
  };
}

export function findFirstNotEmptyNode(element: HTMLElement): Node | null {
  const children = element.childNodes;
  for (let i = 0; i < children.length; i++) {
    const node = children.item(i);
    if (filterNotEmptyNode(node)) {
      return node;
    }
  }
  return null;
}

export function findLastNotEmptyNode(element: HTMLElement): Node | null {
  const children = element.childNodes;
  for (let i = children.length - 1; i >= 0; i--) {
    const node = children.item(i);
    if (filterNotEmptyNode(node)) {
      return node;
    }
  }
  return null;
}

export function reverseChildNodes(parent: HTMLElement): void {
  const children = parent.childNodes;
  let length = children.length;
  if (length) {
    const nodes: Node[] = [];
    children.forEach((node, i) => nodes[ i ] = node);
    while (length--) {
      parent.appendChild(nodes[ length ]);
    }
  }
}

export interface MouseTouchObserverConfig {
  end: string;
  move: string;
  pluckKey: string[];
  start: string;

  end$?: Observable<Event>;
  moveResolved$?: Observable<number>;
  startPlucked$?: Observable<number>;

  filter?(e: Event): boolean;
}
