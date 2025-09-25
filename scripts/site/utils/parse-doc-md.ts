/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Root, RootContent } from 'mdast';
import { remark } from 'remark';
import { loadFront } from 'yaml-front-matter';

import md from '../markdown';
import { angularNonBindAble } from './angular-non-bindable';
import { getMeta } from './get-meta';
import { ComponentIndexDoc, ComponentDemoDoc, ComponentDemoDocMeta } from '../types';

function stringifyInlineCode(node: RootContent): string {
  return remark.stringify(node as unknown as Root);
}

/**
 * Parse doc markdown file
 */
export function parseDocMd(file: Buffer, path: string): ComponentIndexDoc {
  const meta = getMeta(file);
  const content = meta.__content;
  delete meta.__content;

  const ast = remark.parse(content);
  // 分离前后两部分
  let isAfterAPIHeading = false;
  let firstPart = '';
  let secondPart = '';

  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth === 2) {
      const firstChild = child.children[0];
      if (firstChild.type === 'text' && firstChild.value === 'API') {
        isAfterAPIHeading = true;
      }
    }
    if (!isAfterAPIHeading) {
      firstPart += md.parse(stringifyInlineCode(child));
    } else {
      secondPart += md.parse(stringifyInlineCode(child));
    }
  });

  return {
    meta: meta,
    path: path,
    whenToUse: angularNonBindAble(firstPart),
    api: angularNonBindAble(secondPart)
  };
}

/**
 * Parse demo markdown file
 */
export function parseDemoMd(file: Buffer): Pick<ComponentDemoDoc, 'meta' | 'zh' | 'en'> {
  const meta = loadFront(file) as ComponentDemoDocMeta;
  const content = meta.__content;
  delete meta.__content;

  const ast = remark.parse(content);
  // 分离中英文
  let isAfterENHeading = false;
  let zhPart = '';
  let enPart = '';

  ast.children.forEach(child => {
    if (child.type === 'heading' && child.depth === 2) {
      const firstChild = child.children[0];
      if (firstChild.type === 'text' && firstChild.value === 'en-US') {
        isAfterENHeading = true;
      }
    } else if (!isAfterENHeading) {
      zhPart += md.parse(stringifyInlineCode(child));
    } else {
      enPart += md.parse(stringifyInlineCode(child));
    }
  });

  return {
    meta,
    zh: angularNonBindAble(zhPart),
    en: angularNonBindAble(enPart)
  };
}
