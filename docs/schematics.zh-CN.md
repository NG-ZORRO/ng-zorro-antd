---
order: 2
title: 脚手架
---
使用脚手架可以更加方便的初始化项目，生成模板代码，节省开发时间。
> 脚手架部分完全基于 [Schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) 部分进行开发。

## 项目初始化

自动完成 `ng-zorro-antd` 的初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作。

### 命令

```bash
ng add ng-zorro-antd [options]
```

### 参数

***--theme***

`ng-zorro-antd` 会在 `src` 目录下生成 `theme.less` 的主题配置文件

详细的配置可以在[自定义主题](/docs/customize-theme/zh)中查看。

***--locale***

初始化配置时增加 `--locale=[语言]` 参数，`ng-zorro-antd` 会自动引入支持的语言包以及 Angular 对应的 [i18n 文件](https://angular.io/guide/i18n)

默认的国际化配置为中文(zh_CN)，详细的可配置选项可以在[国际化](/docs/i18n/zh)中查看。

***--animations***

启用 `BrowserAnimationsModule`

***--gestures***

安装 `hammerjs` 并引入为项目添加手势支持

## 生成组件

快速生成模板代码，每个官网的代码演示都附有可生成的模板，开发者可以通过展开每个组件的代码演示部分获取其生成代码。

### 命令

```bash
ng g ng-zorro-antd:[schematic] <name> [options]
```

例如通过以下代码可以快速生成一个登陆框组件

```bash
ng g ng-zorro-antd:form-normal-login login
```

### 参数

***--entry-component***

组件是否在模块的 `entryComponents` 声明

***--export***

组件是否在模块的 `exports` 声明

***--flat***

指定是否创建目录

***--inline-style (-s)***

指定是否使用行内样式

***--inline-template (-t)***

指定是否使用行内模版

***--module (-m)***

指定声明的模块

***--prefix (-p)***

组件选择器前缀

***--project***

指定声明到的项目名

***--selector***

组件的选择器名称

***--skip-import***

指定是否跳过模块引入

***--spec***

指定是否生成 `.spec` 测试文件

***--styleext***

指定样式文件扩展名
