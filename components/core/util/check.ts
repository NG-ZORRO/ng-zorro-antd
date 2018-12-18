import { TemplateRef, Type } from '@angular/core';

// tslint:disable-next-line:no-any
export function isNotNil(value: any): boolean {
  return (typeof(value) !== 'undefined') && value !== null;
}

/** 校验对象是否相等 */
export function shallowEqual(objA: {}, objB: {}): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // tslint:disable-next-line:prefer-for-of
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[ idx ];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    if (objA[ key ] !== objB[ key ]) {
      return false;
    }
  }

  return true;
}

export function isInteger(value: string | number): boolean {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}

export function isEmpty(element: HTMLElement): boolean {
  const nodes = element.childNodes;
  for (let i = 0; i < nodes.length; i++) {
    if (filterNotEmptyNode(nodes.item(i))) {
      return false;
    }
  }
  return true;
}

export function filterNotEmptyNode(node: Node): Node {
  if (node) {
    if ((node.nodeType === 1) && ((node as HTMLElement).outerHTML.toString().trim().length !== 0)) {
      // ELEMENT_NODE
      return node;
    } else if ((node.nodeType === 3) && (node.textContent.toString().trim().length !== 0)) {
      // TEXT_NODE
      return node;
    }
    return null;
  }
  return null;
}

export function isNonEmptyString(value: any): boolean { // tslint:disable-line:no-any
  return typeof value === 'string' && value !== '';
}

export function isTemplateRef(value: any): boolean { // tslint:disable-line:no-any
  return value instanceof TemplateRef;
}

export function isComponent(value: any): boolean { // tslint:disable-line:no-any
  return value instanceof Type;
}
