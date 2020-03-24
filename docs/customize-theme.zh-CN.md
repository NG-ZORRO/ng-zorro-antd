---
order: 6
title: 定制主题
---

Ant Design 设计规范上支持一定程度的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于主色、圆角、边框和部分组件的视觉定制。

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## 定制方式
Ant Design 的样式使用了 [Less](http://lesscss.org/) 作为开发语言，并定义了一系列全局/组件的样式变量，你可以根据需求进行相应调整，[默认样式变量](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/style/themes/default.less)

> Ant Design React 的主题定制文件在 `ng-zorro-antd` 中同样可以使用。

### 初始化项目时定制主题

在初始化项目时 `ng add ng-zorro-antd` 时选择自定义主题即可自动配置好自定义主题的相关文件，修改 `src/theme.less` 文件内容就可以自定义主题。

### 手动修改

在 `src` 目录下建立一个单独的 `theme.less` 文件，在 `angular.json` 文件的 `styles` 列表加入该文件


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

### 在 webpack 中定制主题

Angular CLI 提供了 [custom-webpack](https://www.npmjs.com/package/@angular-builders/custom-webpack) 的 builder，可以通过该 builder 轻松的调整 webpack 中 [less-loader](https://github.com/webpack-contrib/less-loader) 的配置来进行主题配置。

1. 在 `angular.json` 中引入 `ng-zorro-antd.less` 文件

```json
{
  "styles": [
    "node_modules/ng-zorro-antd/ng-zorro-antd.less"
  ]
}
```

2. 安装 `@angular-builders/custom-webpack` builder

```bash
npm i -D @angular-builders/custom-webpack
```

3. 新建 webpack 配置文件 `extra-webpack.config.js`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test   : /\.less$/,
        loader: 'less-loader',
        options: {
          modifyVars: { // 修改主题变量
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px'
          },
          javascriptEnabled: true
        }
      }
    ]
  }
};

```

4. 在 `angular.json` 中配置自定义 builder

```diff
  "architect": {
    "build": {
-     "builder": "@angular-devkit/build-angular:browser",
+     "builder": "@angular-builders/custom-webpack:browser",
      "options": {
+        "customWebpackConfig": {
+          "path": "./extra-webpack.config.js",
+          "mergeStrategies": {
+            "module.rules": "append"
+          },
+          "replaceDuplicatePlugins": true
+        }
        ...
      },
      ...
    },
    "serve": {
-      "builder": "@angular-devkit/build-angular:dev-server",
+      "builder": "@angular-builders/custom-webpack:dev-server",
       ...
    }
    ...
  }
```
更多在 Angular CLI 中定制 webpack 的文章可以参考

* [Angular Builder Document](https://www.npmjs.com/package/@angular-builders/custom-webpack)
* [Angular CLI: Custom webpack Config](https://alligator.io/angular/custom-webpack-config/)
* [Customize Webpack Configuration in Your Angular Application](https://netbasal.com/customize-webpack-configuration-in-your-angular-application-d09683f6bd22)

全部可被自定义 less 变量可以参考 [这里](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less)。

## 使用暗色主题

### 方式一

是在样式文件引入 `ng-zorro-antd/style/dark.less` 覆盖主题变量。

```less
/* ng-zorro-antd 全量样式或者单组件样式 */
@import "~ng-zorro-antd/style/dark.less";
```

### 方式二

如果项目不使用 Less，可在 CSS 文件或者 `angular.json` 的 `styles` 字段中，全量引入 `ng-zorro-antd.dark.css`。

样式文件中：

```css
@import "~ng-zorro-antd/ng-zorro-antd.dark.min.css";
```

angular.json 中

```json
{
  "build": {
    "options": {
      "styles": [
        "node_modules/ng-zorro-antd/ng-zorro-antd.dark.min.css"
      ]
    }
  }
}
```

### 方式三

在 webpack中 使用 less-loader 按需引入


```javascript
const darkThemeVars = require('ng-zorro-antd/dark-theme');
module.exports = {
  module: {
    rules: [
      {
        test   : /\.less$/,
        loader: 'less-loader',
        options: {
          modifyVars: {
          'hack': `true;@import "${require.resolve('ng-zorro-antd/style/color/colorPalette.less')}";`,
            ...darkThemeVars
          },
          javascriptEnabled: true
        }
      }
    ]
  }
};

```

## 主题切换

当使用 AngularCLI 的方式配置主题时必须为每个主题单独打包，当你想切换主题而不重新加载应用时（就像这个网站），你可以使用下面的方法将主题编译到单独的样式文件，并在运行时切换：

注意：确保与主题变量相关的样式存在全局样式中，而不是组件样式中，因为组件样式优先级更高将会导致样式无法被覆盖。

1. 安装依赖

```bash
npm i less -D less-plugin-clean-css -D
```

2. 编写脚本

以黑暗主题为例，使用 `less` 编译应用的样式入口文件，并且在 `modifyVars` 参数中替换样式变量，并输出到目标位置。

```js
const less = require('less');
const LessPluginCleanCSS = require('less-plugin-clean-css');
const fs = require('fs');
const darkThemeVars = require('ng-zorro-antd/dark-theme');

const appStyles = 'path/src/styles.less' // 应用的样式入口文件
const themeContent = `@import '${appStyles}'`

less.render(themeContent, {
  javascriptEnabled: true,
  plugins: [new LessPluginCleanCSS({ advanced: true })],
  modifyVars: {
    ...darkThemeVars
  }
}).then(data => {
  fs.writeFileSync(
    // 主题样式的输出文件
    'path/assets/themes/style.dark.css',
    data.css
  )
});
```

3. 运行时切换样式

动态创建 `link` 标签，将样式文件动态加载在应用中，反之移除。

```ts
changeTheme(theme: 'default' | 'dark'): void {
  if (theme === 'dark') {
    const style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'dark-theme';
    style.href = 'assets/themes/style.dark.css';
  } else {
    const dom = document.getElementById('dark-theme');
    if (dom) {
      dom.remove();
    }
  }
}
```

