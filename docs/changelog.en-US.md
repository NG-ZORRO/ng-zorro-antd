---
order: 12
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
## 9.0.0-beta.1

`2020-03-15`

### Intro

Note: We are still in beta version now, this version is not recommend to use in prod environment, if you meet any problems, please submit an issue to us.

Welcome to the `9.0.0-beta.1` version of `ng-zorro-antd`,some APIs were deprecated in version 8.x, and warning message was given under dev mode. All deprecated APIs is removed in 9.0.0, if you have fixed all warnings in the 8.x version, you can follow these steps to upgrade your version.

1. Upgrade to Angular 9.0, ref https://update.angular.io/
2. Upgrade to ng-zorro-antd@next, we will provide official `ng update` in `9.0.0` version
3. We use `date-fns` `2.x` version now, and provide compatible tools for ng-zorro-antd components.

## date-fns update

We have upgraded `date-fns` to v2. When you switch to` date-fns`, some date formats will have a breaking change. Such as:

```html
<!-- datefns v1 -->
<nz-date-picker nzFormat="YYYY-MM-DD"></nz-date-picker>

<!-- datefns v2 -->
<nz-date-picker nzFormat="yyyy-MM-dd"></nz-date-picker>
```

**We recommend using `date-fns` v2 date format**. If you don't want to use the new date format, you can use `NZ_DATE_FNS_COMPATIBLE`. When set to` true`, `ng-zorro-antd` will convert the format of v1 to v2. See the comparison of the old and new formats [here](https://github.com/date-fns/date-fns/blob/master/CHANGELOG.md#200---2019-08-20).

```js
providers: [
  { provide: NZ_DATE_FNS_COMPATIBLE, useValue: true }
]
```

**Note: `NZ_DATE_FNS_COMPATIBLE` won't be kept for too long, we will remove the support for `date-fns` v1 format until ` ng-zorro-antd` v10**, we hope you can update the `date-fns` date format in time. For `date-fns` upgrade guide, see [here](https://github.com/date-fns/date-fns).

### Bug Fixes

