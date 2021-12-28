---
order: 13
title: Change Log
toc: false
timeline: true
---
`ng-zorro-antd` strictly follows [Semantic Versioning 2.0.0](https://semver.org).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breaking change and new features.

---
## 13.0.0

`2021-12-28`

### Intro
Welcome to the `13.0.0` version of `ng-zorro-antd`,some APIs were deprecated in version 12.x, and warning message was given under dev mode. All deprecated APIs is removed in 13.0.0, if you have fixed all warnings in the 12.x version, you can follow these steps to upgrade your version.

## Before upgrade

1. Make sure `Node.js` >= `12.20`, `Typescript` >= `4.4`.
2. Create a new branch, or use other methods to back up the current project.
3. Delete the package-lock.json file.

### 1.Upgrade dependencies

- Upgrade Angular to 13.x version, ref [https://update.angular.io/](https://update.angular.io/).
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.

### 2.Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`.
- If any warning messages appear in the console, follow the prompts to modify the corresponding code.

### Changes in V13
#### Angular Ivy Supported
View Engine is no longer available in Angular as of v13. This is great news because Angular can continue to create Ivy-based features that bolster your productivity with the platform.

More help go to [Angular Ivy](https://angular.io/guide/ivy) and [Template type](https://angular.io/guide/template-typecheck) checking.

#### End of IE11 support
- Removing IE11 support allows Angular to leverage modern browser features such as CSS variables and web animations via native web APIs
- What’s more is that apps will be smaller and load faster because we can remove IE specific polyfills and code paths
- It also removes the need for differential loading
- Running ng update will automatically drop these IE-specific polyfills and reduce bundle size during project migration

#### Enhanced Performance and Usability
- Optimization for multiple components to eliminate possible memory leaks

### BREAKING CHANGES
**dropdown**
- `[nz-dropdown][nzHasBackdrop="true""]` input value are no longer supported, please use `[nz-dropdown][nzBackdrop]` instead.

**table**
- `[nz-filter-trigger][nzHasBackdrop="true""]` input value are no longer supported, please use `[nz-filter-trigger][nzBackdrop]` instead.


## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
