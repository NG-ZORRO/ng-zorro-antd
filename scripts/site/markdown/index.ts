/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

import prism from './prism';
import { getRenderer } from './renderer';

const highlight = markedHighlight({
  langPrefix: 'language-',
  highlight(code, lang) {
    const language = prism.languages[lang] || prism.languages.autoit;
    return prism.highlight(code, language, lang);
  }
});

const marked = new Marked(highlight);

marked.use({ renderer: getRenderer(marked) });

export default marked;
