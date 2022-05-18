/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

/**
 * Sync from rc-util [https://github.com/react-component/util]
 */
import { canUseDom } from './can-use-dom';

const MARK_KEY = `rc-util-key` as NzSafeAny;

function getMark({ mark }: Options = {}): string {
  if (mark) {
    return mark.startsWith('data-') ? mark : `data-${mark}`;
  }
  return MARK_KEY;
}

interface Options {
  attachTo?: Element;
  csp?: { nonce?: string };
  prepend?: boolean;
  mark?: string;
}

function getContainer(option: Options): HTMLElement | Element {
  if (option.attachTo) {
    return option.attachTo;
  }

  const head = document.querySelector('head');
  return head || document.body;
}

export function injectCSS(css: string, option: Options = {}): HTMLStyleElement | null {
  if (!canUseDom()) {
    return null;
  }

  const styleNode = document.createElement('style');
  if (option.csp?.nonce) {
    styleNode.nonce = option.csp?.nonce;
  }
  styleNode.innerHTML = css;

  const container = getContainer(option);
  const { firstChild } = container;

  if (option.prepend && container.prepend) {
    // Use `prepend` first
    container.prepend(styleNode);
  } else if (option.prepend && firstChild) {
    // Fallback to `insertBefore` like IE not support `prepend`
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }

  return styleNode;
}

const containerCache = new Map<Element, Node & ParentNode>();

function findExistNode(key: string, option: Options = {}): HTMLStyleElement {
  const container = getContainer(option);

  return Array.from(containerCache.get(container)?.children || []).find(
    node => node.tagName === 'STYLE' && node.getAttribute(getMark(option)) === key
  ) as HTMLStyleElement;
}

export function removeCSS(key: string, option: Options = {}): void {
  const existNode = findExistNode(key, option);

  existNode?.parentNode?.removeChild(existNode);
}

export function updateCSS(css: string, key: string, option: Options = {}): HTMLStyleElement | null {
  const container = getContainer(option);

  // Get real parent
  if (!containerCache.has(container)) {
    const placeholderStyle = injectCSS('', option);
    // @ts-ignore
    const { parentNode } = placeholderStyle;
    containerCache.set(container, parentNode);
    parentNode.removeChild(placeholderStyle);
  }

  const existNode = findExistNode(key, option);

  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce;
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }

    return existNode;
  }

  const newNode = injectCSS(css, option);
  newNode?.setAttribute(getMark(option), key);
  return newNode;
}
