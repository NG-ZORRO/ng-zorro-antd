const MD = require('./marked');
const YFM = require('yaml-front-matter');
const angularNonBindAble = require('./angular-nonbindable');
module.exports = function parseDemoMd(file) {
  // 获取meta信息
  const meta = YFM.loadFront(file);
  const content = meta.__content;
  delete meta.__content;

  const remark = require('remark')();
  const ast = remark.parse(content);

  // 分离中英文
  let isAfterENHeading = false;

  let zhPart = '';
  let enPart = '';

  for (let i = 0; i < ast.children.length; i++) {
    const child = ast.children[i];
    if (child.type === 'heading' && child.depth === 2 && child.children[0].value === 'en-US') {
      isAfterENHeading = true;
    }
    if (!(child.type === 'heading' && child.depth === 2)) {
      if (!isAfterENHeading) {
        zhPart += MD(remark.stringify(child));
      } else {
        enPart += MD(remark.stringify(child));
      }
    }
  }
  return {
    meta: meta,
    zh  : angularNonBindAble(zhPart),
    en  : angularNonBindAble(enPart)
  };
};