---
order: 2
title: Schematics
---
`ng-zorro-antd` support [schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2), you can init configuration and generate component with schematics now.

## Init Project

Init project with `ng-zorro-antd`.

### Command

```bash
ng add ng-zorro-antd [options]
```

### Options

***--theme***

`ng-zorro-antd` will [downgrade](https://github.com/angular/angular-cli/issues/10430) the version of `less` to `2.7` and create `theme.less` in `src` folder.

You can get more information at the [Customize Theme](/docs/customize-theme/en) part.

***--i18n***

If you add `--i18n=[language]`，`ng-zorro-antd` import the language package and the [i18n](https://angular.io/guide/i18n) part of angular in the `app.module.ts`.

The default i18n config of `ng-zorro-antd` is `zh_CN` now，you can get more information at the [Internationalization](/docs/i18n/en) part.

## Component Generation

You can get component generation code in our doc after expand the code panel below every example.

### Command

```bash
ng g ng-zorro-antd:[template] --name=NAME [options]
```

For example, you can generate an login form with the follow command.

```bash
ng g ng-zorro-antd:form-normal-login -p app --styleext=less --name=login
```

### Options

***--name***

Specify the component name(required)

***--styleext***

The type of style file（default css).

***--prefix***, ***-p***

The prefix name of the component.

***--inlineStyle***, ***-s***

Using inline style.

***--inlineTemplate***, ***-t***

Using inline template.

***--path***

Specify the path of the created component.

***--spec***

Create test file.

***--skipImport***

Skip module import.

***--selector***

The name of selector.

***--export***

Should add component to `exports` part.

***--module***, ***-m***

Specify the module name.

