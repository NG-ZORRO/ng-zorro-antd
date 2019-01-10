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

### Options

***--entry-component***

Specifies if the component is an entry component of declaring module.

***--export***

Specifies if declaring module exports the component.

***--flat***

Flag to indicate if a dir is created.

***--inline-style (-s)***

Specifies if the style will be in the ts file.

***--inline-template (-t)***

Specifies if the template will be in the ts file.

***--module (-m)***

Allows specification of the declaring module.

***--prefix (-p)***

The prefix to apply to generated selectors.

***--project***

The name of the project.

***--selector***

The selector to use for the component.

***--skip-import***

Flag to skip the module import.

***--spec***

Specifies if a spec file is generated.

***--styleext***

The file extension to be used for style files.

