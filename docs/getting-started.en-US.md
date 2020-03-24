---
order: 1
title: Getting Started
---

Ant Design of Angular is dedicated to providing a **good development experience** for programmers.

> Before delving into Ant Design Angular, a good knowledge of [Angular](https://angular.io/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/) is needed.

## Playground

The following StackBlitz demo is the simplest use case, and it's also a good habit to fork this demo to provide a reproducible demo while reporting a bug. Please don't use this demo as a scaffold in production.

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-ivy)

## First Local Development

During development, you may need to compile and debug TypeScript code, and even proxy some of the requests to mock data or other external services. All of these can be done with quick feedback provided through hot reloading of changes.

Such features, together with packaging the production version, are covered in this work flow.

### Installation

We strongly recommended to develop Angular with `@angular/cli`, you can install it with the following commands.
> Read [the documentation of `Angular`](https://angular.io/cli) to explore more features.

```bash
$ npm install -g @angular/cli
```

### Create a New Project

A new project can be created using Angular CLI tools.

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` will run `npm install` after a project is created. If it fails, you can run `npm install` by yourself.

### Install ng-zorro-antd

`ng-zorro-antd` support init configuration with schematics, you can get more info in the [schematics](/docs/schematics/en) part.

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd
```

<img style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

### Development & Debugging

Run your project now, you can see the img below now.

```bash
$ ng serve --port 0 --open
```

<img style="display: block;padding: 30px 30%;height: 260px;" src="https://img.alicdn.com/tfs/TB1X.qJJgHqK1RjSZFgXXa7JXXa-89-131.svg">

### Building & Deployment

```bash
$ ng build --prod
```

Entry files will be built and generated in `dist` directory, where we can deploy it to different environments.

## Customized Work Flow

If you want to customize your work flow, you can use any scaffold available in the Angular ecosystem. If you encounter problems, you can use our [config](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/integration) and modify it.

### Install ng-zorro-antd

```bash
$ npm install ng-zorro-antd --save
```

### Import Styles

#### Use all component styles

This configuration will include all the styles of the component library.
If you want to use only certain components, please see [Use Only Certain Component Style](/docs/getting-started/en#use-only-certain-component-style) configuration.

Import the pre-build styles in `angular.json`

```json
{
  "styles": [
    "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
  ]
}
```

Import the pre-build styles in `style.css`

```css
@import "~ng-zorro-antd/ng-zorro-antd.min.css";
```

Import the less styles in `style.less`

```less
@import "~ng-zorro-antd/ng-zorro-antd.less";
```

#### Use Only Certain Component Style

> Importing CSS files of several components may result in code redundancy because style files of components have dependency relationships like TypeScript files.

Need import the styles of a base(styles common to all components) before using certain components.

Import the pre-build styles in `style.css`

```css
@import "~ng-zorro-antd/style/index.min.css"; /* Import basic styles */
@import "~ng-zorro-antd/button/style/index.min.css";  /* Import styles of the component */
```

Import the less styles in `style.less`

```less
@import "~ng-zorro-antd/style/entry.less"; /* Import basic styles */
@import "~ng-zorro-antd/button/style/entry.less";  /* Import styles of the component */
```

#### Import Component Module

Finally, you need to import the component modules you want to use into your `app.module.ts` file and [feature modules](https://angular.io/guide/feature-modules).

Take the following Button Module module as an example, first introduce the component module:

```ts
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NzButtonModule
  ]
})
export class AppModule { }
```

Then use in the template:

```html
<button nz-button nzType="primary">Primary</button>
```

## Other

- [I18n](/docs/i18n/en)
- [Customize Theme](/docs/customize-theme/en)
- [Use Icons](/components/icon/en)
