---
order: 2
title: 脚手架
---
使用脚手架可以更加方便的初始化项目，生成模板代码，节省开发时间。
> 脚手架部分完全基于 [Schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2) 部分进行开发。

## 项目初始化

自动完成 `ng-zorro-antd` 的初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作。

### 初始化命令

```bash
ng add ng-zorro-antd [options]
```

### 初始化参数

***--theme***

`ng-zorro-antd` 会[自动](https://github.com/angular/angular-cli/issues/10430)降级 `less` 版本至 `2.7` 并在 `src` 目录下生成 `theme.less` 的主题配置文件

详细的配置可以在[自定义主题](/docs/customize-theme/zh)中查看。

***--i18n***

初始化配置时增加 `--i18n=[语言]` 参数，`ng-zorro-antd` 会自动引入支持的语言包以及 Angular 对应的 [i18n 文件](https://angular.io/guide/i18n)

默认的国际化配置为中文(zh_CN)，详细的可配置选项可以在[国际化](/docs/i18n/zh)中查看。

## 生成组件

快速生成模板代码，每个官网的代码演示都附有可生成的模板，开发者可以通过展开每个组件的代码演示部分获取其生成代码。

### 生成组件命令

```bash
ng g ng-zorro-antd:[template] --name=NAME [options]
```

例如通过以下代码可以快速生成一个登陆框组件

```bash
ng g ng-zorro-antd:form-normal-login -p app --styleext=less --name=login
```

### 生成组件参数

***--name***

组件名称(必选)

***--styleext***

样式文件扩展名（默认 css）

***--prefix***, ***-p***

组件选择器前缀

***--inlineStyle***, ***-s***

使用行内样式

***--inlineTemplate***, ***-t***

使用行内模版

***--path***

指定组件创建目录（相当于执行时所在的目录）

***--spec***

是否生成 `.spec` 测试文件

***--skipImport***

是否跳过模块引入（及导入所属模块）

***--selector***

选择器名称（默认根据 `name` 自动生成）

***--export***

是否将组件声明在模块的 `exports`


***--module***, ***-m***

指定要声明的模块名

