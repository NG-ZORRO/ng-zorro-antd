---
order: 5
title: テーマのカスタマイズ
---

Ant Designは、ビジネスやブランドによるUIの多様なニーズを満たす為、プライマリーカラーやボーダーの角や色などいくつかの基本的なデザインの外見をカスタマイズできるようになっています。

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Less変数

スタイルの開発言語には[Less](http://lesscss.org/)を使用しています。
また、グローバル変数及びコンポーネントの一連のスタイル変数が定義されており、あなたのニーズに合わせて[デフォルトスタイルの変数](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/style/themes/default.less)をカスタマイズできます。

> `Ant Design React` で定義されたテーマファイルも使用できます。

## 方法

変数をLessファイルで上書きします。

以下のようなLessファイルを作成し、 `.angular-cli.json` の　`styles` の配列にパスを追加します。

```css
@import "~ng-zorro-antd/src/ng-zorro-antd.less";   // 公式のLessファイルをインポートする
@import "your-theme-file.less";   // ここで変数を上書きする
```

テーマが定義されたファイルのサンプルは[こちら](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/site_scripts/_site/src/theme.less)です。

## ローカルのフォント

`@icon-url` を変更することでアイコンフォントをローカルに展開できます。
最新のアイコンフォントは[こちら](https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip)でダウンロードできます。
