---
order: 11
title: 常见问题
---

<blockquote style="border-color: #faad14;"><p>更多常见问题请搜索<a href="https://github.com/NG-ZORRO/ng-zorro-antd/issues?q=is%3Aopen+is%3Aissue+label%3A%22%3Aquestion%3A+FAQ%22" target="_blank" rel="noopener">标有 FAQ 的 issue</a>。</p></blockquote>

### Angular 是不是打出来的包很大？ `ng-zorro-antd` 打包大小如何？

Angular 的 hello-world 项目（包含路由、动画与 Http 等模块） gzip 之后大概 `30KB`，`ng-zorro-antd` 的官网（包含所有组件，懒加载）打包后 gzip 之后为 `287KB`。这与 React 或者 Vue 增加路由、动画、Http 等模块之后 gzip 的体积不会有太大差异。

如果碰到了打包大小问题，首先请确定使用了 `ng build --prod` 正确的方式进行了打包，如果除 `ng-zorro-antd` 之外还引入了其他第三方组件库，你可以通过 `ng build --prod --sourceMap=true` 命令生成 sourcemap 文件后，再通过 source-map-explorer 检查每个模块所占用的体积，具体操作可以参考[官方文档](https://angular.cn/guide/deployment#inspect-the-bundles)。

### Angular 是不是过时了，运行会慢吗？`ng-zorro-antd` 性能如何？

Angular 与 angular.js 不是同一种前端框架，angular.js 发布的时间在 2010 年 10 月份，而 Angular 诞生时间在 2016 年 9 月份，比 React 和 Vue 的诞生时间都要晚。

总体而言 Angular Vue 与 React 三种框架的运行速度没有太大差异，也不会是你项目运行时快慢的决定因素，具体的性能参数可以参考[该项目](https://github.com/krausest/js-framework-benchmark)。`ng-zorro-antd` 的所有组件均为原生 Angular 组件，并且默认运行在 `OnPush` 模式下，能够保证以 Angular 支持的最优速度运行。

### 我可以在 Angular 其他版本中使用 ng-zorro-antd 吗？

`ng-zorro-antd` 与 `@angular/core` 保持相同的主版本号，例如 `ng-zorro-antd@8` 支持 `@angular/core@8` 版本，依次类推，为了获得最好的性能，推荐升级至最新版本的 Angular。升级 Angular 可以参考[此文档](https://angular.cn/update-guide)。

### 我可以只使用 ng-zorro-antd 的部分组件吗？

`ng-zorro-antd` 的所有组件均支持单独导入使用，与其他的流行组件库可以混用。

### ng-zorro-antd 为什么使用 less 定制主题？ 我能使用 sass 吗？

ng-zorro-antd 的设计规范遵从 ant design，因此同样使用了 less 文件来定制主题，`@angular/cli` 支持同一个项目中混用多种 css 预处理器， 与 sass 等文件不会互相干扰。

### ng-zorro-antd 能和 d3, echarts ...一起使用吗？

ng-zorro-antd 本质上是组件库，与用户自己写的 `@Component` 没有任何的区别，也不会与第三方库产生冲突。

### Can't Bind to since it isn't a known property of

如果使用多 Module 管理方式，NG-ZORRO 的模块需要在每个子 Module 中都要 import，或者在 `ShareModule` 中 export，可以参考[官方文档](https://angular.cn/guide/ngmodules/sharing)。

### Expression Changed After It Has Been Checked Error 错误

Angular 的数据流是单向数据流，违反数据流走向会引起该问题，[这篇文章](https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4)会帮助你理解原因。

### Can't bind to 'formGroup' since it isn't a known property of 'form'

使用 Reactive Forms 需要额外引入 `ReactiveFormsModule`，可以参考[官方文档](https://angular.cn/guide/forms/reactive-forms)。

### 模板中 `[nzValue]="data"` `nzValue="data"` 与 `nzValue="{{data}}"` 有什么区别

`nzValue="data"` 组件收到的是字符串 `data`，`nzValue="{{data}}"` 等价于 `[nzValue]="data.toString()"`。如果你需要传入 `number` 或者 `boolean` 类型时，应当使用 `[nzValue]="data"` 的方式。

### 数据修改后页面为什么没有更新

为了获得更好的性能，NG-ZORRO 所有组件都运行在 [OnPush](https://angular.cn/guide/components/advanced-configuration#changedetectionstrategy) 模式下，这意味着对 `@Input()` 数据的 mutate 将不会生效，请使用 immutable 方式操作数组或者对象。

```typescript
// 增加数据
this.dataSet = [
  ...this.dataSet,
  {
    key: `${this.i}`,
    name: `Edward King ${this.i}`,
    age: '32',
    address: `London, Park Lane no. ${this.i}`
  }
];
// 删除数据
this.dataSet = this.dataSet.filter(d => d.key !== i);
```

开发者也可以使用 [immer](https://immerjs.github.io/immer/docs/introduction) 获得更好的操作体验

### 我的页面卡死了，函数不停的在执行

在 Angular 的模板表达式中，绑定带有副作用的属性或者方法都是[危险的](https://angular.cn/guide/template-syntax#avoid-side-effects)，如果你违反了这条规则，很可能会造成性能下降甚至引起死循环。以下的代码会在页面中不停输出 `I will run every time`，因为 `console.log` 本身是一种副作用函数。

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

### 怎样才能进一步提高 Angular 项目性能？

推荐 [https://web.dev/angular](https://web.dev/angular) 的系列文章

### 为什么我的 ISSUE 会被关闭

ISSUE 列表是为了 开发者 和 用户 追踪相关的开发进度而设计的，这意味 ISSUE 只接受 bug 报告或是新功能请求 (feature requests)，这意味着我们不接受用法问题。
另外为了给予 更具体的工作更高的优先级和提高 ISSUE 处理的效率，未按照 格式提交的 ISSUE 也将会被立刻自动关闭。

### 有些特性为什么不会被支持

`ng-zorro-antd` 是 Angular 版本 Ant Design 的实现，这意味着只有 Ant Design 支持的交互、功能 才会被 `ng-zorro-antd` 实现。

### 浏览器兼容性问题

首先请确定浏览器版本得到了 Angular 的[官方支持](https://github.com/angular/angular)，并正确引入了 [polyfill](https://angular.cn/reference/versions#polyfills) 文件，另外有些组件的部分使用方式不支持部分浏览器（例如 flex显示方式），如果不是以上问题，请提 ISSUE 给我们。

### 官网能正常工作，相同的用法本地运行有问题，是组件库的 BUG 吗？

不会，NG-ZORRO 的官网使用在 npm 上发布的相同版本构建，所有的构建日志都可以在 [Azure](https://dev.azure.com/ng-zorro/NG-ZORRO) 查看，请仔细检查本地运行环境（版本，其他依赖包）等问题。

### Angular的相关问题在哪里提问

除了Angular的官方文档和相关的论坛之外，Angular的相关问题可以在 Google 或者 百度 上搜索 `关键字 -angularjs` 来避免 `angularjs` 的干扰，例如 `angular ngmodel -angularjs` 就可以获得 Angular 关于 `ngModel` 的相关文章。
