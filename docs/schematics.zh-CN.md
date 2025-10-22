---
order: 2
title: 脚手架
---

使用脚手架可以更加方便的初始化项目，生成模板代码，节省开发时间。

> 脚手架部分完全基于 [Schematics](https://blog.angular.dev/schematics-an-introduction-dc1dfbc2a2b2) 部分进行开发。

## 项目初始化

在项目下运行命令 `ng add ng-zorro-antd` 跟随选项便可完成初始化配置，包括引入国际化文件，导入模块，引入样式文件等工作。

<img alt="NG-ZORRO CLI" style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

同时你可以通过选择预设的模板创建一个 Angular 项目，并在此基础上进行开发。

<img alt aria-hidden="true" style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2); max-width: 680px;" src="https://img.alicdn.com/tfs/TB1IC0TeEWF3KVjSZPhXXXclXXa-2000-1078.png">

## 生成组件

快速生成模板代码，每个官网的代码演示都附有可生成的模板，开发者可以通过展开每个组件的代码演示部分获取其生成代码。

### 命令

```bash
ng g ng-zorro-antd:[schematic] <name> [options]
```

例如通过以下代码可以快速生成一个登录框组件

```bash
ng g ng-zorro-antd:form-normal-login login
```
