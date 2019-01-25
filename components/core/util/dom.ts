/**
 * @module dom
 *
 * Provides utils mutating DOM and handling events.
 */

import { filterNotEmptyNode } from './check';

/**
 * Like something never happended...
 *
 * @param {Event} e Event
 * @export
 */
export function silentEvent(e: Event): void {
  e.stopPropagation();
  e.preventDefault();
}

/**
 * get the offset of an element relative to the document (Reference from jquery's offset())
 * @param elem HTMLElement ref
 */
export function getElementOffset(elem: HTMLElement): { top: number, left: number } {
  // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
  // Support: IE <=11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (!elem.getClientRects().length) {
    return { top: 0, left: 0 };
  }
  // Get document-relative position by adding viewport scroll to viewport-relative gBCR
  const rect = elem.getBoundingClientRect();
  const win = elem.ownerDocument.defaultView;
  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}

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
