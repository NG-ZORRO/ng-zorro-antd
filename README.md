<p align="center">
  <a href="http://ng.ant.design">
    <img width="230" src="https://img.alicdn.com/tfs/TB1FVMDosrI8KJjy0FhXXbfnpXa-200-200.svg">
  </a>
</p>

<h1 align="center">
NG-ZORRO
</h1>

<div align="center">

An enterprise-class UI components based on Ant Design and Angular.

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

English | [简体中文](README-zh_CN.md)


## ✨ Features

- An enterprise-class UI design system for web applications.
- A set of high-quality Angular components out of the box.
- Written in TypeScript with predictable static types.
- The whole package of development and design resources and tools.

## 🖥 Environment Support

* Angular `^6.0.0`
* Modern browsers and Internet Explorer 11+ (with [polyfills](https://angular.io/guide/browser-support))
* [Electron](http://electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions

> Listing `@angular/cdk` as its dependency, `ng-zorro-antd` supports the most recent two versions of all major browsers.

## 🎨 Design Specification

`ng-zorro-antd` synchronizes design specification with [Ant Design](https://ant.design/docs/spec/introduce) on a regular basis, you can check the [log](https://nz-styles-syncer.now.sh/) online.


## 📦 Installation

**We recommend using `@angular/cli` to install**. It not only makes development easier, but also allows you to take advantage of the rich ecosystem of angular packages and tooling.

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add ng-zorro-antd --i18n=en_US
```

> More information about `@angular/cli` [here](https://github.com/angular/angular-cli).

You can also install `ng-zorro-antd` with npm or yarn

```bash
$ npm install ng-zorro-antd
```

## 🔨 Usage

Import the module into every module where you want to use the components.

```ts
import { NgZorroAntModule } from 'ng-zorro-antd';

@NgModule({
  imports: [ NgZorroAntdModule ]
})
export class AppModule {
}
```

> `@angular/cli` users won't have to worried about things below but it's good to know.

And import style and SVG icon assets file link in `angular.json`.

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

See [Getting Started](https://ng.ant.design/docs/getting-started/en) for more details.

## 🔗 Links

* [ng-zorro-antd-mobile](https://github.com/NG-ZORRO/ng-zorro-antd-mobile)
* [ng-alain](https://github.com/ng-alain/ng-alain)
* [Snippet extension for VSCode](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)

## ⌨️ Development

```bash
$ git clone git@github.com:NG-ZORRO/ng-zorro-antd.git
$ cd ng-zorro-antd
$ npm install
$ npm run site:start
```

Browser would open automatically.

## 🗺 Road Map

Check [this issue](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2025) to read our plans for later 2018.

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/NG-ZORRO/ng-zorro-antd/pulls) or as [GitHub issues](https://github.com/NG-ZORRO/ng-zorro-antd/issues).


> If you're new to posting issues, we ask that you read [*How To Ask Questions The Smart Way*](http://www.catb.org/~esr/faqs/smart-questions.html) (**This guide does not provide actual support services for this project!**), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!


## ❓ Help from the Community

For questions on how to use ng-zorro-antd, please post questions to [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](http://stackoverflow.com/questions/tagged/ng-zorro) using the `ng-zorro` tag. If you're not finding what you need on stackoverflow, you can find us on [![Gitter](https://img.shields.io/gitter/room/ng-zorro/ng-zorro-antd.svg?style=flat-square)](https://gitter.im/ng-zorro/ng-zorro-antd) as well.

As always, we encourage experienced users to help those who are not familiar with `ng-zorro-antd`!

## 🎉 Users

- [Alibaba](http://www.alibaba.com/)
- [Aliyun](http://www.aliyun.com/)

> If your company or product uses NG-ZORRO, let us know [here](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1142)!

## ☀️ License

MIT
