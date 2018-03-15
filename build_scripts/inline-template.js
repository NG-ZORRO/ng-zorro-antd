const fs = require('fs')
const path = require('path')
const glob = require('glob').sync

function inlineResourcesForDirectory(folderPath) {
  glob(path.join(folderPath, '**/*.ts')).forEach(filePath => inlineResources(filePath))
}

function inlineResources(filePath) {
  let fileContent = fs.readFileSync(filePath, 'utf-8')

  fileContent = inlineTemplate(fileContent, filePath)

  fs.writeFileSync(filePath, fileContent, 'utf-8')
}

function inlineTemplate(fileContent, filePath) {
  return fileContent.replace(/templateUrl\s*:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
    const templatePath = path.join(path.dirname(filePath), templateUrl)
    const templateContent = loadResourceFile(templatePath)
    return `template: \`${templateContent}\``
  })
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8')
    .replace(/([\n\r]\s*)+/gm, ' ')
}

inlineResourcesForDirectory('./__gen_components')
