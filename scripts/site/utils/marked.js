const { Marked } = require('marked');
const { markedHighlight } = require('marked-highlight');
const slugify = require('slugify');
const prism = require('./prism');
const { parseFragment, serialize } = require('parse5');

const highlight = markedHighlight({
  langPrefix: 'language-',
  highlight(code, lang) {
    const language = prism.languages[lang] || prism.languages.autoit;
    return prism.highlight(code, language, lang);
  }
});

const marked = new Marked(highlight);

const DIRECTIVE_REGEX = /^\[[a-zA-Z-]+]/;
const SERVICE_REGEX = /^Nz[a-zA-Z]+Service$/;
const originLinkHandler = marked.defaults.renderer.link;

/**
 * @param {'component' | 'directive' | 'service'} label
 * @returns {string}
 */
function createLabel(label) {
  return `<label class="api-type-label ${label}">${label}</label>`;
}

const renderer = {
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
      remove: /[*+~.()'"!:@\\\[\]]/g,
      replacement: '_',
      lower: true
    });
    const isMarkedLabel = depth === 3 && title.indexOf('nz-') === 0;
    const isDirective = DIRECTIVE_REGEX.test(title);
    const isComponent = isMarkedLabel && !isDirective;
    const isService =  SERVICE_REGEX.test(title);

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

marked.use({ renderer });

module.exports = marked;
