---
order: 1
title: Getting Started
---

Ant Design of Angular is dedicated to providing a **good development experience** for programmers.

> Before delving into Ant Design Angular, a good knowledge of [Angular](https://angular.io/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

## Playground

The following StackBlitz demo is the simplest use case, and it's also a good habit to fork this demo to provide a re-producible demo while reporting a bug. Please don't use this demo as a scaffold in production.

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-start?file=src%2Fapp%2Fapp.component.ts)

## First Local Development

During development, you may need to compile and debug TypeScript code, and even proxy some of the requests to mock data or other external services. All of these can be done with quick feedback provided through hot reloading of changes.

Such features, together with packaging the production version, are covered in this work flow.

### 1. Installation

We strongly recommended to develop Angular with `@angular/cli`, you can install it with the following commands.
> Read [the documentation of `Angular CLI`](https://github.com/angular/angular-cli/wiki) to explore more features.

```bash
$ npm install -g @angular/cli
```

### 2. Create a New Project

A new project can be created using Angular CLI tools.

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` will run `npm install` after a project is created. If it fails, you can run `npm install` by yourself.

### 3. Install ng-zorro-antd

`ng-zorro-antd` support init configuration with schematics, you can get more info in the [schematics](/docs/schematics/en) part.

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd --i18n=en_US
```

### 4. Development & Debugging

Run your project now, you can see the img below now.

```bash
$ ng serve --port 0 --open
```

<img style="display: block;padding: 30px 30%;height: 260px;" src="https://img.alicdn.com/tfs/TB1MGSRv21TBuNjy0FjXXajyXXa-89-131.svg">

### 5. Building & Deployment

```bash
$ ng build --prod
```

Entry files will be built and generated in `dist` directory, where we can deploy it to different environments.

## Customized Work Flow

If you want to customize your work flow, you can use any scaffold available in the Angular ecosystem. If you encounter problems, you can use our [config](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/integration) and modify it.

### 1. Install ng-zorro-antd

```bash
$ npm install ng-zorro-antd --save
```

### 2. Import module

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { AppComponent } from './app.component';

/** config angular i18n **/
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    /** import ng-zorro-antd root module，you should import NgZorroAntdModule instead in sub module **/
    NgZorroAntdModule
  ],
  bootstrap: [ AppComponent ],
  /** config ng-zorro-antd i18n **/
  providers   : [ { provide: NZ_I18N, useValue: en_US } ]
})
export class AppModule { }
```

### 5. Add Styles and SVG Assets

And import style and SVG icon assets file link in `angular.json`.

You can get more info about how to customize styles at [customize theme](/docs/customize-theme/en) part.

```json
{
  "assets": [
    ...
    {
      "glob": "**/*",
      "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
      "output": "/assets/"
    }
  ],
  "styles": [
    ...
    "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
  ]
}
```

## Customization
* [Customize Theme](/docs/customize-theme/en)
* [Local Iconfont](/docs/customize-theme/en)
