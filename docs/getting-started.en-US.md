---
order: 1
title: Getting Started
---

Ant Design of Angular is dedicated to providing a **good development experience** for programmers.

> The prerequisite of Ant Design Angular is a solid background knowledge of [Angular](https://angular.io/) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/).

## Playground

The following StackBlitz link demonstrates a basic use case, and it is recommended to fork this demo as a baseline while doing `Bug Report`. However, please do not use this demo as a scaffold on real production environment.

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-ivy)

## First Local Development

During development, there are several engineering requirements including compiling, debugging, proxying and packaging codes in TypeScript. We strongly encourage you to develop your project with the help of Angular official CLI `@angular/cli`. To be concise, a simple example is demonstrating below.

### Installation

> Read the documentation of [Angular](https://angular.io/cli) to explore more features.

```bash
$ npm install -g @angular/cli
```

### Create a New Project

The following command allows `@angular/cli` to create a folder called `PROJECT-NAME` under the current directory, with necessary dependencies.

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` will run `npm install` after a project is created. If it fails, you can run `npm install` by yourself.

### Install ng-zorro-antd

After changing directory to the newly created project, you can run the following commands to initialize project's configuration automatically, including importing i18n files and stylesheets, and loading initial modules.

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd
```

<img style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

`ng-zorro-antd` supports initializing configuration with schematics, more information is available in the [schematics](/docs/schematics/en) section.

### Development & Debugging

Your project is now ready to run. After running the following command, a welcome page will be displayed in your browser.

```bash
$ ng serve --port 0 --open
```

<img style="display: block;padding: 30px 30%;height: 260px;" src="https://img.alicdn.com/tfs/TB1X.qJJgHqK1RjSZFgXXa7JXXa-89-131.svg">

### Building & Deployment

```bash
$ ng build --prod
```

Project files are built and generated in the `dist` directory by default.

## Customized Build

You may use any existing scaffold tools in the Angular ecosystem in order to customize the building process. When you encounter problems, please refer to [configure](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/integration) section.

### Install ng-zorro-antd

```bash
$ npm install ng-zorro-antd --save
```

### Import Styles

#### Use all component styles

This configuration contains all the styles of our components' library.
If you want to use only certain components' styles, please refer to [Use only certain component styles](/docs/getting-started/en#use-only-certain-component-styles) section.

Import the pre-built stylesheet in `angular.json`

```json
{
  "styles": [
    "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
  ]
}
```

Import the pre-built stylesheet in `style.css`

```css
@import "~ng-zorro-antd/ng-zorro-antd.min.css";
```

Import the less stylesheet in `style.less`

```less
@import "~ng-zorro-antd/ng-zorro-antd.less";
```

#### Use only certain component styles

> Please note that importing CSS files of several components may result in code redundancy due to the dependency relationships among some components' styles.

It is necessary to import base styles (common to all components) before using certain components' styles.

Import the pre-build styles in `style.css`

```css
@import "~ng-zorro-antd/style/index.min.css"; /* Import base styles */
@import "~ng-zorro-antd/button/style/index.min.css";  /* Import one component's styles */
```

Import the less styles in `style.less`

```less
@import "~ng-zorro-antd/style/entry.less"; /* Import base styles */
@import "~ng-zorro-antd/button/style/entry.less";  /* Import one component's styles */
```

#### Import component module

Finally, you need to import the component modules that you want to use into the `app.module.ts` file and [feature modules](https://angular.io/guide/feature-modules).

Taking the following `NzButtonModule` module as an example, first import the component module:

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

Then use the component inside the template:

```html
<button nz-button nzType="primary">Primary</button>
```

## Other

- [I18n](/docs/i18n/en)
- [Customize Theme](/docs/customize-theme/en)
- [Use Icons](/components/icon/en)
