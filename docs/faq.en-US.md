---
order: 10
title: FAQ
---

<blockquote style="border-color: #faad14;"><p>For more questions please search <a href="https://github.com/NG-ZORRO/ng-zorro-antd/issues?q=is%3Aopen+is%3Aissue+label%3A%22%3Aquestion%3A+FAQ%22" target="_blank">issues with FAQ tag</a>.</p></blockquote>

### Why some features are not supported?

`ng-zorro-antd` is an implementation of Ant Design for Angular, which means only features supported by Ant Design would be implemented by `ng-zorro-antd`.

### The bundle is too big in size

Please make sure you use `ng build --prod` correctly to compile. If other third-party component kits other than `ng-zorro-antd` are imported, you could generate a sourcemap file using this command `ng build --prod --sourceMap=true` to check every dependency's bundled size. You can check [this link](https://angular.io/guide/deployment#inspect-the-bundles) for further instructions.

###  Browser compatibility

Please make sure your browser is [supported by Angular](https://github.com/angular/angular) and you have imported the [polyfill](https://angular.io/guide/browser-support) file correctly. And some components' usages are not supported by some browsers (i.e `flex` property). Please submit an issue if none of these is your case.

### Can't Bind to since it isn't a known property of

Please make sure you have export `NgZorroAntdModule` in `ShareModule` if you have more than one module in your angular project, [ref](https://angular.io/guide/sharing-ngmodules).

### Expression Changed After It Has Been Checked Error

This [doc](https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4) will help you.

### Can't bind to 'formGroup' since it isn't a known property of 'form'

Don't forget to import `ReactiveFormsModule`, [ref](https://angular.io/guide/reactive-forms).

### Why my page content is not updated after I change the data?

Components of NG-ZORRO works default in `OnPush` mode, mutate `@Input` data won't work, please use immutable data.

### Why my issue is closed?

Issue is designed for maintainers and users to track the development process of the project, which means only bug reports and feature requests are accepted and usage questions are not. And to give priority to well-explained jobs, issues that are not written in the given format would be closed automatically by the bot right away.

### Where can I get help with Angular?

You can checkout the official docs and Angular forums. A good trick is to search on Google using `[keywords] -angularjs` to prevent `angularjs`'s interference. For example, you can type in `angular ngmodel -angularjs` to learn more about `ngModel` without struggling in out-dated Angular.js things.

### Relationship between NG-ZORRO and Ant Design

NG-ZORRO are maintained by engineers from Computing Platform Unit and Aliyun of Alibaba Inc. It follows Ant Design' specs and would be synced to Ant Design React regularly.
