<p align="center">
  <a href="https://ng.ant.design">
    <img alt="logo" width="230" src="https://img.alicdn.com/tfs/TB1TFFaHAvoK1RjSZFwXXciCFXa-106-120.svg">
  </a>
</p>

<h1 align="center">
NG-ZORRO
</h1>

<div align="center">

`ng-zorro-antd` 是 Ant Design 的 Angular 实现，主要用于研发企业级中后台产品。全部代码开源并遵循 MIT 协议，任何企业、组织及个人均可免费使用。

[![Azure branch](https://img.shields.io/azure-devops/build/ng-zorro/0d271b73-3774-4dbc-a081-088df0b28bf8/2/master?style=flat-square)](https://dev.azure.com/ng-zorro/NG-ZORRO/_build)
[![CodeFactor](https://www.codefactor.io/repository/github/ng-zorro/ng-zorro-antd/badge?style=flat-square)](https://www.codefactor.io/repository/github/ng-zorro/ng-zorro-antd)
[![Codecov](https://img.shields.io/codecov/c/github/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://codecov.io/gh/NG-ZORRO/ng-zorro-antd)
[![GitHub Release Date](https://img.shields.io/github/release-date/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
[![NPM package](https://img.shields.io/npm/v/ng-zorro-antd.svg?style=flat-square)](https://npmjs.org/package/ng-zorro-antd)
[![NPM downloads](http://img.shields.io/npm/dm/ng-zorro-antd.svg?style=flat-square)](https://npmjs.org/package/ng-zorro-antd)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/1433686455925870594?style=flat-square&logo=discord&label=Discord)](https://discord.com/channels/1433686455925870594/1433686456706138195)
[![VSCode Extension](https://img.shields.io/badge/extension%20for-VSCode-blue.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)
[![Code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![X](https://img.shields.io/badge/NG--ZORRO-blue.svg?style=flat-square&logo=x)](http://x.com/ng_zorro)

</div>

[![logo](https://img.alicdn.com/tfs/TB1t6QPylr0gK0jSZFnXXbRRXXa-4000-1378.png)](http://ng.ant.design)

[English](README.md) | 简体中文

## ✨ 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 Angular 组件，与 Angular 保持同步升级。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 支持 OnPush 模式，性能卓越。
- 数十个国际化语言支持。
- 深入每个细节的主题定制能力。

## ☀️ 授权协议

[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNG-ZORRO%2Fng-zorro-antd.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNG-ZORRO%2Fng-zorro-antd?ref=badge_shield)

## 🖥 支持环境

- Angular `^20.0.0` [![npm package](https://img.shields.io/npm/v/ng-zorro-antd.svg?style=flat-square)](https://www.npmjs.org/package/ng-zorro-antd)
- 支持服务端渲染
- 现代浏览器，[浏览器支持](https://angular.cn/reference/versions#browser-support)
- [Electron](http://electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                           | last 2 versions                                                                                                                                                                                                       |

## 🎨 设计规范

`ng-zorro-antd` 与 Ant Design 设计规范定期同步，你可以在线查看[同步日志](https://nz-styles-syncer.now.sh/)。

## 📦 安装

我们强烈推荐官方的 `@angular/cli` 工具链辅助进行开发，在实际项目开发中，它可以很好的满足对 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add ng-zorro-antd
```

> 如果你想了解更多CLI工具链的功能和命令，建议访问 [Angular CLI](https://github.com/angular/angular-cli) 了解更多

## 🔨 使用

将想要使用的组件模块引入到你的组件中。

```ts
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  imports: [NzButtonModule]
})
export class AppComponent {}
```

> `@angular/cli` 的用户不需要担心下面这项设置，但知道也挺有好处。

然后在 `angular.json` 文件中引入样式和 SVG icon 资源。

```diff
{
  "assets": [
+   {
+     "glob": "**/*",
+     "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
+     "output": "/assets/"
+   }
  ],
  "styles": [
+   "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
  ]
}
```

参考[快速上手](https://ng.ant.design/docs/getting-started/zh)以了解更多。

## 🔗 链接

- [ng-zorro-antd-mobile](https://github.com/NG-ZORRO/ng-zorro-antd-mobile)
- [ng-alain](https://github.com/ng-alain/ng-alain)
- [VSCode 的 snippet 扩展](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)

## ⌨️ 开发

```bash
$ git clone git@github.com:NG-ZORRO/ng-zorro-antd.git
$ cd ng-zorro-antd
$ npm install
$ npm run start
```

浏览器会自动打开。

## 🤝 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)，或给我们 [报告 Bug](http://ng.ant.design/issue-helper/#/new-issue)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)(**本指南不提供此项目的实际支持服务！**)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

感谢 [JetBrains](https://www.jetbrains.com/?from=ng-zorro-antd) 提供的免费开源 License 赞助

[![JetBrains](https://img.alicdn.com/tfs/TB1sSomo.z1gK0jSZLeXXb9kVXa-120-130.svg)](https://www.jetbrains.com/?from=ng-zorro-antd)

## ❓ 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `ng-zorro-antd` 标签。

1. [Stack Overflow](https://stackoverflow.com/questions/tagged/ng-zorro-antd)（English）
2. [Segment Fault](https://segmentfault.com/t/ng-zorro)（中文）
3. [![Discord](https://img.shields.io/discord/748677963142135818?label=Discord&style=flat-square)](https://discord.com/channels/748677963142135818/764322550712893451)
4. 加入钉钉 NG-ZORRO 自助服务群（中文）

<img src="https://img.alicdn.com/imgextra/i2/O1CN01996NqO1ykdnAdOLqG_!!6000000006617-2-tps-864-822.png" width="300" height="300" loading="lazy" alt="ding talk qr-code">

## 🎉 谁在使用

- [阿里巴巴](https://www.alibaba.com/)
- [阿里云](https://www.aliyun.com/)
- [思特沃克](https://www.thoughtworks.com/)
- [招商银行](http://www.cmbchina.com/)
- [共道科技](https://www.gongdao.com/)
- [优速快递](http://www.uce.cn/)
- [轻流](https://qingflow.com/)
- [航天信息股份有限公司](http://www.aisino.com/)
- [达观数据](http://datagrand.com/)
- [Ververica](https://www.ververica.com/)
- [Apache Flink](https://flink.apache.org/)
- [Apache Zeppelin](https://zeppelin.apache.org/)
- [Apache Submarine](https://submarine.apache.org/)
- [Apache Metron](https://metron.apache.org/)
- [Process Automation Group](http://pag.company/)
- [ScentBird](https://www.scentbird.com/)
- [Southern Institute of Technology](https://www.sit.ac.nz/)
- [Hapify (Dynamic boilerplates tool)](https://hub.hapify.io/)

> 我们在这里列出了部分使用者，如果你的公司和产品使用了 NG-ZORRO，欢迎到 [这里](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1142) 留言。
