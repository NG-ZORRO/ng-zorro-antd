---
order: 1
title: Getting Started
---

Ant Design of Angular is dedicated to providing a **good development experience** for programmers.

> The prerequisite of Ant Design Angular is a solid background knowledge of [Angular](https://angular.dev) and [JavaScript ES2015](http://babeljs.io/docs/learn-es2015/).

## Playground

The following StackBlitz link demonstrates a basic use case, and it is recommended to fork this demo as a baseline while doing `Bug Report`. However, please do not use this demo as a scaffold in a real production environment.

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-ivy)

## First Local Development

There are several engineering requirements during development, including compiling, debugging, proxying, and packaging codes in TypeScript. We strongly encourage you to develop your project with the help of Angular official CLI `@angular/cli`. To be concise, a simple example is demonstrated below.

### Installation

> Read the documentation of [Angular](https://angular.dev/cli) to explore more features.

```bash
$ npm install -g @angular/cli
# Or if you use yarn
$ yarn global add @angular/cli
```

### Create a New Project

The following command allows `@angular/cli` to create a folder called `PROJECT-NAME` under the current directory, with necessary dependencies.

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` will run `npm install` or `yarn` after a project is created. You can run `npm install` or `yarn` by yourself if it fails.

### Install ng-zorro-antd

After changing the directory to the newly created project, you can automatically run the following commands to initialize the project's configuration, including importing i18n files and stylesheets and loading initial modules.

```bash
$ cd PROJECT-NAME
$ ng add ng-zorro-antd
```

<img alt="CLI" style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

`ng-zorro-antd` supports initializing configuration with schematics, more information is available in the [schematics](/docs/schematics/en) section.

### Development & Debugging

Your project is now ready to run. After running the following command, a welcome page will be displayed in your browser.

```bash
$ ng serve --port 0 --open
```

<img alt="welcome" style="display: block;padding: 30px 30%;height: 260px;" src="https://img.alicdn.com/tfs/TB1X.qJJgHqK1RjSZFgXXa7JXXa-89-131.svg">

### Building & Deployment

```bash
$ ng build --prod
```

Project files are built and generated in the `dist` directory by default.

## Customized Build

You may use any existing scaffold tools in the Angular ecosystem in order to customize the building process. Please refer to [configure](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/integration) section if you encounter any issues.

### Install ng-zorro-antd

```bash
$ npm install ng-zorro-antd --save
# Or if you use yarn
$ yarn add ng-zorro-antd
```

### Import Styles

#### Use all component styles

This configuration contains all the styles of our components' library.
If you want to use only certain components' styles, please refer to [Use only certain component styles](/docs/getting-started/en#use-only-certain-component-styles) section.

Import the pre-built stylesheet in `angular.json`

```json
{
  "styles": ["node_modules/ng-zorro-antd/ng-zorro-antd.min.css"]
}
```

Import the pre-built stylesheet in `style.css`

```css
@import '~ng-zorro-antd/ng-zorro-antd.min.css';
```

Import the less stylesheet in `style.less`

```less
@import '~ng-zorro-antd/ng-zorro-antd.less';
```

#### Use only certain component styles

> Please note that importing CSS files of several components may result in code redundancy due to the dependency relationships among some components' styles.

It is necessary to import base styles (common to all components) before using certain components' styles.

Import the pre-build styles in `style.css`

```css
@import '~ng-zorro-antd/style/index.min.css'; /* Import base styles */
@import '~ng-zorro-antd/button/style/index.min.css'; /* Import one component's styles */
```

Import the less styles in `style.less`

```less
@import '~ng-zorro-antd/style/entry.less'; /* Import base styles */
@import '~ng-zorro-antd/button/style/entry.less'; /* Import one component's styles */
```

#### Import component module

Finally, you need to import the component modules that you want to use into your components.

Taking the following `NzButtonModule` module as an example, first import the component module:

```ts
import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  imports: [NzButtonModule]
})
export class AppComponent {}
```

Then use the component inside the template:

```html
<button nz-button nzType="primary">Primary</button>
```

# Precautions

- `ng-zorro-antd` already contains `@angular/cdk/overlay-prebuilt.css` overlay style, no additional import is required.

## Other

- [I18n](/docs/i18n/en)
- [Customize Theme](/docs/customize-theme/en)
- [Use Icons](/components/icon/en)
