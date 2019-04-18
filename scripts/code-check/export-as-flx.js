const fs = require('fs-extra');
const path = require('path');
const glob = require('glob').sync;
const chalk = require('chalk');

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
  const selectorRegexp = /selector\s*:\s*(('(.+)')|(`([\s\S]*?)`))/g;
  const exportAsRegexp = /exportAs\s*:\s*(('(.+)')|(`([\s\S]*?)`))/g;
  const componentSelectorRegexp = /^[a-z\-]{1,}$/;
  const directiveSelectorRegexp = /^\[([a-z\-]{1,})\]$/;
  if (fileContent.search('@(Component|Directive)') !== -1) {
    const match = selectorRegexp.exec(fileContent);
    if (exportAsRegexp.test(fileContent)) {
      return;
    }
    let selector = '';
    let exportName = '';
    if (match) {
      if (match[3]) {
        selector = match[3];
      } else if (match[5]) {
        console.log(chalk.gray(`Ignore ${match[5]}`));
      }
    }

    if (componentSelectorRegexp.test(selector)) {
      exportName = selector;
    }
    if (directiveSelectorRegexp.test(selector)) {
      exportName = directiveSelectorRegexp.exec(selector)[1];
    }

    if (exportName && whitelist.indexOf(exportName) === -1 && exportName.search('demo') === -1) {
      const newContent = fileContent.replace(selectorRegexp, `$&,\n exportAs: '${toCamelCase(exportName)}'`);
      fs.writeFileSync(filePath, newContent);
      console.log(chalk.green(`fix: ${filePath}`));
    } else {
      console.log(chalk.yellow(`Please manually check: ${filePath}`));
    }
  }
}

const paths = getComponentPaths();
paths.forEach(p => {
  fixExportAs(p);
});
