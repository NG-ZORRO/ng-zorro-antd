---
order: 5
title: Customize Theme
---

Ant Design allows you to customize some basic design aspects in order to meet the needs of UI diversity from business and brand, including primary color, border radius, border color, etc.

![](https://zos.alipayobjects.com/rmsportal/zTFoszBtDODhXfLAazfSpYbSLSEeytoG.png)

## Less variables

We are using [Less](http://lesscss.org/) as the development language for styling. A set of less variables are defined for each design aspect that can be customized to your needs.

> You can use the theme define file of react version in ng-zorro-antd too.

## How to do it

Create a standalone less file like the one below, and add the path of it to the list of `styles` in `.angular-cli.json` file.

```css
@import "~antd/dist/antd.less";   // import official less entry file
@import "your-theme-file.less";   // override variables here
```

[Here](https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/site_scripts/_site/src/theme.less) is a sample of theme define file.


## Local deployment fonts

You can modify `@icon-url` to make a locally deployed version of the icon font, the newest iconfont file could be downloaded [here](https://github.com/ant-design/ant-design/releases/download/resource/iconfont-3.x.zip).