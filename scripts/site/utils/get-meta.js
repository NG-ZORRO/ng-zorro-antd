const YFM = require('yaml-front-matter');
const MD = require('marked');
const parse5 = require('parse5');

/**
 *
 * @param fragment {DocumentFragment}
 * @param name {string}
 * @param result {DocumentFragment[]}
 */
function findNodeByName(fragment, name, result = []) {
  if (fragment.nodeName === name) {
    result.push(fragment);
  }

  if (fragment.childNodes) {
    for (const childNode of fragment.childNodes) {
      findNodeByName(childNode, name, result);
    }
  }

}

module.exports = function getMeta(file) {
  const meta = YFM.loadFront(file);
  const content = MD(meta.__content);
  const fragment = parse5.parseFragment(content)
  const paragraphs = [];
  findNodeByName(fragment, 'p', paragraphs);
  const contents = paragraphs.map(f => {
    const c = [];
    findNodeByName(f, '#text', c);
    return c;
  }).reduce((a, b) => [...a, ...b], []);
  let description = '';
  for (const content of contents) {
    if (description.length >= 160) {
      break;
    }
    description = description + content.value;
  }
  meta.description = description;
  return meta;
};