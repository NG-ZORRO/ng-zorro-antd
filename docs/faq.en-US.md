---
order: 11
title: FAQ
---

<blockquote style="border-color: #faad14;"><p>For more questions please search <a href="https://github.com/NG-ZORRO/ng-zorro-antd/issues?q=is%3Aopen+is%3Aissue+label%3A%22%3Aquestion%3A+FAQ%22" target="_blank" rel="noopener">issues with FAQ tag</a>.</p></blockquote>

### The bundle size of Angular and `ng-zorro-antd`

The size hello-world project of angular after gzip is about `30KB`, the size of `ng-zorro-antd`'s doc site is about `287KB`.

If you meet the bundle size issue, please make sure you use `ng build --prod` correctly to compile. If other third-party component kits other than `ng-zorro-antd` are imported, you could generate a sourcemap file using this command `ng build --prod --sourceMap=true` to check every dependency's bundled size. You can check [this link](https://angular.io/guide/deployment#inspect-the-bundles) for further instructions.

### Runtime performance of Angular and `ng-zorro-antd`

Angular Vue and React have very similar benchmarks, which should not be a deciding factor, ref [benchmark](https://github.com/krausest/js-framework-benchmark)。All components of `ng-zorro-antd` are Angular Native and under `OnPush` mode, which will provide the best performance of Angular.

### Can I use ng-zorro-antd in other Angular version?

`ng-zorro-antd` keeps the same major version with `@angular/core`, for example `ng-zorro-antd@8` supports `@angular/core@8`. In order to get the best performance, we recommend to use the latest version of angular, ref [update docs](https://angular.dev/update-guide).

### Can I use only some of the components of ng-zorro-antd?

Yes, all components of `ng-zorro-antd` can be imported separately.

### Why ng-zorro-antd use less？ Can I use sass instead？

ng-zorro-antd follow the design spec of Ant Design, which could customize theme by less. `@angular/cli` support using both `less` and `sass` in the same project, they could work together.

### Can I use ng-zorro-antd with d3, jquery?

All codes of ng-zorro-antd are native angular code, they won't have conflict with the other third libs.

### Can't Bind to since it isn't a known property of

Please make sure you have export NG-ZORRO's feature modules in `ShareModule` if you have more than one module in your angular project, [ref](https://angular.dev/guide/ngmodules/sharing).

### Expression Changed After It Has Been Checked Error

This [doc](https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4) will help you.

### Can't bind to 'formGroup' since it isn't a known property of 'form'

Don't forget to import `ReactiveFormsModule`, [ref](https://angular.dev/guide/forms/reactive-forms).

### The difference between `[nzValue]="data"` `nzValue="data"` and `nzValue="{{data}}"`

`nzValue="data"` the component would get the `data` string, `nzValue="{{data}}"` equals to `[nzValue]="data.toString()"`. If you need pass `number` or `boolean` data, you should use `[nzValue]="data"`.

### Why my page content is not updated after I change the data?

In order to get better performance, all NG-ZORRO's components are running under [OnPush](https://angular.dev/guide/components/advanced-configuration#changedetectionstrategy) mode, this means any mutate to the `@Input()` data won't trigger change detection, please use immutable way to update array or object.

```typescript
// add data
this.dataSet = [
  ...this.dataSet,
  {
    key: `${this.i}`,
    name: `Edward King ${this.i}`,
    age: '32',
    address: `London, Park Lane no. ${this.i}`
  }
];
// remove data
this.dataSet = this.dataSet.filter(d => d.key !== i);
```

Recommend using [immer](https://immerjs.github.io/immer/docs/introduction) for a better development experience.

### My Angular app is deadlock, what happened?

Evaluation of a template expression should have no visible side effects. It would cause performance issue or deadlock if you go against the rule. The following component will print `I will run every time` every time.

```typescript
@Component({
  template: ` <input [value]="value" /> `
})
export class BugComponent {
  value(): string {
    console.log('I will run every time');
    return 'value';
  }
}
```

### How to make Angular applications faster?

Read [https://web.dev/angular](https://web.dev/angular).

### Why some features are not supported?

`ng-zorro-antd` is an implementation of Ant Design for Angular, which means only features supported by Ant Design would be implemented by `ng-zorro-antd`.

### Browser compatibility

Please make sure your browser is [supported by Angular](https://github.com/angular/angular) and you have imported the [polyfill](https://angular.dev/reference/versions#polyfills) file correctly. And some components' usages are not supported by some browsers (i.e `flex` property). Please submit an issue if none of these is your case.

### Why my issue is closed?

Issue is designed for maintainers and users to track the development process of the project, which means only bug reports and feature requests are accepted and usage questions are not. And to give priority to well-explained jobs, issues that are not written in the given format would be closed automatically by the bot right away.

### Where can I get help with Angular?

You can checkout the official docs and Angular forums. A good trick is to search on Google using `[keywords] -angularjs` to prevent `angularjs`'s interference. For example, you can type in `angular ngmodel -angularjs` to learn more about `ngModel` without struggling in out-dated Angular.js things.
