---
order: 2
title: Schematics
---
`ng-zorro-antd` support [schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2), you can init configuration and generate component with schematics now.

## Init Project

Init project with `ng-zorro-antd`.

Run `ng add ng-zorro-antd` in your project directory, and follow the options to configure.

<img style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2);" src="https://img.alicdn.com/tfs/TB19fFHdkxz61VjSZFtXXaDSVXa-680-243.svg">

You can choose a preset template to create your project, then develop on this basis code.

<img style="display: block; border-radius: 4px; box-shadow: 1px 1px 4px 0px rgba(0, 0, 0, 0.2); max-width: 680px;" src="https://img.alicdn.com/tfs/TB1IC0TeEWF3KVjSZPhXXXclXXa-2000-1078.png">

### Command

```bash
ng add ng-zorro-antd [options]
```

### Options

***--theme***

`ng-zorro-antd` will create `theme.less` in `src` folder.

You can get more information at the [Customize Theme](/docs/customize-theme/en) part.

***--locale***

If you add `--locale=[language]`，`ng-zorro-antd` import the language package and the [i18n](https://angular.io/guide/i18n) part of angular in the `app.module.ts`.

The default i18n config of `ng-zorro-antd` is `zh_CN` now，you can get more information at the [Internationalization](/docs/i18n/en) part.

***--animations***

Enable the BrowserAnimationsModule your app module

***--gestures***

Install and import hammerjs for gesture support in your project

## Component Generation

You can get component generation code in our doc after expand the code panel below every example.

### Command

```bash
ng g ng-zorro-antd:[schematic] <name> [options]
```

For example, you can generate an login form with the follow command.

```bash
ng g ng-zorro-antd:form-normal-login login
```
