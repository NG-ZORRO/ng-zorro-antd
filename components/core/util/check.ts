/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { TemplateRef, Type } from '@angular/core';

import { IndexableObject } from '../types/indexable';

export function isNotNil<T>(value: T): value is NonNullable<T> {
  return typeof value !== 'undefined' && value !== null;
}

export function isNil(value: unknown): value is null | undefined {
  return typeof value === 'undefined' || value === null;
}

/**
 * Examine if two objects are shallowly equaled.
 */
export function shallowEqual(objA?: IndexableObject, objB?: IndexableObject): boolean {
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
    const key = keysA[idx];
    if (!bHasOwnProperty(key)) {
      return false;
    }
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

export function isInteger(value: string | number): boolean {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
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

export function filterNotEmptyNode(node: Node): Node | null {
  if (node) {
    if (node.nodeType === 1 && (node as HTMLElement).outerHTML.toString().trim().length !== 0) {
      // ELEMENT_NODE
      return node;
    } else if (node.nodeType === 3 && node.textContent!.toString().trim().length !== 0) {
      // TEXT_NODE
      return node;
    }
    return null;
  }
  return null;
}

// tslint:disable-next-line:no-any
export function isNonEmptyString(value: any): boolean {
  return typeof value === 'string' && value !== '';
}

// tslint:disable-next-line:no-any
export function isTemplateRef(value: any): boolean {
  return value instanceof TemplateRef;
}

// tslint:disable-next-line:no-any
export function isComponent(value: any): boolean {
  return value instanceof Type;
}
