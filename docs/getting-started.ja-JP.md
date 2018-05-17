---
order: 1
title: はじめに
---

Ant Design Angular はプログラマーにとって **良い開発体験** を提供することに専念しています。
[Node.js](https://nodejs.org/)(> v6.9)が正しくインストールされていることを確認してください。

---

Ant Design Angularに入る前に、[Angular](https://angular.io/)と[JavaScript ES2015](http://babeljs.io/docs/learn-es2015/)の十分な知識が必要です。

## 最初の例

次のStackBlitzのデモは、最も簡単な使用例です。
このデモをフォークし、バグレポートを作成することをお勧めします。
本番のプロジェクトでは、このデモは使用しないでください。

- [NG-ZORRO StackBlitz](https://stackblitz.com/edit/ng-zorro-antd-setup?file=app%2Fapp.component.ts)

## 基本的な開発の流れ

開発を支援するために、公式の `@angular/cli` を使うことを強くお勧めします。
ここでは簡単な例を用いて説明します。

### 1. インストール

`@angular/cli` は、次のコマンドでインストールできます。

```bash
$ npm install -g @angular/cli@latest
```

より多くの機能を知るには、[`Angular CLI` についての資料](https://github.com/angular/angular-cli/wiki)を読んでください。

### 2. 新しいプロジェクトの作成

新しいプロジェクトはAngular CLIツールを使用して作成されます。

```bash
$ ng new PROJECT-NAME
```

`@angular/cli` はプロジェクトが作成された後に `npm install` を実行します。
もし、これが失敗した場合は、あなたは自分で `npm install` を実行できます。

### 3. ng-zorro-antdのインストール

```bash
$ cd PROJECT-NAME
$ npm install ng-zorro-antd --save
```

### 4. モジュールのインポート

次のコードで `src/app/app.module.ts` のコードを書き換えてください。

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

> 注: ルートモジュールでは `NgZorroAntdModule.forRoot()` だけをインポートし、サブモジュールでは `NgZorroAntdModule` をインポートしてください。

### 5. スタイルの追加

`ng-zorro-antd.less` を `.angular-cli.json` の  `styles` の配列に追加してください。

```json
...
  "styles": [
    "../node_modules/ng-zorro-antd/src/ng-zorro-antd.less"
  ]
...
```

### 6. 最初のコンポーネント

次のコードで `/src/app/app.component.html` のコードを書き換えてください。

```html
<button nz-button nzType="primary">Button</button>
```

### 7. 開発とデバッグ

プロジェクトを実行してください。

```bash
$ ng serve --port 0 --open
```

いま、ブラウザでAnt Designのスタイルのボタンを見ることができます。

### 8. ビルドと開発

```bash
$ ng build --prod
```

エントリーファイルはビルドされ、別の環境に展開できる `dist` ディレクトリに生成されます。

## 続きを読む

[`Angular CLI` についての資料](https://github.com/angular/angular-cli/wiki)を読んでさらに多くの機能を調べてください。
