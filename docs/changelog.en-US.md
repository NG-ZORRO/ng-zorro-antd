---
order: 11
title: Change Log
toc: false
timeline: true
---
`ng-zorro-antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breaking change and new features.

---
## 7.3.2
`2019-04-22`

### Bug Fixes

* **build:** fix bundling error of components.less ([#3331](https://github.com/NG-ZORRO/ng-zorro-antd/pull/3331)) ([fb19921](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb19921))

## 7.3.1
`2019-04-22`

### Bug Fixes

* **tree:** fix nodes list to render correctly ([#3326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3326)) ([6d759a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d759a8)), closes [#3320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3320)
* **select:** fix select search display ([#3324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3324)) ([d91af03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d91af03)), closes [#3322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3322)

## 7.3.0
`2019-04-21`


### Features

* support server-side rendering ([#3295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3295)) ([2088459](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2088459)), closes [#3222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3222) [#43](https://github.com/NG-ZORRO/ng-zorro-antd/issues/43) [#2025](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2025) [#2474](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2474)
* support standalone/secondary entry modules ([#3234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3234))
* **modal:** support `nzMask` and `nzMaskClosable` global config ([#3033](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3033)) ([12cac9e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12cac9e))
* **tree:** support nzBlockNode ([#3270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3270)) ([5129f73](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5129f73))
* **date-picker:** `nzRanges` support callback ([#3304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3304)) ([a231cb5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a231cb5)), closes [#1629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1629)
* **date-picker:** support `nzOnCalendarChange` ([#3169](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3169)) ([4446005](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4446005))
* **form:** support hide the label colon ([#3136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3136)) ([663169f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/663169f))
* **table:** expose CdkVirtualScrollViewport ([#3297](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3297)) ([a942312](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a942312)), closes [#3144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3144) [#3073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3073) [#2886](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2886)
* **table:** support nzLoadingIndicator ([#3299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3299)) ([1f339b3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f339b3)), closes [#3008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3008)
* **time-picker:** support 12-hour with `nzUse12Hours` ([#3127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3127)) ([7c52774](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c52774))
* **tree, tree-select:** support customize icons ([#2933](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2933)) ([a77f6c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a77f6c9))
* **schematics:** enhance component generator ([#3265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3265)) ([c22eae5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c22eae5))


### Bug Fixes

* **anchor:** fix scroll bar misplacement in target container ([#3242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3242)) ([37ac541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37ac541))
* **drawer:** create focus trap error when `nzVisible` default value is true ([#3203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3203)) ([327ceca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/327ceca)), closes [#3200](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3200)
* **dropdown:** fix dropdown expands outside the bounds of the page ([#3289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3289)) ([47f0aef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47f0aef)), closes [#3288](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3288)
* **dropdown:** fix dropdown style conflict with material style ([#3290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3290)) ([e30a9be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e30a9be)), closes [#3241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3241)
* **dropdown:** fix dropdown ul list-style ([#3284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3284)) ([2845b57](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2845b57)), closes [#3268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3268)
* **form:** fix form control template driven ([#3305](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3305)) ([032d193](https://github.com/NG-ZORRO/ng-zorro-antd/commit/032d193)), closes [#3211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3211)
* **i18n:** fix catalan translations ([#3080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3080)) ([81f917a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81f917a)), closes [#2569](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2569)
* **input-number:** blur event can't get correct current value from validation info ([#3315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3315)) ([ee3d94c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee3d94c)), closes [#3134](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3134)
* **modal:** integration problem with select component ([#3245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3245)) ([3da4b68](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3da4b68)), closes [#3213](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3213)
* **select:** fix select disable cursor ([#3287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3287)) ([f5528d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f5528d9)), closes [#3246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3246)
* **select:** fix select not change after option input changes ([#3313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3313)) ([74d996b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74d996b)), closes [#3029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3029)
* **select:** fix select scroll top trigger ([#3285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3285)) ([1478e59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1478e59)), closes [#3258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3258)
* **steps:** updateChildrenSteps bug ([#3194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3194)) ([8198b23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8198b23)), closes [#3193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3193)
* **table:** fix table border in firefox ([#3294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3294)) ([82407e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82407e7)), closes [#3164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3164)
* **tree:** duplicated module import ([#3286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3286)) ([5c8b923](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c8b923))
* **tree, tree-select:** fix the key validity check ([#3247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3247)) ([87f2386](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87f2386)), closes [#3163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3163)
* **upload:** fix deprecated icon class property ([#3230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3230)) ([bc4e7da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc4e7da)), closes [#3228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3228)
* **rate** click event is stopped ([#3262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3262)) ([2b4bde4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4bde4)), closes [#3252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3252)
* **style** fix patch not included ([#3317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3317)) ([5b02e48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b02e48))



## 7.2.0
`2019-03-27`

### Bug Fixes

* **affix:** set correct style of Affix after trigger resize ([#3089](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3089)) ([ff482e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff482e0)), closes [#3040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3040)
* fix type of some API ([#3166](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3166)) ([c685836](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c685836))
* **breadcrumb:** fix auto generate not working in lazy modules ([#3174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3174)) ([4260a40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4260a40)), closes [#2538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2538)
* **dropdown:** fix the style of CDK conflicts ([#3133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3133)) ([a9cd84d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9cd84d)), closes [#3075](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3075)
* **progress:** should not set success when success percent is … ([#3135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3135)) ([f85c766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f85c766))
* **transfer:** fix invalid trigger checked event in blank area ([#3161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3161)) ([92097b2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92097b2)), closes [#3160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3160) [#3159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3159)
* **upload:** fix missing remove event when type is drag ([#3114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3114)) ([2b1fdd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b1fdd9)), closes [#3034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3034) [#3139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3139) [#3171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3171)


### Features

* **collapse:** support `nzExtra` ([#3177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3177)) ([fbfb4da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fbfb4da))
* **menu:** support `nzMenuClassName` for the submenu ([#3176](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3176)) ([15b6724](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15b6724))
* **page-header:** add page-header component ([#2732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2732)) ([cf51c1f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf51c1f)), closes [#2710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2710)
* **schematics:** do not set boot page when the target file is modified ([#3178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3178)) ([0a3f62c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0a3f62c))

## 7.1.0
`2019-03-21`

### Bug Fixes

* **tree:** fix nzMultiple and rollback code ([#3060](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3060)) ([c917938](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c917938)), closes [#3076](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3076)
* **cascader:** fix columns not dropped ([#3037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3037)) ([72a9e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/72a9e67)), closes [#3034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3034)
* **date-picker:** export `year-picker` component ([#3125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3125)) ([c5b0af9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5b0af9))
* **modal:** integrate with tabs and autosize ([#3065](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3065)) ([4cab26f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cab26f)), closes [#2286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2286) [#2713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2713)
* **modal:** simple confirm should not have cancel button ([#3115](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3115)) ([f0a2b51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0a2b51)), closes [#3107](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3107)
* **tooltip:** fix tooltip not render after set ([#3091](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3091)) ([2841a2f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2841a2f))


### Features

* **message:** support `nzTop` ([#3047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3047)) ([351135b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/351135b)), closes [#3041](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3041)
* **message:** support template ([#3102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3102)) ([d3f6655](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d3f6655)), closes [#3081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3081)

## 7.0.3
`2019-03-14`

### Bug Fixes

* **select:** fix select init touched state error when disabled ([#3084](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3084)) ([ba9d454](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba9d454)), closes [#3059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3059)

### Build

* **build:** add strictNullCheck config ([#2126](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2977))
* **build:** upgrade icon to 2.0.2 ([#3085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3085)) ([fc72d7d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc72d7d))

## 7.0.2
`2019-03-11`

### Bug Fixes

* **pagination:** fix pagination bug ([#3067](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3067)) ([f4948d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f4948d7)), closes [#3049](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3049)
* **steps:** fix steps state change error under onpush strategy ([#3061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3061)) ([97adb2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/97adb2c))
* **table:** fix table small size virtual scroll style ([#3063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3063)) ([4fa16de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4fa16de)), closes [#3050](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3050)
* **table:** fix th check not trigger bug ([#3064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3064)) ([dbc33ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbc33ae)), closes [#3028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3028) [#3056](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3056) [#3058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3058)
* **transfer:** fix click checkbox can't trigger selection ([#3030](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3030)) ([f077294](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f077294)), closes [#3026](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3026)

## 7.0.1
`2019-03-04`

### Bug Fixes

* **tree:** fix default keys bug with setTimeOut ([#3003](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3003)) ([050faa0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/050faa0)), closes [#3001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3001)
* **tree:** fix expand state bug for tree-select ([#2997](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2997)) ([623a9ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/623a9ff))
* **checkbox:** fix checkbox a11y error ([#3009](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3009)) ([42ed317](https://github.com/NG-ZORRO/ng-zorro-antd/commit/42ed317)), closes [#3000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3000)
* **fesm2015:** fix fesm2015 build error ([#3015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3015)) ([e5b388a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5b388a))
* **icon:** remove icon test module export ([#3002](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3002)) ([28edb53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28edb53))
* **schematics:** fix `add-icon-assets` schema path ([#3005](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3005)) ([5101928](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5101928))
* **select:** fix select reset in form ([#3017](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3017)) ([30b3d86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30b3d86)), closes [#3014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3014)
* **table:** fix table crash with double binding ([#3007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3007)) ([a2202b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2202b4)), closes [#3004](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3004)

## 7.0.0
`2019-02-28`

It has been three months since we released the last stable version 1.8.1, and now here comes ng-zorro-antd 7.0.0! (From 7.0.0, the package’s major version number would be aligned to Angular’s)

According to the road map we published last year, we add 105 commits on the top of the last three release candidate versions. Now we have reached [Milestone I](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2381).

* All components now work with OnPush change detection strategy. You can anticipate a tremendous improvement of performance.
* Animations are updated to meet Ant Design’s specifications. And you can configure animation globally or specifically to each component.
* New components: Empty, Statistic, Countdown and Comment.
* New features of Angular CDK is introduced to some components. For example, Table component now supports virtual scrolling.
* Lots of new features. Lots of bug fixes.
* You can use ISO date format in components like Calendar & Date Picker.
* Global scrolling strategy is changed. Modal and Drawer components will no longer shake under some circumstances.
* More strict TypeScript compiler options.
* Brand new logo and documentation site.

We will move on to [Milestone II](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2474) right after this release. Server side rendering (SSR), secondary entries, global configurations and dynamic validation would be supported in future versions to come.


### Update Guidance

1. Update Angular and other packages to newest versions.

2. Update ng-zorro-antd to 7.0.

**Notice**

Pay attention to these changes to ensure that your code works as expected:

1. All components now work with OnPush strategy. Components with this strategy would not respond to mutations on object properties or array child items, even decorated with @Input(). So you should make all your @Input properties immutable objects. Not only this would ensure your code works correctly but also improve performance if you use [immutable objects](https://www.sitepoint.com/immutability-javascript/) right. Please checkout our example below.
2. We correct the meaning of nzDropdownMatchSelectWidth of Select component. Now it means exactly opposite of the old one.
3. If you want to add a button to an input-group in search mode, you should use nzAddOnAfter instead of nzSuffix.

### Changelog

#### Bug Fixes

* **affix:** fix should reset placeholder size when trigger resize event ([#2835](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2835)) ([7068a5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7068a5e)), closes [#2818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2818)
* **anchor:** fix called detectChanges when component destroy ([#2864](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2864)) ([0e5c937](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e5c937)), closes [#2860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2860)
* **animation:** move hostbinding to constructor to fix angular transition bug ([#2895](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2895)) ([e39f6bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e39f6bf))
* **build:** fix ES6 build target error ([#2921](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2921)) ([ab62b40](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab62b40)), closes [#2893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2893)
* **carousel:** fix carousel does not display in modal or card ([#2699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2699)) ([e092bf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e092bf0)), closes [#2387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2387) ,[#2226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2226)
* **carousel:** fix carousel does not render when window resizes  ([#2699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2699)) ([e092bf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e092bf0)), closes [#2158](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2158)
* **carousel:** fix carousel item cannot be clicked ([#2699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2699)) ([e092bf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e092bf0)), closes [#2631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2631)
* **cascader:** fix searching error when nzOptions is empty ([#2846](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2846)) ([e33cc50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e33cc50)), closes [#2784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2784)
* **cascader**: fix children state not changed [(#2986](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2986)) ([b87e8bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87e8bbba88ab6dfb22d4783259d57c8157c7b07))
* **core:** fix the style of CDK conflicts ([#2917](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2917)) ([37cf6f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37cf6f3)), closes [#2874](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2874)
* **date-picker, calendar, time-picker:** provide a option to resolve the week number that is not according to ISO standard algorithm ([#2819](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822)) ([e1bce41](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822/commits/e1bce41140186214ae1f214bb50e835b5e9c7303)), closes [#2819](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2819) ,[#2406](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2406)
* **drawer:** fix body overflow problem ([#2867](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2867)) ([1e081f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e081f0)), closes [#2227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2227)  [#2615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2615)
* **grid:** fix grid responsive ([#2915](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2915)) ([ab05619](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab05619)), closes [#2908](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2908)
* **i18n:** Danish locale is exported and mentioned in i18n docs ([#2599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2599)) ([6554cf5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6554cf5))
* **i18n:** update missing fields in fr_FR ([#2586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2586)) ([#2737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2737)) ([c821d56](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c821d56))
* **icon:** fix falsy render ([#2912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2912)) ([6dd3cbf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6dd3cbf)), closes [#2911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2911)
* **input:** fix *fix icon new API capability ([#2841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2841)) ([3c954cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c954cb))
* **menu, dropdown:** fix dropdown in firefox ([#2816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2816)) ([09f21d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f21d0)), closes [#2834](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2834)
* **modal, drawer:** IE/Edge SVG doesn't support `blur`/`focus` method ([#2869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2869)) ([7487a7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7487a7e)), closes [#2388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2388)
* **modal:**  fix body overflow problem ([#2869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2869)) ([7487a7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7487a7e)), closes  [#2612](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2612)
* **modal:**  unable to close the mask if the container is OnPush ([#2869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2869)) ([7487a7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7487a7e)), closes [#2643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2643)
* **radio:** children unable to focus in radio label ([#2850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2850)) ([58743b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/58743b8)), closes [#2774](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2774)
* **select**: can not location to the selected value ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **select**: fix multiple value not grow error ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **select**: fix nzScrollToBottom bug when browser zoom ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **switch:** fix switch error when loading or disabled ([#2896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2896)) ([a67984c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a67984c)), closes [#2787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2787)
* **table:** fix border style error in Firefox ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** fix th sort in ngIf  ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** multiple columns style nzRight ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **time-picker**: place the clear button adjustment to the outer input box ([#2948](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2948)) ([ffb6665](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffb6665db1be40d9b4e653f1cbabe131fd582899))
* **tooltip:** fix setTitle proxy to nzTitle ([#2698](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2698)) ([f6dfbd9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6dfbd9)), closes [#2695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2695)
* **tree-select:** fix tree-select overlay's index problem ([#2764](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2764)) ([599ae1a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/599ae1a)), closes [#2730](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2730)
* **tree:** Fix nzShowIcon not working for false ([#2724](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2724)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2724](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2724)
* **tree:** Fix parent-child node association problem in nzCheckStrictly state ([#2655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2655) [#2370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2370)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2655) ,[#2370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2370)
* **tree:** Fix the loading icon position offset problem ([#1998](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1998)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#1998](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1998)
* **tree:** Fix the state sync problem of setChecked method ([#2273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2273)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2273)
* **tree**: fix animation of expand method ([#2989](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2989)) ([5142d18](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5142d18982192cbdfd2e9876de85840d2e0f809c))

#### Features

* **auto-complete:** close panel when the trigger element blur ([#2916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2916)) ([1e075f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e075f9)), closes [#2885](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2885)
* **badge:** support nzCount input TemplateRef ([#2880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2880)) ([fd0d91c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fd0d91c))
* **cascader:** reposition cascader when column opens ([#2836](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2836)) ([289ba54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/289ba54)), closes [#2181](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2181) ,[#2809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2809)
* **collapse:** support custom icon ([#2783](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2783)) ([a530f80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a530f80))
* **comment:** add comment component ([#2767](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2767)) ([14859c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/14859c8)), closes [#2731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2731)
* **date-picker & calendar**: support custom first day of week for all date components ([#2819](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822)) ([e1bce41](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2822/commits/e1bce41140186214ae1f214bb50e835b5e9c7303)), closes [#2293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2293) ,[#2073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2073)
* **date-picker**: support `nzDisabledDate` for `year-picker` ([#2949](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2949)) ([71dda9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71dda9bfce4a1c3a6563f0352580674e2929399d)), closes [#2194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2194)
* **empty:** add empty component ([#2722](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2722)) ([8906dff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8906dff)), closes [#2711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2711)
* **icon:** support rotate ([#2891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2891)) ([07f76af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07f76af)), closes [#2888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2888)
* **icon:** update dependency to support namespace ([#2641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2641)) ([a2000fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a2000fa))
* **layout:** support zeroTrigger ([#2938](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2938)) ([4e4231d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4e4231d)), closes [#1950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1950) ,[#1951](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1951)
* **menu, dropdown:** support nest demo ([#2816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2816)) ([09f21d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f21d0)), closes [#1697](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1697)
* **modal:** support set `nzOkDisabled` and `nzCancelDisabled` ([#2856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2856)) ([fa6a8e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa6a8e9)), closes [#1838](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1838)
* **notification:** support nzData as context in template ([#2926](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2926)) ([51940f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51940f7)), closes [#2755](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2755)
* **popconfirm:** support custom icon ([#2964](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2964)) ([ff030ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ff030ff)), closes [#2196](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2196)
* **rate:** add tooltip support ([#2794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2794)) ([e121bd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e121bd3))
* **select**: support automatic tokenization ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **select**: support maxTagCount & maxTagCountPlaceholder ([#2741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2741))
* **slider:** support nzTooltipVisible ([#2930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2930)) ([d3e61d4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d3e61d4)), closes [#2373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2373)
* **statistic:** add statistic component ([#2760](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2760)) ([abb9ae4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abb9ae4e5ef8230f0a773bbdd1cebf46040832f0)), closes [#2754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2754)
* **table:** support nzItemRender ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** support pagination position ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **table:** support text align ([#2862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2862)) ([074083e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/074083e))
* **tabs:** support tab lazy load ([#2968](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2968))
* **tree-select:** support set `nzNotFoundContent` ([#2740](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2740)) ([d9055f5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9055f5))
* **tree:** Search feature supports hiding unmatched nodes ([#2208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2208)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2208)
* **tree:** Supports get nzTreeNode instance with key ([#2455](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2455)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#2455](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2455)
* **tree:** Supports operations such as deleting nodes (state sync) ([#1399](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1399) [#2384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2384)) ([36c91ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c91ac)), closes [#1399](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1399) ,[#2384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2384)
* **upload:** support with non-image format file preview ([#2709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2709)) ([4c41715](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c41715))

### Example

In this example, `this.value.push('jack')` would not trigger change detection. However, `this.value = [ ...this.value, 'jack' ]` works. Please refer to this article ([These 5 articles will make you an Angular Change Detection expert](https://blog.angularindepth.com/these-5-articles-will-make-you-an-angular-change-detection-expert-ed530d28930)) if you want to have a comprehensive understanding of Angular’s change detection.


```ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-basic',
  template: `
    <nz-select [(ngModel)]="value" nzMode="multiple">
      <nz-option nzValue="jack" nzLabel="Jack"></nz-option>
      <nz-option nzValue="lucy" nzLabel="Lucy"></nz-option>
    </nz-select>
  `
})
export class NzDemoSelectBasicComponent implements OnInit {
  value = [ 'lucy' ];

  ngOnInit(): void {
    setTimeout(() => {
      // this.value.push('jack'); // Mutation on the object would not trigger change detection.
      this.value = [ ...this.value, 'jack' ]; // This works!
    }, 3000);
  }
}


```

---

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)