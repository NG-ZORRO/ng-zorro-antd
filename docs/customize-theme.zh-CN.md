---
order: 5
title: 定制主题
---

Ant Design 设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## 样式变量

Ant Design 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，[默认样式变量](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/style/themes/default.less)

> Ant Design React 的主题定制文件在 `ng-zorro-antd` 中同样可以使用。

## 定制方式

用 less 文件进行变量覆盖。

建立一个单独的 `less` 文件如下，再在 `.angular-cli.json` 文件的 `styles` 列表加入该文件

```css
@import "~ng-zorro-antd/src/ng-zorro-antd.less";   // 引入官方提供的 less 样式入口文件
@import "your-theme-file.less";   // 用于覆盖上面定义的变量
```

自定义 less 变量的文件可以参考 [这里](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/site_scripts/_site/src/theme.less)。

## 本地部署字体

通过修改 `@icon-url` 变量， 可以将字体部署到本地，最新的 iconfont 可以在 [这里](https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip) 下载。