---
order: 2
title: Schematics
---

Using a CLI helps initialize projects, generate template codes and reduce development time.

> The`ng-zorro-antd` scaffolding is essentially based on [schematics](https://blog.angular.dev/schematics-an-introduction-dc1dfbc2a2b2).

## Initialize A Project

Initialize a project with `ng-zorro-antd`.

Run the command `ng add ng-zorro-antd` under your project directory, and follow the options to configure settings including whether you want to import i18n files and stylesheets, and load initial modules.

<img alt="NG-ZORRO CLI" style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

In the meantime, you can choose an existing project template while creating your project, and then develop the project on the basis of it.

<img alt aria-hidden="true" style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2); max-width: 680px;" src="https://img.alicdn.com/tfs/TB1IC0TeEWF3KVjSZPhXXXclXXa-2000-1078.png">

### Command

```bash
ng add ng-zorro-antd [options]
```

## Component Generation

There are template source codes under every component API show case, you may obtain these codes by expanding `Show Code`.

### Command

```bash
ng g ng-zorro-antd:[schematic] <name> [options]
```

For example, you can generate a login form with the follow command.

```bash
ng g ng-zorro-antd:form-normal-login login
```
