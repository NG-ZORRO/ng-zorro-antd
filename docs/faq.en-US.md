---
order: 8
title: FAQ
---

### Why individually importing is not supported?

In fact, from the first version of `ng-zorro-antd`, all its code is wriitten in TypeScript. Tree Shaking strategy is used to reduce the size of your bundle and unused modules would not be bundled. Consequently, individually importing is unnecessary.

![](https://img.alicdn.com/tfs/TB1D8MXdTtYBeNjy1XdXXXXyVXa-2864-1592.jpg)

### Why some features are not supported?

`ng-zorro-antd` is an implementation of Ant Design for Angular, which means only features supported by Ant Design would be implemented by `ng-zorro-antd`.

### The bundle is too big in size

Please make sure you use `ng build --prod` correctly to compile. If other third-party component kits other than `ng-zorro-antd` are imported, you could generate a sourcemap file using this command `ng build --prod --sourcemaps` to check every dependecy's bundled size. You can check [this link](https://angular.io/guide/deployment#inspect-the-bundles) for furthur instructions.

###  Browser compatibility

Please make sure your browser is [supported by Angular](https://github.com/angular/angular) and you have imported the [polyfill](https://angular.io/guide/browser-support) file correctly. And some components' usages are not supported by some browsers (i.e `flex` property). Please submit an issue if none of these is your case.

### Why my page content is not updated after I change the data?

Please make sure you use [Angular](https://angular.io/guide/lifecycle-hooks#onchanges) in the correct way.

### Why my issue is closed?

Issue is designed for maintainers and users to track the development process of the project, which means only bug reports and feature requests are accepted and usage questions are not. And to give priority to well-explained jobs, issues that are not written in the given format would be closed autometically by the bot right away.

### Where can I get help with Angular?

You can checkout the official docs and Angular forums. A good trick is to search on Google using `[keywords] -angular` to prevent `angularjs`'s interference. For example, you can type in `angular ngmodel -angularjs` to learn more about `ngModel` without struggling in out-dated Angular.js things.

### Relationship between NG-ZORRO and Ant Design

NG-ZORRO are maintained by engineers from Computing Platform Unit and Aliyun of Alibaba Inc. It follows Ant Design' specs and would be synced to Ant Design React regularly.
