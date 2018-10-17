---
order: 5
title: 定制主题
---

Ant Design 设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## 定制方式
Ant Design 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，[默认样式变量](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/style/themes/default.less)

> Ant Design React 的主题定制文件在 `ng-zorro-antd` 中同样可以使用。

### 初始化项目时定制主题

在初始化项目时 `ng add ng-zorro-antd --theme` 即可自动配置好自定义主题的相关文件，修改 `src/theme.less` 文件内容就可以自定义主题。

> 注意：使用 `ng add ng-zorro-antd --theme` 时会[自动](https://github.com/angular/angular-cli/issues/10430)降级 `less` 到 `2.7` 版本

### 手动修改

在 `src` 目录下建立一个单独的 `theme.less` 文件，在 `angular.json` 文件的 `styles` 列表加入该文件

> 注意：由于 `less` 在 `3.0` 以上版本默认禁用了 `javascriptEnabled`，需要手动降级 `less` 到 `2.7` 版本

```json
...
  "styles": [
    ...
    "src/theme.less"
    ...
  ]
...
```

`theme.less` 样例如下

> 在样例中通过修改 `@primary-color` 的数值将 `ng-zorro-antd` 的基础色修改为 `#f5222d`，开发者可以根据实际需求自由修改。

```css
// -------- 引入官方提供的 less 样式入口文件 -----------
@import "../node_modules/ng-zorro-antd/ng-zorro-antd.less";

// -------- 自定义参数覆盖 -----------
@primary-color          : #f5222d;
```

全部可被自定义 less 变量可以参考 [这里](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/src/theme.less)。
