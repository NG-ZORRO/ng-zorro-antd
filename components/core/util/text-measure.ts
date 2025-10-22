/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NzSafeAny } from 'ng-zorro-antd/core/types';

export interface MeasureResult {
  finished: boolean;
  node: Node | null;
}

// We only handle element & text node.
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;

let ellipsisContainer: HTMLParagraphElement;

const wrapperStyle = {
  padding: '0',
  margin: '0',
  display: 'inline',
  lineHeight: 'inherit'
};

export function pxToNumber(value: string | null): number {
  if (!value) {
    return 0;
  }

  const match = value.match(/^\d*(\.\d*)?/);

  return match ? Number(match[0]) : 0;
}

function styleToObject(style: CSSStyleDeclaration): Record<string, string> {
  // There are some different behavior between Firefox & Chrome.
  // We have to handle this ourself.
  const styles: Record<string, string> = {};
  const styleNames: string[] = Array.prototype.slice.apply(style);
  for (const name of styleNames) {
    styles[name] = style.getPropertyValue(name);
  }
  return styles;
}

function mergeChildren(children: Node[]): Node[] {
  const childList: Node[] = [];

  children.forEach((child: Node) => {
    const prevChild = childList[childList.length - 1];
    if (prevChild && child.nodeType === TEXT_NODE && prevChild.nodeType === TEXT_NODE) {
      (prevChild as Text).data += (child as Text).data;
    } else {
      childList.push(child);
    }
  });

  return childList;
}

