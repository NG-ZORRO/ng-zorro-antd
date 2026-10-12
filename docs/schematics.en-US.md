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

Example generators are provided by the optional `@ng-zorro/schematics` package. Install the beta as a development dependency (`22.0.0-beta.0` requires `ng-zorro-antd ^22.1.0`):

```bash
npm install --save-dev @ng-zorro/schematics@beta
```

The component library does not download these example generators by default. You can uninstall this optional package when you no longer need them.

### Command

```bash
ng g @ng-zorro/schematics:[schematic] <name> [options]
```

For example, you can generate a login form with the follow command.

```bash
ng g @ng-zorro/schematics:form-normal-login login
```

### Migrating existing commands

Replace `ng-zorro-antd:<demo>` with `@ng-zorro/schematics:<demo>` in your commands and demo-specific `angular.json` defaults. Example names are unchanged. Generated demo components are standalone.

`ng add ng-zorro-antd`, `ng update ng-zorro-antd`, and the `component`, `sidemenu`, `topnav`, and `add-icon-assets` generators remain in the main package.
