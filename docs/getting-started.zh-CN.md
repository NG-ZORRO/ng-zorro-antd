---
order: 1
title: 快速上手
---

NG-ZORRO 致力于提供给程序员**愉悦**的开发体验。

<blockquote style="border-color: red;"><p><strong>官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Angular 及配套设施的正确开发方式。如果你刚开始学习前端或者 Angular ，将框架作为你的第一步可能不是最好的主意 —— 掌握好基础知识再来吧！</strong></p></blockquote>
<blockquote style="border-color: red;"><p><a href="https://github.com/NG-ZORRO/today-ng-steps" target="_blank">我们为你准备了一套教程</a>，能够帮助你快速上手 NG-ZORRO。</p></blockquote>

## 在线演示

最简单的使用方式参照以下 StackBlitz 演示，也推荐 Fork 本例来进行 `Bug Report`，注意不要在实际项目中这样使用。

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-start?file=src%2Fapp%2Fapp.component.ts)

## 第一个本地实例

实际项目开发中，你会需要对 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们强烈建议使用官方的 `@angular/cli` 工具链辅助进行开发，下面我们用一个简单的实例来说明。

### 1. 安装脚手架工具

> 使用 `@angular/cli` 前，务必确认 [Node.js](https://nodejs.org/en/) 已经升级到 v8.10 或以上，强烈建议升级至最新版本的 `@angular/cli`。
> 如果你想了解更多CLI工具链的功能和命令，建议访问 [Angular CLI](https://github.com/angular/angular-cli) 了解更多。

```bash
$ npm install -g @angular/cli
```


### 2. 创建一个项目

> 在创建项目之前，请确保 `@angular/cli` 已被成功安装。

执行以下命令，`@angular/cli` 会在当前目录下新建一个名称为 `PROJECT-NAME` 的文件夹，并自动安装好相应依赖。

```bash
$ ng new PROJECT-NAME
```

### 3. 初始化配置

进入项目文件夹，执行以下命令后将自动完成 `ng-zorro-antd` 的初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作。

```bash
$ ng add ng-zorro-antd
```

开发者可以通过增加参数来完成个性化的初始化配置，例如国际化或者自定义主题等，详细可以参考 [脚手架](/docs/schematics/zh) 部分。

### 4. 开发调试

一键启动调试，运行成功后显示欢迎页面。

```bash
$ ng serve --port 0 --open
```

<img style="display: block;padding: 30px 30%;height: 260px;" src="https://img.alicdn.com/tfs/TB1MGSRv21TBuNjy0FjXXajyXXa-89-131.svg">


### 5. 构建和部署

```bash
$ ng build --prod
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。

## 自行构建

如果想自己维护工作流，理论上你可以利用 Angular 生态圈中的 各种脚手架进行开发，如果遇到问题可参考我们所使用的 [配置](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/integration) 进行定制。

### 1. 安装组件

```bash
$ npm install ng-zorro-antd --save
```

### 2.引入模块

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

/** 配置 angular i18n **/
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule
  ],
  bootstrap: [ AppComponent ],
  /** 配置 ng-zorro-antd 国际化 **/
  providers   : [ { provide: NZ_I18N, useValue: zh_CN } ]
})
export class AppModule { }

```
这样就成功在全局引入了 `ng-zorro-antd`。

### 3. 引入样式

在全局样式中引入 `node_modules/ng-zorro-antd/ng-zorro-antd.min.css` 文件。如果需要自定义主题样式，请参考[自定义主题](/docs/customize-theme/zh)部分。

## 配置主题和字体

* [自定义主题](/docs/customize-theme/zh)
* [使用本地字体](/docs/customize-theme/zh)
