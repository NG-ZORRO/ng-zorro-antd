---
order: 1
title: 快速上手
---

NG-ZORRO 致力于提供给程序员**愉悦**的开发体验。

---

<blockquote style="border-color: red;"><p><strong>官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Angular 及配套设施的正确开发方式。如果你刚开始学习前端或者 Angular ，将框架作为你的第一步可能不是最好的主意 —— 掌握好基础知识再来吧！</strong></p></blockquote>

## 第一个例子

最简单的使用方式参照以下 StackBlitz 演示，也推荐 Fork 本例来进行 `Bug Report`，注意不要在实际项目中这样使用。

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts)

## 标准开发

实际项目开发中，你会需要对 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们强烈建议使用官方的`@angular/cli`工具链辅助进行开发，下面我们用一个简单的实例来说明。


### 1. 安装脚手架工具

> 使用 `@angular/cli` 前，务必确认 [Node.js](https://nodejs.org/en/) 已经升级到 v6.9 或以上，强烈建议升级至最新版本的 `@angular/cli`。

```bash
$ npm install -g @angular/cli@latest
```

更多功能请参考 [CLI 文档](https://github.com/angular/angular-cli/wiki)。

### 2. 创建一个项目

在创建项目之前，请确保 `@angular/cli` 已被成功安装

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` 会自动生成一个名称为 `PROJECT-NAME` 的文件夹，并自动安装好相应依赖

### 3. 安装组件

现在项目下安装 ng-zorro-antd

```bash
$ cd PROJECT_NAME
$ npm install ng-zorro-antd --save
```

### 4.引入模块

直接用下面的代码替换 `/src/app/app.module.ts` 的内容

> **注意**：在根 module 中需要使用 `NgZorroAntdModule.forRoot()`，在子 module 需要使用 `NgZorroAntdModule` 

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
这样就成功在全局引入了 `ng-zorro-antd`。

### 5. 引入样式

修改 `.angular-cli.json` 文件的 `styles` 列表
```json
...
  "styles": [
    "../node_modules/ng-zorro-antd/src/ng-zorro-antd.less"
  ]
...
```

### 6. 使用第一个组件

用下面的代码替换 `/src/app/app.component.html`

```html
<button nz-button nzType="primary">Button</button>
```

### 7. 开发调试

一键启动调试

```bash
$ ng serve --port 0 --open
```

此时就可以看到最简单的 [Button效果](https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts)

### 8. 构建和部署

```bash
$ ng build --prod
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。

## 了解更多

如果你想了解更多CLI工具链的功能和命令，建议访问 [Angular CLI](https://github.com/angular/angular-cli) 了解更多
