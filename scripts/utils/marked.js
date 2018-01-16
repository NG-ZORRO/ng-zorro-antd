const marked = require('marked');

const renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  const lowerText = text.toLowerCase().replace(/ /g,'-').replace(/\./g,'-').replace(/\?/g,'');
  return `<h${level} id="${lowerText}"><span>${text}</span><a onclick="window.location.hash = '${lowerText}'" class="anchor">#</a></h${level}>`
};

marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  renderer : renderer
});

module.exports = marked;