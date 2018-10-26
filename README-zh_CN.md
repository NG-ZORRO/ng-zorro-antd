<p align="center">
  <a href="http://ng.ant.design">
    <img width="230" src="https://img.alicdn.com/tfs/TB1FVMDosrI8KJjy0FhXXbfnpXa-200-200.svg">
  </a>
</p>

<h1 align="center">
NG-ZORRO
</h1>

<div align="center">

Ant Design 的 Angular 实现，开发和服务于企业级后台产品。

[![Travis branch](https://img.shields.io/travis/NG-ZORRO/ng-zorro-antd/master.svg?style=flat-square)](https://travis-ci.org/NG-ZORRO/ng-zorro-antd)
[![Codecov](https://img.shields.io/codecov/c/github/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://codecov.io/gh/NG-ZORRO/ng-zorro-antd)
[![Dependencies](https://img.shields.io/david/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://david-dm.org/NG-ZORRO/ng-zorro-antd)
[![DevDependencies](https://img.shields.io/david/dev/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://david-dm.org/NG-ZORRO/ng-zorro-antd?type=dev)
[![GitHub Release Date](https://img.shields.io/github/release-date/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
[![npm package](https://img.shields.io/npm/v/ng-zorro-antd.svg?style=flat-square)](https://www.npmjs.org/package/ng-zorro-atnd)
[![NPM downloads](http://img.shields.io/npm/dm/ng-zorro-antd.svg?style=flat-square)](https://npmjs.org/package/ng-zorro-antd)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/ng-zorro/ng-zorro-antd.svg?style=flat-square)](https://gitter.im/ng-zorro/ng-zorro-antd)
[![extension-for-VSCode](https://img.shields.io/badge/extension%20for-VSCode-blue.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)

</div>

[![](https://cdn-images-1.medium.com/max/2000/1*NIlj0-TdLMbo_hzSBP8tmg.png)](http://ng.ant.design)

[English](README.md) | 简体中文

## ✨ 特性

- 提炼自企业级中后台产品的交互语言和视觉风格。
- 开箱即用的高质量 Angular 组件。
- 使用 TypeScript 构建，提供完整的类型定义文件。
- 全链路开发和设计工具体系。

## 🖥 支持环境

- Angular `^6.0.0`
- 现代浏览器，以及 Internet Explorer 11+ （使用 [polyfills](https://angular.io/guide/browser-support)）
- [Electron](http://electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions| last 2 versions

> 由于 `@angular/cdk` 的缘故，`ng-zorro-antd` 支持主要浏览器的最新两个主版本。

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

在每一个需要使用组件的 module 中引入 `NgZorroAntdModule`。

```ts
import { NgZorroAntModule } from 'ng-zorro-antd';

@NgModule({
  imports: [ NgZorroAntdModule ]
})
export class AppModule {
}
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

* [ng-zorro-antd-mobile](https://github.com/NG-ZORRO/ng-zorro-antd-mobile)
* [ng-alain](https://github.com/ng-alain/ng-alain)
* [VSCode 的 snippet 扩展](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)

## ⌨️ 开发

```bash
$ git clone git@github.com:NG-ZORRO/ng-zorro-antd.git
$ cd ng-zorro-antd
$ npm install
$ npm run site:start
```

浏览器会自动打开。

## 🗺 Road Map

查看 [这个 issue](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2025) 来了解我们 2018 下半年的开发计划。

## 🤝 如何贡献

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)

在任何形式的参与前，请先阅读 [贡献者文档](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md)。如果你希望参与贡献，欢迎 [Pull Request](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)，或给我们 [报告 Bug](http://ng.ant.design/issue-helper/#/new-issue)。

> 强烈推荐阅读 [《提问的智慧》](https://github.com/ryanhanwu/How-To-Ask-Questions-The-Smart-Way)(**本指南不提供此项目的实际支持服务！**)、[《如何向开源社区提问题》](https://github.com/seajs/seajs/issues/545) 和 [《如何有效地报告 Bug》](http://www.chiark.greenend.org.uk/%7Esgtatham/bugs-cn.html)、[《如何向开源项目提交无法解答的问题》](https://zhuanlan.zhihu.com/p/25795393)，更好的问题更容易获得帮助。

## ❓ 社区互助

如果您在使用的过程中碰到问题，可以通过下面几个途径寻求帮助，同时我们也鼓励资深用户通过下面的途径给新人提供帮助。

通过 Stack Overflow 或者 Segment Fault 提问时，建议加上 `ng-zorro` 标签。

1. [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](https://stackoverflow.com/questions/tagged/ng-zorro)（English）
2. [<img alt="Segment Fault" src="http://static.segmentfault.com/global/img/logo.svg" width="100" />](https://segmentfault.com/t/ng-zorro)（中文）
3. [![Gitter](https://img.shields.io/gitter/room/ng-zorro/ng-zorro-antd.svg?style=flat-square)](https://gitter.im/ng-zorro/ng-zorro-antd)
4. 加入钉钉 NG-ZORRO 自助服务群（中文）

<img src="https://img.alicdn.com/tfs/TB17P11r_qWBKNjSZFxXXcpLpXa-750-990.jpg" width="300">

## 🎉 谁在使用

- [阿里巴巴](http://www.alibaba.com/)
- [阿里云](http://www.aliyun.com/)

> 如果你的公司和产品使用了 NG-ZORRO，欢迎到 [这里](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1142) 留言。

## ☀️ 授权协议

MIT