export function measure(
  originEle: HTMLElement,
  rows: number,
  contentNodes: Node[],
  fixedContent: HTMLElement[],
  ellipsisStr: string,
  suffixStr: string = ''
): { contentNodes: Node[]; text: string; ellipsis: boolean } {
  if (!ellipsisContainer) {
    ellipsisContainer = document.createElement('div');
    ellipsisContainer.setAttribute('aria-hidden', 'true');
    document.body.appendChild(ellipsisContainer);
  }

  // Get origin style
  const originStyle = window.getComputedStyle(originEle);
  const originCSS = styleToObject(originStyle);
  const lineHeight = pxToNumber(originStyle.lineHeight);
  const maxHeight = Math.round(
    lineHeight * (rows + 1) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom)
  );
  // Set shadow
  for (const [name, value] of Object.entries(originCSS)) {
    // setAttribute('style', ...) is not allowed when strict CSP is in place.
    ellipsisContainer.style.setProperty(name, value);
  }
  ellipsisContainer.style.position = 'fixed';
  ellipsisContainer.style.left = '0';
  ellipsisContainer.style.height = 'auto';
  ellipsisContainer.style.minHeight = 'auto';
  ellipsisContainer.style.maxHeight = 'auto';
  ellipsisContainer.style.top = '-999999px';
  ellipsisContainer.style.zIndex = '-1000';

  // clean up css overflow
  ellipsisContainer.style.textOverflow = 'clip';
  ellipsisContainer.style.whiteSpace = 'normal';
  (ellipsisContainer.style as NzSafeAny).webkitLineClamp = 'none';

  const contentList = mergeChildren(contentNodes);
  const container = document.createElement('div');
  const contentContainer = document.createElement('span');
  const suffixContainer = document.createTextNode(suffixStr);
  const fixedContainer = document.createElement('span');

  // Add styles in container
  Object.assign(container.style, wrapperStyle);
  Object.assign(contentContainer.style, wrapperStyle);
  Object.assign(fixedContainer.style, wrapperStyle);

  contentList.forEach(n => {
    contentContainer.appendChild(n);
  });

  contentContainer.appendChild(suffixContainer);

  fixedContent.forEach(node => {
    fixedContainer.appendChild(node.cloneNode(true));
  });
  container.appendChild(contentContainer);
  container.appendChild(fixedContainer);

  // Render in the fake container
  ellipsisContainer.appendChild(container);

  // Check if ellipsis in measure div is height enough for content
  function inRange(): boolean {
    return ellipsisContainer.offsetHeight < maxHeight;
  }

  if (inRange()) {
    const text = ellipsisContainer.innerHTML;
    ellipsisContainer.removeChild(container);
    return { contentNodes, text, ellipsis: false };
  }

  // We should clone the childNode since they're controlled by React and we can't reuse it without warning
  const childNodes: ChildNode[] = Array.prototype.slice
    .apply(ellipsisContainer.childNodes[0].childNodes[0].cloneNode(true).childNodes)
    .filter(({ nodeType }: ChildNode) => nodeType !== COMMENT_NODE);
  const fixedNodes: ChildNode[] = Array.prototype.slice.apply(
    ellipsisContainer.childNodes[0].childNodes[1].cloneNode(true).childNodes
  );
  ellipsisContainer.removeChild(container);

  // ========================= Find match ellipsis content =========================
  ellipsisContainer.innerHTML = '';

  // Create origin content holder
  const ellipsisContentHolder = document.createElement('span');
  ellipsisContainer.appendChild(ellipsisContentHolder);
  const ellipsisTextNode = document.createTextNode(ellipsisStr + suffixStr);
  ellipsisContentHolder.appendChild(ellipsisTextNode);

  fixedNodes.forEach(childNode => {
    ellipsisContainer.appendChild(childNode);
  });

  // Append before fixed nodes
  function appendChildNode(node: ChildNode): void {
    ellipsisContentHolder.insertBefore(node, ellipsisTextNode);
  }

  // Get maximum text
  function measureText(
    textNode: Text,
    fullText: string,
    startLoc: number = 0,
    endLoc: number = fullText.length,
    lastSuccessLoc: number = 0
  ): MeasureResult {
    const midLoc = Math.floor((startLoc + endLoc) / 2);
    textNode.textContent = fullText.slice(0, midLoc);

    if (startLoc >= endLoc - 1) {
      // Loop when step is small
      for (let step = endLoc; step >= startLoc; step -= 1) {
        const currentStepText = fullText.slice(0, step);
        textNode.textContent = currentStepText;

        if (inRange() || !currentStepText) {
          return step === fullText.length
            ? {
                finished: false,
                node: document.createTextNode(fullText)
              }
            : {
                finished: true,
                node: document.createTextNode(currentStepText)
              };
        }
      }
    }
    if (inRange()) {
      return measureText(textNode, fullText, midLoc, endLoc, midLoc);
    } else {
      return measureText(textNode, fullText, startLoc, midLoc, lastSuccessLoc);
    }
  }

  function measureNode(childNode: ChildNode, index: number): MeasureResult {
    const type = childNode.nodeType;

    if (type === ELEMENT_NODE) {
      // We don't split element, it will keep if whole element can be displayed.
      // appendChildNode(childNode);
      if (inRange()) {
        return {
          finished: false,
          node: contentList[index]
        };
      }

      // Clean up if can not pull in
      ellipsisContentHolder.removeChild(childNode);
      return {
        finished: true,
        node: null
      };
    } else if (type === TEXT_NODE) {
      const fullText = childNode.textContent || '';
      const textNode = document.createTextNode(fullText);
      appendChildNode(textNode);
      return measureText(textNode, fullText);
    }

    // Not handle other type of content
    // PS: This code should not be attached after react 16
    return {
      finished: false,
      node: null
    };
  }

  const ellipsisNodes: Node[] = [];
  childNodes.some((childNode, index) => {
    const { finished, node } = measureNode(childNode, index);
    if (node) {
      ellipsisNodes.push(node);
    }
    return finished;
  });
  const result = {
    contentNodes: ellipsisNodes,
    text: ellipsisContainer.innerHTML,
    ellipsis: true
  };
  while (ellipsisContainer.firstChild) {
    ellipsisContainer.removeChild(ellipsisContainer.firstChild);
  }
  return result;
}
