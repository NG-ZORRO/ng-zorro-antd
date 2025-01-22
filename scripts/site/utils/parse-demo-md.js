const { parse } = require('./marked');
const YFM = require('yaml-front-matter');
const angularNonBindAble = require('./angular-nonbindable');

/**
 * @typedef I18nTitle
 * @type {object}
 * @property {string} zh-CN - title in Chinese
 * @property {string} en-US - title in English
 */

/**
 * @typedef IframeMeta
 * @type {object}
 * @property {number} height - iframe height
 * @property {string} [source] - iframe url
 */

/**
 * @typedef ComponentDemoDocMeta
 * @type {object}
 * @property {number} order - display order of the demo
 * @property {I18nTitle} title - title of the demo
 * @property {IframeMeta} [iframe] - iframe configuration
 * @property {boolean} [debug] - whether the demo is debugging
 * @property {string} __content - content of the demo
 */

/**
 * @typedef ComponentDemoDoc
 * @type {object}
 * @property {ComponentDemoDocMeta} meta - metadata of the demo
 * @property {string} name - name of the demo component
 * @property {string} zh - content in Chinese
 * @property {string} zhCode - code content in Chinese
 * @property {string} en - content in English
 * @property {string} enCode - code content in English
 * @property {string} ts - typescript code content
 */

/**
 * Parse demo markdown file
 * @param {Buffer} file
 * @return {ComponentDemoDoc}
 */
module.exports = function parseDemoMd(file) {
  // 获取meta信息
  /** @type ComponentDemoDocMeta */
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
        zhPart += parse(remark.stringify(child), { async: false });
      } else {
        enPart += parse(remark.stringify(child), { async: false });
      }
    }
  }
  return {
    meta: meta,
    zh  : angularNonBindAble(zhPart),
    en  : angularNonBindAble(enPart)
  };
};