* **auto-complete:** close the panel when tapping scrollb… ([#4551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4551)) ([387ebc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387ebc1)), closes [#4333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4333)
* **auto-complete:** default value not selected ([#4366](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4366)) ([09f1ec6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f1ec6)), closes [#4362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4362)
* **breadcrumb:** fix breadcrumb link style ([#4880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4880)) ([2553328](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2553328))
* **button:** fix button animation bug caused by angular ([9e0df2a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e0df2a)), closes [#2697](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2697)
* **calendar:** correct expected class name in test ([#4369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4369)) ([12111e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12111e5))
* **cascader:** fix not showing empty when there's no options ([#4565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4565)) ([9d8d7e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d8d7e6)), closes [#4562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4562)
* **code-editor:** fix config ([#4436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4436)) ([5283a32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5283a32))
* **core:** add type guard for isNotNil ([#4431](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4431)) ([b3c686c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b3c686c))
* **core:** fix global config not working in prod mode ([#4325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4325)) ([cc9308d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc9308d)), closes [#4319](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4319)
* **date-picker:** `nzDefaultOpenValue` not work in time panel ([#4357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4357)) ([dfa3d39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dfa3d39)), closes [#4331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4331)
* **date-picker:** animation start after overlay open ([#4315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4315)) ([931fd48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/931fd48))
* **date-picker:** select date but nzDefaultOpenValue not work ([#4490](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4490)) ([2397819](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2397819))
* **drawer:** content overflow when placement is top or bottom ([#4423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4423)) ([9451de5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9451de5)), closes [#4354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4354)
* **drawer:** disable transition animation when placement change ([#4609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4609)) ([e539096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e539096)), closes [#4224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4224)
* **drawer:** fix the HTML structure of the drawer header ([#4311](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4311)) ([5cdd5db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cdd5db)), closes [#4304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4304)
* **dropdown:** fix ghost menu with contextmenu ([39487f1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39487f1)), closes [#3971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3971) [#4684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4684)
* **dropdown:** fix menu group style in dropdown ([d928a8c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d928a8c)), closes [#4505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4505)
* **layout:** fix layout demo height style ([bed60ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bed60ff)), closes [#4676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4676)
* **layout:** fix responsive sider not work ([9f951f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f951f8))
* **mention:** unable to select on mobile device ([#4309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4309)) ([1be6d51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1be6d51)), closes [#4281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4281)
* **menu:** fix menu overflow detection & replace ul with div ([4c8032b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c8032b)), closes [#3412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3412) [#4227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4227) [#3687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3687)
* **message:** fix message and notification error in prod ([#4884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4884)) ([3e2f85d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e2f85d))
* **modal:** `nzMaskClosable` not working in the confirm mode ([#4347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4347)) ([475bbc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/475bbc4)), closes [#4344](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4344)
* **page-header:** fix break change on the style ([#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)) ([4c10e5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c10e5b))
* **page-header:** has footer or breadcrumb style bug ([#4363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4363)) ([dcc7deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcc7deb))
* **pagination:** replace full-width character with half-width ([#4371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4371)) ([cc3868e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc3868e))
* **select:** prevent hidden options from being selected ([#4382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4382)) ([cf22133](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf22133)), closes [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377) [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377)
* **table:** `nzFilters` can is not null ([#4595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4595)) ([2c26e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c26e9f))
* **table:** fix table data type ([#4608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4608)) ([70b1440](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b1440)), closes [#4593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4593)
* **table:** fix table nzWidth bug without the first column ([#4329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4329)) ([c6bdf15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6bdf15)), closes [#4312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4312)
* **table:** support nzWidthConfig null undefined value ([#4342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4342)) ([761e8e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/761e8e0))
* **timeline:** fix reverse bug ([#4690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4690)) ([09bf8f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09bf8f4)), closes [#4509](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4509)
* **transfer:** fix transfer nzTargetKeys property ([#4670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4670)) ([31089a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31089a1)), closes [#4641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4641) [#4360](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4360) [#4210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4210)
* fix github workflow action ([10a772f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10a772f))
* **tooltip:** fix hiding when hover popover ([#4418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4418)) ([a6b5901](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6b5901)), closes [#4417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4417)
* **tooltip:** fix not undefined value not updated ([#4392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4392)) ([2a71c43](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a71c43))
* **tooltip:** fix tooltip accessing destroyed view ([#4387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4387)) ([8e9e6a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e9e6a9)), closes [#3875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3875) [#4317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4317) [#4386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4386)
* **tree-select:** click label behavior is incorrect in strict mode ([#4424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4424)) ([7a11124](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a11124)), closes [#4422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4422)
* **tree-select:** default tags incorrect in strictly mode ([#4368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4368)) ([a6547a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6547a0)), closes [#4364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4364)
* **calendar:** delete deprecated input nzCard ([#4464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4464)) ([aed2e7d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aed2e7d))
* **carousel:** remove vertical api ([#4376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4376)) ([37aa921](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37aa921))
* **empty:** remove injection token ([#4465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4465)) ([cc8018a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc8018a))
* **icon:** remove old api ([#4375](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4375)) ([91e52ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91e52ab))
* **message,notification:** remove old injection tokens ([#4404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4404)) ([f9b0e75](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9b0e75))
* **tooltip,popover,popconfirm:** remove component API ([#4390](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4390)) ([f82e8a6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f82e8a6))
* **tree, tree-select:** remove deprecated API ([#4601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4601)) ([1ec18e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ec18e4))
* **code-editor:** fix wrong initialization with diff mode ([#4485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4485)) ([#4532](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4532)) ([021cf22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/021cf22))

### Features

* **breadcrumb:** support indenpendent separator ([#4713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4713)) ([1f490e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f490e9))
* **collapse:** support nzExpandIconPosition ([#4781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4781)) ([760512a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/760512a))
* **date-picker:** add some inputs ([#4843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4843)) ([af4051e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4051e))
* **date-picker:** support parse input value ([#4833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4833)) ([6a523ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a523ba)), closes [#4028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4028) [#3976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3976) [#2492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2492) [#4101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4101)
* **grid:** support nzFlex and nzGutter array, deprecated nzType ([c4d2694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2694))
* **i18n:** support for Armenian ([#4611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4611)) ([038691f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/038691f))
* **i18n:** support for Georgian locale ([#4491](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4491)) ([d96ebe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d96ebe0))
* **icon:** support add icon in feat modules ([#4711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4711)) ([0bcd2a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bcd2a9))
* **input:** support textarea with clear icon ([0af9242](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0af9242)), closes [#4623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4623)
* **input-number:** support nzPrecisionMode mode ([#4185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4185)) ([bfe089f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bfe089f)), closes [#4173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4173)
* **input-number:** trigger ngModelChange at once ([#4769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4769)) ([299ba6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/299ba6d)), closes [#3039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3039) [#3773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3773)
* **menu:** auto nzInlineCollapsed when sider collapsed ([51fbf5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51fbf5e)), closes [#4680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4680)
* **menu:** menu with nzMatchRouter work with CanDeactivate ([7560563](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7560563)), closes [#4407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4407)
* **code-editor:** support static loading ([#4341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4341)) ([29f732b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29f732b))
* **notification:** add close icon prop ([#4495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4495)) ([80a0b26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a0b26)), closes [#4494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4494)
* **page-header:** add `nzGhost` property ([#4306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4306)) ([4c78cca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c78cca)), closes [#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)
* **pagination:** nzItemRender support prev_5 and next_5 ([#4754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4754)) ([41c4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41c4860))
* **progress:** support steps ([#4637](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4637)) ([fe8b469](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe8b469)), closes [#4635](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4635)
* **progress:** support TemplateRef for nzFormat ([#4598](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4598)) ([edf0e9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edf0e9c)), closes [#4596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4596)
* **select:** refactor the select to support virutal scroll ([40daee9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40daee9)), closes [#4585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4585) [#3497](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3497)
* **skeleton:** add nz-skeleton-element ([#4859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4859)) ([8dc2ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8dc2ff3))
* **tabs:** add  nzCanDeactivate hook ([#4476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4476)) ([a533980](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a533980)), closes [#4432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4432)
* **tag:** support status colors ([#4628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4628)) ([aa22c0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa22c0f)), closes [#4622](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4622) [#4413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4413)
* **tooltip:** support changing trigger ([#4397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4397)) ([48d7122](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d7122)), closes [#4365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4365)
* **tree-select:** support `nzDropdownClassName` property ([#4552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4552)) ([df8c125](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df8c125)), closes [#4508](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4508)
* **typography:** support `nzSuffix` property ([#4629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4629)) ([ca02a07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca02a07)), closes [#4620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4620)
* **schematics:** add locale option in 'ng-add' ([#4786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4786)) ([dcd01cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcd01cb))
* **schematics:** add v9 migration rules for dropdown ([#4466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4466)) ([aebad87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aebad87))
* **schematics:** add v9 migration rules for icon and calendar ([#4467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4467)) ([3c5d24e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c5d24e))
* **schematics:** add v9 migration rules for tooltip-like ([#4402](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4402)) ([313f7b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/313f7b8))


### Performance Improvements

* **checkbox:** use css empty selector instead of observeContent ([#4761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4761)) ([da8821a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da8821a))
* **input:** improve input-group perf ([7af643b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7af643b)), closes [#3950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3950)
* **radio:** refactor radio group data flow ([#4770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4770)) ([423a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/423a382))


### BREAKING CHANGES

Note: All break changes are warned in the latest version of 8.x, if you have fixed all warnings in 8.x, there will no break changes for you. Official `ng update` tools will be provided in version `9.0.0`.
* **form:** 
  - `nz-form-extra` is removed. Please use `nzExtra` is `nz-form-control` instead.
  - `nz-form-explain` is removed. Please use `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` is `nz-form-control` instead.
  - `nz-form-extra` is removed. Please use `nzExtra` is `nz-form-control` instead.
  - `nz-form-explain` is removed. Please use `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` is `nz-form-control` instead.
* **input-number:** 
  - ngModelChange trigger at once when user typing
* **pagination:** 
  - prev_5 and next_5 is needed when use nzItemRender
  - 'pre' typo was corrected to 'prev'
* **tree, tree-select:** * tree
  - Removed `[nzDefaultExpandAll]` use `[nzExpandAll]` instead.
  - Removed `[nzDefaultExpandedKeys]` use `[nzExpandedKeys]` instead.
  - Removed `[nzDefaultSelectedKeys]` use `[nzSelectedKeys]` instead.
  - Removed `[nzDefaultCheckedKeys]` use `[nzCheckedKeys]` instead.
  - Removed `(nzOnSearchNode)` use `(nzSearchValueChange)` instead.
* tree-select
  - Removed `[nzDefaultExpandedKeys]` use `[nzExpandedKeys]` instead.
* **message,notification:** 
  - `NZ_MESSAGE_CONFIG` is removed. Please use `NzGlobalConfigService` instead.
  - `NZ_NOTIFICATION_CONFIG` is removed. Please use `NzGlobalConfigService` instead.
  - `config` method of `NzMessageService` and `NzNotificationService` is removed. Please use `set` method of `NzGlobalConfigService` instead.
* **empty:** 
  - `NZ_DEFAULT_EMPTY_CONTENT` is removed. Please use `NzConfigService` instead.
* **carousel:** Carousel
  - `nzVertical` is removed. Please use 'nzDotPosition' instead.
* **icon:** 
  - `NZ_ICON_DEFAULT_TWOTONE_COLOR` is removed. Use `NzGlobalConfigService` instead.
  - `i[nz-icon]`:  `twoToneColor` `theme` `spin` `iconfont` `type` inputs has been removed, use `nzTwoToneColor` `nzTheme` `nzSpin` `nzIconfont` `nzType` instead.
  - `i.anticon` selector has been removed, use `i[nz-icon]` instead.
* **calendar:** 
  - `<nz-calendar>` `nzCard` input has been removed, use `nzFullscreen` instead.
* **tooltip,popover,popconfirm:** 
  - `<nz-tooltip>` `<nz-popover>` `<nz-popconfirm>` components has been removed, use its directives instead.
* Removed deprecated API `NgZorroAntdModule.forRoot()`

---

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
