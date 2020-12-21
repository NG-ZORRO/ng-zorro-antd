<p align="center">
  <a href="http://ng.ant.design">
    <img width="230" src="https://img.alicdn.com/tfs/TB1TFFaHAvoK1RjSZFwXXciCFXa-106-120.svg">
  </a>
</p>

<h1 align="center">
NG-ZORRO
</h1>

<div align="center">

An enterprise-class Angular UI component library based on Ant Design.

[![Azure branch](https://img.shields.io/azure-devops/build/ng-zorro/0d271b73-3774-4dbc-a081-088df0b28bf8/2/master?style=flat-square)](https://dev.azure.com/ng-zorro/NG-ZORRO/_build)
[![CodeFactor](https://www.codefactor.io/repository/github/ng-zorro/ng-zorro-antd/badge?style=flat-square)](https://www.codefactor.io/repository/github/ng-zorro/ng-zorro-antd)
[![Codecov](https://img.shields.io/codecov/c/github/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://codecov.io/gh/NG-ZORRO/ng-zorro-antd)
[![GitHub Release Date](https://img.shields.io/github/release-date/NG-ZORRO/ng-zorro-antd.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
[![npm package](https://img.shields.io/npm/v/ng-zorro-antd.svg?style=flat-square)](https://www.npmjs.org/package/ng-zorro-antd)
[![NPM downloads](http://img.shields.io/npm/dm/ng-zorro-antd.svg?style=flat-square)](https://npmjs.org/package/ng-zorro-antd)
[![GitHub license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE)
[![Discord](https://img.shields.io/discord/748677963142135818?label=Discord&style=flat-square)](https://discord.com/channels/748677963142135818/764322550712893451)
[![extension-for-VSCode](https://img.shields.io/badge/extension%20for-VSCode-blue.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=cipchk.ng-zorro-vscode)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Twitter](https://img.shields.io/badge/Twitter-NG--ZORRO-blue.svg?style=flat-square&logo=twitter)](https://twitter.com/ng_zorro)

</div>

[![](https://img.alicdn.com/tfs/TB1t6QPylr0gK0jSZFnXXbRRXXa-4000-1378.png)](http://ng.ant.design)

English | [简体中文](README-zh_CN.md)


## ✨ Features

- An enterprise-class UI design system for Angular applications.
- 60+ high-quality Angular components out of the box.
- Written in TypeScript with predictable static types.
- The whole package of development and design resources and tools.
- Support OnPush mode, high performance.
- Powerful theme customization in every detail.
- Internationalization support for dozens of languages.


## ☀️ License

[MIT](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FNG-ZORRO%2Fng-zorro-antd.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FNG-ZORRO%2Fng-zorro-antd?ref=badge_shield)

## 🖥 Environment Support

* Angular `^11.0.0` [![npm package](https://img.shields.io/npm/v/ng-zorro-antd.svg?style=flat-square)](https://www.npmjs.org/package/ng-zorro-antd)
* Server-side Rendering
* Modern browsers and Internet Explorer 11+ (with [polyfills](https://angular.io/guide/browser-support))
* [Electron](http://electron.atom.io/)

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png" alt="Electron" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Electron |
| --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions | last 2 versions


## 🎨 Design Specification

`ng-zorro-antd` synchronizes design specification with [Ant Design](https://ant.design/docs/spec/introduce) on a regular basis, you can check the [log](https://nz-styles-syncer.now.sh/) online.


## 📦 Installation

**We recommend using `@angular/cli` to install**. It not only makes development easier, but also allows you to take advantage of the rich ecosystem of angular packages and tooling.

```bash
$ ng new PROJECT_NAME
$ cd PROJECT_NAME
$ ng add ng-zorro-antd
```

> More information about `@angular/cli` [here](https://github.com/angular/angular-cli).

You can also install `ng-zorro-antd` with npm or yarn

```bash
$ npm install ng-zorro-antd
```

## 🔨 Usage

Import the component modules you want to use into your `app.module.ts` file and [feature modules](https://angular.io/guide/feature-modules).

```ts
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [ NzButtonModule ]
})
export class AppModule {
}
```

> `@angular/cli` users won't have to worry about the things below but it's good to know.

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
$ npm run start
```

Browser would open automatically.

## 🤝 Contributing

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/NG-ZORRO/ng-zorro-antd/pulls)

We welcome all contributions. Please read our [CONTRIBUTING.md](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/CONTRIBUTING.md) first. You can submit any ideas as [pull requests](https://github.com/NG-ZORRO/ng-zorro-antd/pulls) or as [GitHub issues](https://github.com/NG-ZORRO/ng-zorro-antd/issues).


> If you're new to posting issues, we ask that you read [*How To Ask Questions The Smart Way*](http://www.catb.org/~esr/faqs/smart-questions.html) (**This guide does not provide actual support services for this project!**), [How to Ask a Question in Open Source Community](https://github.com/seajs/seajs/issues/545) and [How to Report Bugs Effectively](http://www.chiark.greenend.org.uk/~sgtatham/bugs.html) prior to posting. Well written bug reports help us help you!

Thanks to [JetBrains](https://www.jetbrains.com/?from=ng-zorro-antd) for supporting us free open source licenses.

[![JetBrains](https://img.alicdn.com/tfs/TB1sSomo.z1gK0jSZLeXXb9kVXa-120-130.svg)](https://www.jetbrains.com/?from=ng-zorro-antd)

## ❓ Help from the Community

For questions on how to use ng-zorro-antd, please post questions to [<img alt="Stack Overflow" src="https://cdn.sstatic.net/Sites/stackoverflow/company/img/logos/so/so-logo.svg?v=2bb144720a66" width="140" />](http://stackoverflow.com/questions/tagged/ng-zorro-antd) using the `ng-zorro-antd` tag. If you're not finding what you need on stackoverflow, you can find us on [![Discord](https://img.shields.io/discord/748677963142135818?label=Discord&style=flat-square)](https://discord.com/channels/748677963142135818/764322550712893451) as well.

As always, we encourage experienced users to help those who are not familiar with `ng-zorro-antd`!

## 🎉 Users

- [Alibaba](https://www.alibaba.com/)
- [Aliyun](https://www.aliyun.com/)
- [ThoughtWorks](https://www.thoughtworks.com/)
- [China Merchants Bank](http://english.cmbchina.com/)
- [Ververica](https://www.ververica.com/)
- [Apache Flink](https://flink.apache.org/)
- [Apache Zeppelin](https://zeppelin.apache.org/)
- [Apache Submarine](https://submarine.apache.org/)
- [Apache Metron](https://metron.apache.org/)
- [Process Automation Group](http://pag.company/)
- [AISINOCO](http://www.aisino.com/)
- [GongDao](https://www.gongdao.com/)
- [UC Express](http://www.uce.cn/)
- [Qingflow](https://qingflow.com/)
- [DataGrand](http://datagrand.com/)
- [ScentBird](https://www.scentbird.com/)
- [Southern Institute of Technology](https://www.sit.ac.nz/)
- [Hapify (Dynamic boilerplates tool)](https://hub.hapify.io/)

> We list some users here, if your company or product uses NG-ZORRO, let us know [here](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1142)!

**Love ng-zorro-antd? Give our repo a star :star: :arrow_up:.**
