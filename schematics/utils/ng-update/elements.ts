/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Attribute, DefaultTreeDocument, DefaultTreeElement, parseFragment } from "parse5";

const hasClassName = (node: DefaultTreeElement, className: string): Attribute | undefined => {
  return node.attrs?.find?.(attr => attr.name === 'class' && attr.value.indexOf(className) !== -1)
};

export function findElementWithoutStructuralDirective(html: string, tagName: string, directiveName: string, attr: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = (nodes): void => {
    nodes.forEach(node => {
      if (node.childNodes && !(node.tagName === 'ng-template' && !!node.attrs.find(a => a.name!.toLowerCase() === directiveName.toLowerCase()))) {
        visitNodes(node.childNodes);
      }

      if (node.tagName?.toLowerCase() === tagName.toLowerCase() && !!node.attrs.find(a => a.name!.toLowerCase() === attr.toLowerCase()) && !node.attrs.find(a => a.name!.toLowerCase() === `*${directiveName}`.toLowerCase())) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.startTag.startOffset)
}

export function findElementWithTag(html: string, tagName: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = (nodes): void => {
    nodes.forEach(node => {
      if (node.childNodes) {
        visitNodes(node.childNodes);
      }

      if (node.tagName?.toLowerCase() === tagName.toLowerCase()) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.startTag.startOffset)
}

export function findElementWithClassName(html: string, className: string, tagName: string): number[] {
  const document = parseFragment(html, {sourceCodeLocationInfo: true}) as DefaultTreeDocument;
  const elements: DefaultTreeElement[] = [];

  const visitNodes = (nodes): void => {
    nodes.forEach(node => {
      if (node.childNodes) {
        visitNodes(node.childNodes);
      }

      if (hasClassName(node, className) && node.tagName?.toLowerCase() === tagName.toLowerCase()) {
        elements.push(node);
      }
    });
  };

  visitNodes(document.childNodes);

  return elements
    .filter(e => e?.sourceCodeLocation?.startTag)
    .map(element => element.sourceCodeLocation.attrs.class.startOffset)
}
