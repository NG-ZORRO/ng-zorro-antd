---
order: 1
title: Getting Started
---

Ant Design Angular is dedicated to providing a **good development experience** for programmers. Make sure that you had installed [Node.js](https://nodejs.org/)(> v6.9) correctly.

---

Before delving into Ant Design Angular, a good knowledge of [Angular](https://angular.io/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

## First Example

The following StackBlitz demo is the simplest use case, and it's also a good habit to fork this demo to provide a re-producible demo while reporting a bug. Please don't use this demo as a scaffold in production.

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts)

## Standard Development Flow

During development, you may need to compile and debug TypeScript code, and even proxy some of the requests to mock data or other external services. All of these can be done with quick feedback provided through hot reloading of changes.

Such features, together with packaging the production version, are covered in this work flow.

### 1. Installation

We strongly recommended to develop Angular with `@angular/cli`, you can install it with the following commands.

```bash
$ npm install -g @angular/cli@latest
```

Read [the documentation of `Angular CLI`](https://github.com/angular/angular-cli/wiki) to explore more features.


### 2. Create a New Project

A new project can be created using Angular CLI tools.

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` will run `npm install` after a project is created. If it fails, you can run `npm install` by yourself.

### 3. Install ng-zorro-antd

```bash
$ cd PROJECT-NAME
$ npm install ng-zorro-antd --save
```

### 4. Import module

Use the following codes to replace the code in `src/app/app.module.ts`.

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

> Note: You should only import `NgZorroAntdModule.forRoot()` in root module, and import `NgZorroAntdModule` in submodule.


### 5. Add Styles

Add `ng-zorro-antd.less` to the list of `styles` in `.angular-cli.json`.


```json
...
  "styles": [
    "../node_modules/ng-zorro-antd/src/ng-zorro-antd.less"
  ]
...
```

### 6. The first component

Use the following codes to replace the file of `/src/app/app.component.html`

```html
<button nz-button nzType="primary">Button</button>
```


> All the components in antd are listed in the sidebar.

### 7. Development & Debugging

Run your project now

```bash
$ ng serve --port 0 --open
```

Now you can see the button with ant design style in your browser.

### 8. Building & Deployment

```bash
$ ng build --prod
```

Entry files will be built and generated in `dist` directory, where we can deploy it to different environments.


## Read More

Read [the documentation of `Angular CLI`](https://github.com/angular/angular-cli/wiki) to explore more features.
