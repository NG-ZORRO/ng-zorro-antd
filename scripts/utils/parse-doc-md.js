const MD = require('./marked');
const YFM = require('yaml-front-matter');
const angularNonBindAble = require('./angular-nonbindable');

module.exports = function parseDocMd(file, path) {
  // 获取meta信息
  const meta = YFM.loadFront(file);
  const content = meta.__content;
  delete meta.__content;

  const remark = require('remark')();
  const ast = remark.parse(content);
  // 分离前后两部分
  let isAfterAPIHeading = false;

  let firstPart = '';
  let secondPart = '';

  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    if (child.type === 'heading' && child.depth === 2 && child.children[0].value === 'API') {
      isAfterAPIHeading = true;
    }
    if (!isAfterAPIHeading) {
      firstPart += MD(remark.stringify(child));
    } else {
      secondPart += MD(remark.stringify(child));
    }
  }
  return {
    meta     : meta,
    path     : path,
    whenToUse: angularNonBindAble(firstPart),
    api      : angularNonBindAble(secondPart),
  }
};