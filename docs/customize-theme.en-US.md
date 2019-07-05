---
order: 6
title: Customize Theme
---

Ant Design allows you to customize some basic design aspects in order to meet the needs of UI diversity from business and brand, including primary color, border radius, border color, etc.

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Less variables

We are using [Less](http://lesscss.org/) as the development language for styling. A set of less variables are defined for each design aspect that can be customized to your needs.

> You can use the theme define file of react version in ng-zorro-antd too.

### Customize theme with schematics

Run `ng add ng-zorro-antd`, set up custom theme file, then modified the file `src/theme.less`.

### Without schematics

Create a standalone less file named `theme.less` in `src` folder, and add the path of it to the list of `styles` in `angular.json` file.

```json
...
  "styles": [
    ...
    "src/theme.less"
    ...
  ]
...
```

Here is an example of `theme.less`
> The base color is changed to `#f5222d` in the example below.

```css
// -------- import official less file -----------
@import "../node_modules/ng-zorro-antd/ng-zorro-antd.less";

// -------- override less var -----------
@primary-color          : #f5222d;
```


### Customize in webpack

Angular CLI provide [custom-webpack-builder](https://www.npmjs.com/package/@angular-builders/custom-webpack), you can modify the less variable via adjust the [less-loader](https://github.com/webpack-contrib/less-loader) options in webpack.

1. Import `ng-zorro-antd.less` in `angular.json`

```json
{
  "styles": [
    "node_modules/ng-zorro-antd/ng-zorro-antd.less"
  ]
}
```

2. Install `@angular-builders/custom-webpack` builder

```bash
npm i -D @angular-builders/custom-webpack
```

3. create `extra-webpack.config.js`

```javascript
module.exports = {
  module: {
    rules: [
      {
        test   : /\.less$/,
        loader: 'less-loader',
        options: {
          modifyVars: { // modify theme variable
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

4. Customize builder in `angular.json`

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
You can get more information about custom-webpack builder following the articles

* [Angular Builder Document](https://www.npmjs.com/package/@angular-builders/custom-webpack)
* [Angular CLI: Custom webpack Config](https://alligator.io/angular/custom-webpack-config/)
* [Customize Webpack Configuration in Your Angular Application](https://netbasal.com/customize-webpack-configuration-in-your-angular-application-d09683f6bd22)

All less vars can be checked [here](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/doc/theme.less) is a sample of theme define file.
