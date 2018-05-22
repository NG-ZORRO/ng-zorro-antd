const marked = require('marked');

const renderer = new marked.Renderer();
var Prism = require('node-prismjs');

renderer.heading = function (text, level) {
  const lowerText = text.toLowerCase().replace(/ /g, '-').replace(/\./g, '-').replace(/\?/g, '');
  return `<h${level} id="${lowerText}"><span>${text}</span><a onclick="window.location.hash = '${lowerText}'" class="anchor">#</a></h${level}>`
};

marked.setOptions({
  highlight: function (code,lang) {
    const language = Prism.languages[lang] || Prism.languages.autoit;
    return Prism.highlight(code, language);
  },
  renderer : renderer
});

module.exports = marked;
