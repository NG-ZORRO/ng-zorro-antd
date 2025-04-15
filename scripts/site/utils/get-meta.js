const YFM = require('yaml-front-matter');
const { parse } = require('marked');
const { parseFragment } = require('parse5');

/**
 *
 * @param fragment {DocumentFragment}
 * @param name {string[]}
 * @param result {DocumentFragment[]}
 */
function findNodeByName(fragment, name, result = []) {
  if (name.indexOf(fragment.nodeName) !== -1) {
    result.push(fragment);
  }

  if (fragment.childNodes) {
    for (const childNode of fragment.childNodes) {
      findNodeByName(childNode, name, result);
    }
  }
}

/**
 * @typedef ComponentIndexDocMeta
 * @type {object}
 * @property {string} category - category of the component
 * @property {string} type - type of the component
 * @property {string} title - title of the component
 * @property {string} cover - cover image url
 * @property {string} [subtitle] - subtitle of the component
 * @property {string} [description] - description of the component
 * @property {string} [rawDescription] - raw description content
 * @property {number} [order] - order of the component
 * @property {boolean} [hidden=false] - whether the documentation is hidden
 * @property {boolean} [experimental=false] - whether the component is experimental
 * @property {boolean} [hasDemoPage=false] - whether the demo page exists
 * @property {string} __content - content of the component
 */

/**
 * Get metadata from markdown file
 * @param {Buffer} file
 * @return {ComponentIndexDocMeta}
 */
module.exports = function getMeta(file) {
  /** @type ComponentIndexDocMeta */
  const meta = YFM.loadFront(file);

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

  const content = parse(meta.__content, { async: false });
  const fragment = parseFragment(content);
  /** @type DocumentFragment[] */
  const paragraphs = [];
  findNodeByName(fragment, ['p', 'li'], paragraphs);
  const contents = paragraphs
    .map(f => {
      /** @type DocumentFragment[] */
      const c = [];
      findNodeByName(f, ['#text'], c);
      return c;
    })
    .reduce((a, b) => [...a, ...b], []);
  for (const content of contents) {
    if (description.length >= 150) {
      break;
    }
    description = description + content.value;
  }
  if (description.length > 150) {
    description = description.slice(0, 150) + '...';
  }
  meta.description = description;
  return meta;
};
