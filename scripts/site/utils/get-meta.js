const YFM = require('yaml-front-matter');
const {parse} = require('marked');
const parse5 = require('parse5');

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

module.exports = function getMeta(file) {
  const meta = YFM.loadFront(file);
  const content = parse(meta.__content);
  const fragment = parse5.parseFragment(content);
  const paragraphs = [];
  findNodeByName(fragment, ['p', 'li'], paragraphs);
  const contents = paragraphs
    .map(f => {
      const c = [];
      findNodeByName(f, ['#text'], c);
      return c;
    })
    .reduce((a, b) => [...a, ...b], []);
  let description = '';
  if (meta.subtitle) {
    description = `Angular ${meta.subtitle} 组件，`;
  } else if (meta.title) {
    description = `Angular ${meta.title} Component, `;
  }
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
