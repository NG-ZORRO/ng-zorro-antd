快速上手
===
NG ZORRO 致力于提供给 Angular 开发者**愉悦**的开发体验。

---
> 官方指南假设你已经拥有已有 HTML、CSS 和 JavaScript 中级前端知识并且对 Angular 框架足够了解。如果你刚开始学习前端或者 Angular，将组件作为第一步可能并不是一个好主意，推荐先学习 <a href="http://www.angular.cn" target="_blank"> Angular </a> 和 <a href="https://www.typescriptlang.org/" target="_blank"> TypeScript</a>。


## 标准开发

实际项目开发中，你会需要对 TypeScript 代码的构建、调试、代理、打包部署等一系列工程化的需求。
我们强烈建议使用官方的`@angular/cli`工具链辅助进行开发，下面我们用一个简单的实例来说明。

### 1. 安装脚手架工具

> 使用 `@angular/cli` 前，务必确认 [Node.js](https://nodejs.org/en/) 已经升级到 v6.9 或以上，强烈建议升级至最新版本的 `@angular/cli`。

```bash
$ npm install -g @angular/cli@latest
```

更多功能请参考 [脚手架工具](https://github.com/angular/angular-cli) 和 [CLI Wiki](https://github.com/angular/angular-cli/wiki)。

### 2. 创建一个项目

在创建项目之前，请确保 `@angular/cli` 已被成功安装
```bash
$ ng new PROJECT-NAME
```

`@angular/cli` 会自动生成一个名称为 `PROJECT-NAME` 的文件夹，并自动安装好相应依赖

### 3. 使用组件

现在项目下安装 ng-zorro-antd
```bash
$ cd PROJECT_NAME
$ npm install ng-zorro-antd --save
```

直接用下面的代码替换 `/src/app/app.module.ts` 的内容

> **注意**：在根 module 中需要使用 `NgZorroAntdModule.forRoot()`，在子 module 需要使用 `NgZorroAntdModule` 

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

```
这样就成功在全局引入了 ng-zorro-antd。

> `NgZorroAntdModule.forRoot()` 方法能够接受一个可选的配置对象，用于引入外部的字体文件，类型为 `{ extraFontName: string, extraFontUrl: string }`。

用下面的代码替换 `/src/app/app.component.html`

```html
<button nz-button [nzType]="'primary'">测试按钮</button>
```
[查看](#/components/button)最简单的Button效果


### 4. 开发调试

一键启动调试

```bash
$ ng serve --port 0 --open
```

如果需要实时调试AoT效果，请使用以下命令启动

```bash
$ ng serve --port 0 --open --aot
```

### 5. 构建和部署

```bash
$ ng build --prod
```

入口文件会构建到 `dist` 目录中，你可以自由部署到不同环境中进行引用。



## 了解更多

如果你想了解更多CLI工具链的功能和命令，建议访问 [Angular CLI](https://github.com/angular/angular-cli) 了解更多
