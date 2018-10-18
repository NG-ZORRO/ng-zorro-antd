---
order: 5
title: Customize Theme
---

Ant Design allows you to customize some basic design aspects in order to meet the needs of UI diversity from business and brand, including primary color, border radius, border color, etc.

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Less variables

We are using [Less](http://lesscss.org/) as the development language for styling. A set of less variables are defined for each design aspect that can be customized to your needs.

> You can use the theme define file of react version in ng-zorro-antd too.

### Customize theme with schematics

Run `ng add ng-zorro-antd --theme`，then modified the file `src/theme.less`.

> Note: `ng add ng-zorro-antd --theme` will [downgrade](https://github.com/angular/angular-cli/issues/10430) the version of `less` to `2.7`.

### Without schematics

Create a standalone less file named `theme.less` in `src` folder, and add the path of it to the list of `styles` in `angular.json` file.

> Note: You have to [downgrade](https://github.com/angular/angular-cli/issues/10430) the version of `less` to `2.7`.

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


All less vars can be checked [here](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/scripts/site/_site/src/theme.less) is a sample of theme define file.
