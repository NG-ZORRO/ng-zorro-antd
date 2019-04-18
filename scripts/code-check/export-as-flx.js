const fs = require('fs-extra');
const path = require('path');
const glob = require('glob').sync;

const componentsPath = path.resolve(__dirname, '../../components');

function getComponentPaths() {
  return glob(path.join(componentsPath, '**/!(demo)/!(*.spec).ts'));
}

function toCamelCase(str) {
  var re = /-(\w)/g;
  return str.replace(re, function($0, $1) {
    return $1.toUpperCase();
  });
}

function fixExportAs(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const whitelist = ['tbody', 'tr'];
  if (fileContent.search('@(Component|Directive)') !== -1) {
    const match = /selector\s*:\s*(('(.+)')|(`([\s\S]*?)`))/g.exec(fileContent);
    if (/exportAs\s*:\s*(('(.+)')|(`([\s\S]*?)`))/g.test(fileContent)) {
      return;
    }
    let selector = '';
    let exportName = '';
    if (match) {
      if (match[3]) {
        selector = match[3];
      } else if (match[5]) {
      }
    }

    if (/^[a-z\-]{1,}$/.test(selector)) {
      exportName = selector;
    }
    if (/^\[([a-z\-]{1,})\]$/.test(selector)) {
      exportName = /^\[([a-z\-]{1,})\]$/.exec(selector)[1];
    }

    if (exportName && whitelist.indexOf(exportName) === -1) {
      const newContent = fileContent.replace(
        /selector\s*:\s*(('(.+)')|(`([\s\S]*?)`))/g,
        `$&,\n exportAs: '${toCamelCase(exportName)}'`
      );
      fs.writeFileSync(filePath, newContent);
    } else {
      console.warn(filePath);
    }
  }
}

const paths = getComponentPaths();
paths.forEach(p => {
  fixExportAs(p);
});
