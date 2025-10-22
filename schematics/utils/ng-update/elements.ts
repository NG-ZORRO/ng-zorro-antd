/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DefaultTreeAdapterMap, parseFragment } from 'parse5';

/**
 * Get the type of the item in an array.
 */
export type ArrayItem<T> = T extends Array<infer U> ? U : never;

// At the time of writing `parse5` doesn't expose the node interfaces directly, even though
// they're used as return types, but We can still access them through `DefaultTreeAdapterMap`.
export type Element = DefaultTreeAdapterMap['element'];
export type ChildNode = DefaultTreeAdapterMap['childNode'];
export type Attribute = ArrayItem<Element['attrs']>;

const hasClassName = (node: Element, className: string): Attribute | undefined => {
  return node.attrs?.find?.(attr => attr.name === 'class' && attr.value.indexOf(className) !== -1);
};

const compareCaseInsensitive = (a: string, b: string): boolean => a?.toLowerCase() === b?.toLowerCase();

export function findElementWithoutStructuralDirective(html: string, tagName: string, directiveName: string, attr: string): number[] {
  const document = parseFragment(html, { sourceCodeLocationInfo: true });
  const elements: Element[] = [];

  const visitNodes = (nodes: ChildNode[]): void => {
    nodes.forEach(node => {
      if (node['childNodes'] && !(node['tagName'] === 'ng-template' && !!(node as Element).attrs.find(a => compareCaseInsensitive(a.name!, directiveName)))) {
        visitNodes(node['childNodes']);
      }

      if (compareCaseInsensitive(node['tagName'], tagName)) {
        const element = node as Element;
        const directive = `*${directiveName}`;
        if (!!element.attrs.find(a => compareCaseInsensitive(a.name!, attr)) && !element.attrs.find(a => compareCaseInsensitive(a.name!, directive))) {
          elements.push(element);
        }
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.startTag.startOffset);
}

export function findElementWithTag(html: string, tagName: string): number[] {
  const document = parseFragment(html, { sourceCodeLocationInfo: true });
  const elements: Element[] = [];

  const visitNodes = (nodes: ChildNode[]): void => {
    nodes.forEach(node => {
      if (node['childNodes']) {
        visitNodes(node['childNodes']);
      }

      if (compareCaseInsensitive(node['tagName'], tagName)) {
        elements.push(node as Element);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.startTag.startOffset);
}

export function findElementWithClassName(html: string, className: string, tagName: string): number[] {
  const document = parseFragment(html, { sourceCodeLocationInfo: true });
  const elements: Element[] = [];

  const visitNodes = (nodes: ChildNode[]): void => {
    nodes.forEach(node => {
      if (node['childNodes']) {
        visitNodes(node['childNodes']);
      }

      if (compareCaseInsensitive(node['tagName'], tagName) && hasClassName(node as Element, className)) {
        elements.push(node as Element);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.attrs.class.startOffset);
}
