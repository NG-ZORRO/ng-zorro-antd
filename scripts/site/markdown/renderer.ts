/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Marked, RendererObject } from 'marked';
import { parseFragment, serialize } from 'parse5';
import slugify from 'slugify';

const DIRECTIVE_REGEX = /^\[[a-zA-Z-]+]/;
const SERVICE_REGEX = /^Nz[a-zA-Z]+Service$/;

function createLabel(label: 'component' | 'directive' | 'service'): string {
  return `<label class="api-type-label ${label}">${label}</label>`;
}

export function getRenderer(marked: Marked): RendererObject {
  const originLinkHandler = marked.defaults.renderer!.link;
  return {
    link(params) {
      const { href } = params;
      const str = originLinkHandler.call(this, params);
      const a = parseFragment(str, {});
      /**
       * @description If the link is an anchor tag and the href is not an absolute path, open it in a new window
       */
      if (a && a.childNodes[0] && a.childNodes[0].nodeName === 'a') {
        if (!/^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/.test(href)) {
          // Open absolute path in new window
          a.childNodes[0].attrs.push({
            name: 'target',
            value: '_blank'
          });
          a.childNodes[0].attrs.push({
            name: 'rel',
            value: 'noopener'
          });
        }
        return serialize(a);
      }

      return str;
    },
    heading({ text, depth }) {
      const title = marked.parseInline(text, { async: false });
      const id = slugify(title, {
        remove: /[*+~.()'"!:@\\[\]]/g,
        replacement: '_',
        lower: true
      });
      const isMarkedLabel = depth === 3 && title.indexOf('nz-') === 0;
      const isDirective = DIRECTIVE_REGEX.test(title);
      const isComponent = isMarkedLabel && !isDirective;
      const isService = SERVICE_REGEX.test(title);

      let head = `<h${depth} id="${id}"><span>${title}</span>`;
      const anchor = `<a onclick="window.location.hash = '${id}'" class="anchor">#</a></h${depth}>`;

      if (isComponent) {
        head += createLabel('component');
      } else if (isDirective) {
        head += createLabel('directive');
      } else if (isService) {
        head += createLabel('service');
      }

      return head + anchor;
    }
  };
}
