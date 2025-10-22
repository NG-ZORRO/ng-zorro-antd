---
order: 1
title: 快速上手
---

NG-ZORRO 致力于提供给程序员**愉悦**的开发体验。

<blockquote style="border-color: red;"><p><strong>官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Angular 及配套设施的正确开发方式。如果你刚开始学习前端或者 Angular ，将框架作为你的第一步可能不是最好的主意 —— 掌握好基础知识再来吧！</strong></p></blockquote>

## 在线演示

最简单的使用方式参照以下 StackBlitz 演示，也推荐 Fork 本例来进行 `Bug Report`，注意不要在实际项目中这样使用。

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-ivy)

## 第一个本地实例

实际项目开发中，你会需要对 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们强烈建议使用官方的 `@angular/cli` 工具链辅助进行开发，下面我们用一个简单的实例来说明。

### 安装脚手架工具

> 如果你想了解更多CLI工具链的功能和命令，建议访问 [Angular](https://angular.cn/cli) 了解更多。

```bash
$ npm install -g @angular/cli
```

### 创建一个项目

> 在创建项目之前，请确保 `@angular/cli` 已被成功安装。

执行以下命令，`@angular/cli` 会在当前目录下新建一个名称为 `PROJECT-NAME` 的文件夹，并自动安装好相应依赖。

```bash
$ ng new PROJECT-NAME
```

### 初始化配置

进入项目文件夹，执行以下命令后将自动完成 `ng-zorro-antd` 的初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作。

```bash
$ ng add ng-zorro-antd
```

<img alt="CLI" style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

开发者可以通过增加参数来完成个性化的初始化配置，例如国际化或者自定义主题等，详细可以参考 [脚手架](/docs/schematics/zh) 部分。

### 开发调试

一键启动调试，运行成功后显示欢迎页面。

```bash
$ ng serve --port 0 --open
```

<img alt="welcome" style="display: block;padding: 30px 30%;height: 260px;" src="https://img.alicdn.com/tfs/TB1X.qJJgHqK1RjSZFgXXa7JXXa-89-131.svg">

### 构建和部署

```bash
$ ng build --prod
```

文件会被打包到 `dist` 目录中。

## 手动安装

如果想自己维护工作流，理论上你可以利用 Angular 生态圈中的 各种脚手架进行开发，如果遇到问题可参考我们所使用的 [配置](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/integration) 进行定制。

### 安装组件

```bash
$ npm install ng-zorro-antd --save
```

### 引入样式

#### 使用全部组件样式

该配置将包含组件库的全部样式，如果只想使用某些组件请查看 [使用特定组件样式](/docs/getting-started/zh#使用特定组件样式) 配置。

在 `angular.json` 中引入了

```json
{
  "styles": ["node_modules/ng-zorro-antd/ng-zorro-antd.min.css"]
}
```

在 `style.css` 中引入预构建样式文件

```css
@import '~ng-zorro-antd/ng-zorro-antd.min.css';
```

在 `style.less` 中引入 less 样式文件

```less
@import '~ng-zorro-antd/ng-zorro-antd.less';
```

#### 使用特定组件样式

> 由于组件之间的样式也存在依赖关系，单独引入多个组件的 CSS 可能导致 CSS 的冗余。

使用特定组件样式时前需要先引入基本样式(所有组件的共用样式)。

在 `style.css` 中引入预构建样式文件

```css
@import '~ng-zorro-antd/style/index.min.css'; /* 引入基本样式 */
@import '~ng-zorro-antd/button/style/index.min.css'; /* 引入组件样式 */
```

在 `style.less` 中引入 less 样式文件

```less
@import '~ng-zorro-antd/style/entry.less'; /* 引入基本样式 */
@import '~ng-zorro-antd/button/style/entry.less'; /* 引入组件样式 */
```

### 引入组件模块

最后你需要将想要使用的组件模块引入到你的组件中。

以下面的 `NzButtonModule` 模块为例：

```ts
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  imports: [NzButtonModule]
})
export class AppComponent {}
```

然后在模板中使用：

```html
<button nz-button nzType="primary">Primary</button>
```

# 注意事项

- `ng-zorro-antd` 已经包含了 `@angular/cdk/overlay-prebuilt.css` 浮层样式，无需额外导入。

## 其他

- [国际化配置](/docs/i18n/zh)
- [自定义主题](/docs/customize-theme/zh)
- [使用图标](/components/icon/zh)
