Quick start
===
NG Zorro is committed to providing developers of Angular ** pleasure ** development experience.

---
> The official guide assumes you already have intermediate knowledge of HTML, CSS, and JavaScript, and have a good understanding of the Angular framework. If you are new to learning front-end or Angular, it may not be a good idea to have the component as a first step, and it is recommended that you first learn about <a href="http://www.angular.cn" target="_blank"> Angular </ a > And <a href="https://www.typescriptlang.org/" target="_blank"> TypeScript </a>.


## standard development

In actual project development, you will need a series of engineering requirements for building, debugging, proxying, packaging and deployment of TypeScript code.
We strongly recommend using the official '@ angular / cli` toolchain to assist in the development, here we use a simple example to illustrate.

### 1. Install scaffolding tools

> Before using @ angular / cli, be sure to confirm that [Node.js] (https://nodejs.org/en/) has been upgraded to v6.9 or above. It is highly recommended to upgrade to the latest version of `@ angular / cli `.

```bash
$ npm install -g @ angular / cli @ latest
```

For more features, please refer to [Scaffolding Tools] (https://github.com/angular/angular-cli) and [CLI Wiki] (https://github.com/angular/angular-cli/wiki).

### 2. Create a project

Before creating a project, make sure that @ angular / cli is installed successfully
```bash
$ ng new PROJECT-NAME
```

`@angular / cli` will automatically generate a folder named` PROJECT-NAME` and automatically install the appropriate dependencies

### 3. Use components

Now install ng-zorro-antd under the project
```bash
$ cd PROJECT_NAME
$ npm install ng-zorro-antd --save
```

Replace the contents of `/ src / app / app.module.ts` directly with the code below

> ** Note **: `NgZorroAntdModule.forRoot ()` needs to be used in root module, `NgZorroAntdModule` needs to be used in sub module

```typescript
import {BrowserModule} from '@ angular / platform-browser';
import {BrowserAnimationsModule} from '@ angular / platform-browser / animations';
import {NgModule} from '@ angular / core';
import {FormsModule} from '@ angular / forms';
import {HttpClientModule} from '@ angular / common / http';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AppComponent} from './app.component';

@NgModule ({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot ()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

```
This successfully introduced ng-zorro-antd globally.

> The `NgZorroAntdModule.forRoot ()` method accepts an optional configuration object for importing external font files of type {extraFontName: string, extraFontUrl: string} `.

Replace `/ src / app / app.component.html` with the following code

```html
<button nz-button [nzType] = "'primary'"> Test Button </ button>
```
[View] (# / components / button) The simplest Button effect


### 4. Development and debugging

A key to start debugging

```bash
$ ng serve --port 0 --open
```

If you need to debug AoT effects in real time, use the following command to start

```bash
$ ng serve --port 0 --open --aot
```

### 5. Build and deploy

```bash
$ ng build --prod
```

The import files are built into the `dist` directory and you are free to deploy them to different environments for reference.



## understand more

If you want to learn more about the functions and commands of the CLI toolchain, we recommend that you visit [Angular CLI] (https://github.com/angular/angular-cli) to learn more
