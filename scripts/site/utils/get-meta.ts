/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { parseFragment, TreeAdapterTypeMap } from 'parse5';
import { loadFront } from 'yaml-front-matter';

import md from '../markdown';
import { ComponentIndexDocMeta } from '../types';

interface TextNode {
  value: string;
}

type DOMTreeAdapterTypeMap = TreeAdapterTypeMap<
  Node,
  ParentNode,
  ChildNode,
  Document,
  DocumentFragment,
  Element,
  Comment,
  TextNode,
  unknown,
  unknown
>;

function findNodeByName(fragment: Node, name: string[], result: Node[] = []): void {
  if (name.includes(fragment.nodeName)) {
    result.push(fragment);
  }

  if (fragment?.childNodes) {
    fragment.childNodes.forEach(childNode => {
      findNodeByName(childNode, name, result);
    });
  }
}

export function getMeta(file: Buffer): ComponentIndexDocMeta {
  const meta = loadFront(file) as ComponentIndexDocMeta;

  let description = '';
  if (meta.description) {
    meta.rawDescription = meta.description;
    if (meta.subtitle) {
      description = `Angular ${meta.subtitle}组件，${meta.description}`;
    } else if (meta.title) {
      description = `Angular ${meta.title} Component, ${meta.description}`;
    }
    meta.description = description;
    return meta;
  }

  const content = md.parse(meta.__content ?? '', { async: false });
  const fragment = parseFragment<DOMTreeAdapterTypeMap>(content);
  const paragraphs: Node[] = [];
  findNodeByName(fragment, ['p', 'li'], paragraphs);
  const contents = paragraphs
    .map(f => {
      const c: Node[] = [];
      findNodeByName(f, ['#text'], c);
      return c as unknown as TextNode[];
    })
    .flat();
  for (const content of contents) {
    if (description.length >= 150) {
      break;
    }
    description = description + content['value'];
  }
  if (description.length > 150) {
    description = `${description.slice(0, 150)}...`;
  }
  meta.description = description;
  return meta;
}
