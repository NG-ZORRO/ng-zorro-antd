/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

// from https://github.com/component/textarea-caret-position

// We'll copy the properties below into the mirror div.
// Note that some browsers, such as Firefox, do not concatenate properties
// into their shorthand (e.g. padding-top, padding-bottom etc. -> padding),
// so we have to list every single property explicitly.
export const properties = [
  'direction', // RTL support
  'boxSizing',
  'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY', // copy the scrollbar for IE

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  // https://developer.mozilla.org/en-US/docs/Web/CSS/font
  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration', // might not make a difference, but better be safe

  'letterSpacing',
  'wordSpacing',

  'tabSize',
  'MozTabSize'
];

const isBrowser = typeof window !== 'undefined';

const isFirefox = isBrowser && (window as NzSafeAny).mozInnerScreenX != null;

const _parseInt = (str: string): number => parseInt(str, 10);

export interface Coordinates {
  top: number;
  left: number;
  height: number;
}

export function getCaretCoordinates(
  element: HTMLInputElement | HTMLTextAreaElement,
  position: number,
  options?: { debug?: boolean }
): Coordinates {
  if (!isBrowser) {
    throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
  }

  const debug = (options && options.debug) || false;
  if (debug) {
    const el = document.querySelector('#input-textarea-caret-position-mirror-div');
    if (el) {
      el.parentNode!.removeChild(el);
    }
  }

  // The mirror div will replicate the textarea's style
  const div = document.createElement('div');
  div.id = 'input-textarea-caret-position-mirror-div';
  document.body.appendChild(div);

  const style = div.style;

  const computed = window.getComputedStyle ? window.getComputedStyle(element) : (element as NzSafeAny).currentStyle; // currentStyle for IE < 9
  const isInput = element.nodeName === 'INPUT';

  // Default textarea styles
  style.whiteSpace = 'pre-wrap';
  if (!isInput) {
    style.wordWrap = 'break-word'; // only for textarea-s
  }

  // Position off-screen
  style.position = 'absolute'; // required to return coordinates properly
  if (!debug) {
    style.visibility = 'hidden';
  } // not 'display: none' because we want rendering

  // Transfer the element's properties to the div
  properties.forEach((prop: string) => {
    if (isInput && prop === 'lineHeight') {
      // Special case for <input>s because text is rendered centered and line height may be != height
      style.lineHeight = computed.height;
    } else {
      // @ts-ignore
      style[prop] = computed[prop];
    }
  });

  if (isFirefox) {
    // Firefox lies about the overflow property for textareas: https://bugzilla.mozilla.org/show_bug.cgi?id=984275
    if (element.scrollHeight > _parseInt(computed.height)) {
      style.overflowY = 'scroll';
    }
  } else {
    style.overflow = 'hidden'; // for Chrome to not render a scrollbar; IE keeps overflowY = 'scroll'
  }

  div.textContent = element.value.substring(0, position);
  // The second special handling for input type="text" vs textarea:
  // spaces need to be replaced with non-breaking spaces - http://stackoverflow.com/a/13402035/1269037
  if (isInput) {
    div.textContent = div.textContent.replace(/\s/g, '\u00a0');
  }

  const span = document.createElement('span');
  // Wrapping must be replicated *exactly*, including when a long word gets
  // onto the next line, with whitespace at the end of the line before (#7).
  // The  *only* reliable way to do that is to copy the *entire* rest of the
  // textarea's content into the <span> created at the caret position.
  // For inputs, just '.' would be enough, but no need to bother.
  span.textContent = element.value.substring(position) || '.'; // || because a completely empty faux span doesn't render at all
  div.appendChild(span);

  const coordinates = {
    top: span.offsetTop + _parseInt(computed.borderTopWidth),
    left: span.offsetLeft + _parseInt(computed.borderLeftWidth),
    height: _parseInt(computed.lineHeight)
  };

  if (debug) {
    span.style.backgroundColor = '#eee';
    createDebugEle(element, coordinates);
  } else {
    document.body.removeChild(div);
  }

  return coordinates;
}

export function createDebugEle(element: HTMLInputElement | HTMLTextAreaElement, coordinates: Coordinates): void {
  const fontSize = getComputedStyle(element).getPropertyValue('font-size');
  const rect: HTMLSpanElement = (document.querySelector('#DEBUG') as HTMLSpanElement) || document.createElement('div');
  document.body.appendChild(rect);
  rect.id = 'DEBUG';
  rect.style.position = 'absolute';
  rect.style.backgroundColor = 'red';
  rect.style.height = fontSize;
  rect.style.width = '1px';
  rect.style.top = `${
    element.getBoundingClientRect().top - element.scrollTop + window.pageYOffset + coordinates.top
  }px`;
  rect.style.left = `${
    element.getBoundingClientRect().left - element.scrollLeft + window.pageXOffset + coordinates.left
  }px`;
}
