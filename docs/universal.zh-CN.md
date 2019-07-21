---
order: 5
title: 服务端渲染
---

<blockquote style="border-color: #faad14;">
<p><strong>本指南假设你已了解关于 <a href="https://angular.cn/guide/universal" target="_blank">Angular Universal：服务端渲染</a> 的相关知识。</strong></p>
<p>你也可以使用 <a href="https://angular.cn/guide/universal" target="_blank">NG-ZORRO/ng-zorro-universal-starter</a> 开始你的项目。</p>
</blockquote>

本指南 Web 服务器是基于常见的 [Express](https://expressjs.com/) 框架。

## 安装依赖

```bash
$ ng add @nguniversal/express-engine --clientProject <project-name>
```

## 修改服务端根模块

**app.server.module.ts**

```ts
import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';

// 引入必要的模块
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { en_US, NZ_I18N, NzI18nModule } from 'ng-zorro-antd/i18n';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    HttpClientModule,
    NoopAnimationsModule,
    NzI18nModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ]
})
export class AppServerModule {}

```

## 修改服务器环境

**server.ts**

```ts
import 'zone.js/dist/zone-node';
import {enableProdMode} from '@angular/core';
// Express Engine
import {ngExpressEngine} from '@nguniversal/express-engine';
// Import module map for lazy loading
import {provideModuleMap} from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import {join} from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// 修复 `Event is not defined` 的错误 https://github.com/angular/universal/issues/844
global['Event'] = null;

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist/browser');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModuleNgFactory, LAZY_MODULE_MAP} = require('./dist/server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', DIST_FOLDER);

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });
// Serve static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

```

## 编译运行

```bash
$ npm run build:ssr && npm run serve:ssr # 运行在 http://localhost:4000/
```