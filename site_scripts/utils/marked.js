const marked = require('marked');

const renderer = new marked.Renderer();
const Prism = require('node-prismjs');

renderer.heading = function (text, level) {
  const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g, '');
  const isMarkedLabel = (level === 3) && (text.indexOf('nz-') === 0);
  const isDirective = (text.indexOf('[') > -1) && (text.indexOf(']') > -1);
  const isComponent = isMarkedLabel && !isDirective;
  const isService = (text.indexOf('Nz') === 0) && (text.indexOf('Service') > -1);
  const head = `<h${level} id="${lowerText}"><span>${text}</span>`;
  const link = `<a onclick="window.location.hash = '${lowerText}'" class="anchor">#</a></h${level}>`;
  if (isComponent) {
    return head + `<label class="api-type-label component">component</label>` + link;
  } else if (isDirective) {
    return head + `<label class="api-type-label directive">directive</label>` + link;
  } else if (isService) {
    return head + `<label class="api-type-label service">service</label>` + link;
  } else {
    return head + link;
  }
};

marked.setOptions({
  highlight: function (code, lang) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(code, language);
  },
  renderer : renderer
});

module.exports = marked;
