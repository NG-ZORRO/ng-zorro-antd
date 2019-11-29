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

## 8.5.2
`2019-11-29`

### Bug Fixes

* **code-editor:** fix wrong initialization with diff mode ([#4485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4485)) ([7ef8c63](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ef8c63))


## 8.5.1
`2019-11-18`

### Bug Fixes

* **code-editor:** fix config ([#4436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4436)) ([5283a32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5283a32))
* **drawer:** content overflow when placement is top or bottom ([#4423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4423)) ([9451de5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9451de5)), closes [#4354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4354)
* **tooltip:** fix hiding when hover popover ([#4418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4418)) ([a6b5901](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6b5901)), closes [#4417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4417)
* **tree-select:** click label behavior is incorrect in strict mode ([#4424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4424)) ([7a11124](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a11124)), closes [#4422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4422)


## 8.5.0
`2019-11-08`

### Bug Fixes

* **auto-complete:** default value not selected ([#4366](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4366)) ([09f1ec6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f1ec6)), closes [#4362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4362)
* **date-picker:** `nzDefaultOpenValue` not work in time panel ([#4357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4357)) ([dfa3d39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dfa3d39)), closes [#4331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4331)
* **date-picker:** animation start after overlay open ([#4315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4315)) ([931fd48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/931fd48))
* **mention:** unable to select on mobile device ([#4309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4309)) ([1be6d51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1be6d51)), closes [#4281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4281)
* **modal:** `nzMaskClosable` not working in the confirm mode ([#4347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4347)) ([475bbc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/475bbc4)), closes [#4344](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4344)
* **page-header:** has footer or breadcrumb style bug ([#4363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4363)) ([dcc7deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcc7deb))
* **pagination:** replace full-width character with half-width ([#4371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4371)) ([cc3868e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc3868e))
* **select:** prevent hidden options from being selected ([#4382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4382)) ([cf22133](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf22133)), closes [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377) [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377)
* **table:** support nzWidthConfig null undefined value ([#4342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4342)) ([761e8e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/761e8e0))
* **tooltip:** fix not undefined value not updated ([#4392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4392)) ([2a71c43](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a71c43))
* **tooltip:** fix tooltip accessing destroyed view ([#4387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4387)) ([8e9e6a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e9e6a9)), closes [#3875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3875) [#4317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4317) [#4386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4386)
* **tree-select:** default tags incorrect in strictly mode ([#4368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4368)) ([a6547a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6547a0)), closes [#4364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4364)


### Features

* **monaco-editor:** support static loading ([#4341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4341)) ([29f732b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29f732b))
* **page-header:** add `nzGhost` property ([#4306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4306)) ([4c78cca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c78cca)), closes [#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)
* **tooltip:** support changing trigger ([#4397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4397)) ([48d7122](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d7122)), closes [#4365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4365)


## 8.4.1
`2019-10-23`

### Bug Fixes

* **core:** fix global config not working in prod mode ([#4325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4325)) ([cc9308d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc9308d)), closes [#4319](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4319)
* **drawer:** fix the HTML structure of the drawer header ([#4311](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4311)) ([5cdd5db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cdd5db)), closes [#4304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4304)
* **page-header:** fix break change on the style ([#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)) ([4c10e5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c10e5b))
* **table:** fix table nzWidth bug without the first column ([#4329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4329)) ([c6bdf15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6bdf15)), closes [#4312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4312)


## 8.4.0
`2019-10-15`

### Bug Fixes

* **tree:** fix nzHideUnMatched bug ([#4286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4286)) ([87dd59e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/87dd59e)), closes [#3970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3970)
* **tree:** update when property isLeaf is changed ([#4289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4289)) ([4b90577](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4b90577)), closes [#4037](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4037)
* **auto-complete:** not emit changes when retype same value while open ([#4215](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4215)) ([21e91e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21e91e3))
* **i18n:** update and add translations for de_DE ([#4239](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4239)) ([f819fad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f819fad))
* **pagination:** add space between page size and slash ([#4038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4038)) ([#4039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4039)) ([b1bba9e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1bba9e))
* **select:** fix select dropdown position error ([#4267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4267)) ([0ccc62a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0ccc62a)), closes [#3855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3855)
* **select:** fix select focus & blur & autoFocus event ([#4270](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4270)) ([c7d90b7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c7d90b7)), closes [#3991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3991) [#3757](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3757) [#3708](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3708)
* **select:** fix select input not grow correctly in IE ([#4262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4262)) ([9be58d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9be58d9)), closes [#2427](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2427) [#3907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3907)
* **select:** fix select scroll bottom not emit with search ([#4272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4272)) ([e9c5541](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e9c5541)), closes [#3777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3777)
* **table:** fix table fixed style when nzData change ([#4274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4274)) ([b33533c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b33533c)), closes [#4253](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4253)
* **tag:** nzNoAnimation not working ([#4257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4257)) ([63f947e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/63f947e)), closes [#4244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4244)
* **time-picker:** add null input judgement when using datefns ([#4283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4283)) ([a05bc02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a05bc02)), closes [#3854](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3854)
* **tooltip:** fix properties updated before origin is set ([#4229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4229)) ([b2b9c13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2b9c13)), closes [#4250](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4250)
* **tooltip:** fix tooltip component not destory ([#4291](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4291)) ([05cbd9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05cbd9f)), closes [#4103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4103)


### Features

* **breadcrumb:** add `nzRouteLabel` property ([#4167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4167)) ([34a8b0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/34a8b0a))
* **cascader:** support option render template ([#4127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4127)) ([8345c54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8345c54)), closes [#3699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3699)
* **mention:** support for adaptive boundary ([#4263](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4263)) ([812e1c5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/812e1c5)), closes [#4260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4260)
* **page-header:** new pageheader style and support avatar ([#4208](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4208)) ([c2fc616](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2fc616))
* **select:** support default value not in the option list ([#4261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4261)) ([51b26b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51b26b4)), closes [#3672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3672) [#4000](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4000)
* **spin:** support global indicator ([#4221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4221)) ([a7ecb8b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7ecb8b)), closes [#2792](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2792)
* **table:** support extra panel with nz-th-extra selector ([#4277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4277)) ([cd8d0f5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd8d0f5))
* **table:** support td break-word display ([#4273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4273)) ([93ab305](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93ab305))
* **tree-select:** support `nzCheckStrictly` property ([#4149](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4149)) ([1f8cf1d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f8cf1d)), closes [#4120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4120)


### Performance Improvements

* **tree:** change the collapsed of the treeNode to ngIf ([#3947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3947)) ([cbfc5ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbfc5ed))
* **typography, tabs:** make the `destroy$` complete when destroy ([#4271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4271)) ([51f4713](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51f4713))



## 8.3.1
`2019-09-24`

### Bug Fixes

* **affix:** fix affix not working in some browsers ([#4161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4161)) ([d9bf4af](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d9bf4af)), closes [#4070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4070)
* **core:** fix HTML entities highlight error ([#4162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4162)) ([2665762](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2665762)), closes [#4152](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4152)
* **date-picker:** optimized interaction by using input box ([#4146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4146)) ([f0ddb79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0ddb79))
* **i18n:** add fallback mechanism ([#4163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4163)) ([9f87b77](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f87b77))
* **i18n:** added property missing in Arabic ([#4165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4165)) ([36a5ebb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36a5ebb))
* **progress:** fix circle gradient not sorted ([#4178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4178)) ([7d37b1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d37b1c))
* **select:** fix select compareWith array not work ([#4140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4140)) ([2b4776d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b4776d)), closes [#4139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4139)
* **steps:** fix progress dot in vertical mode ([#4193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4193)) ([50b86be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50b86be)), closes [#4184](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4184)
* **table:** fix nzWidthConfig conflict with nzWidth ([#4141](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4141)) ([a9900ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9900ed)), closes [#4083](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4083) [#4142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4142)
* **time-picker:** place ViewChild decorator on correct f… ([#4156](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4156)) ([b0ed836](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b0ed836))

## 8.3.0
`2019-09-09`

### Bug Fixes

* **cascader:** support falsy value expect for undefined and null ([#4119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4119)) ([0cb44ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cb44ac)), closes [#4110](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4110)
* **editor:** fix type any ([#4105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4105)) ([bd720fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bd720fb)), closes [#4099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4099)
* **i18n:** fix i18n interface and Traditional Chinese ([#4102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4102)) ([bb9e89f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb9e89f)), closes [#4080](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4080)
* **i18n:** fix Russian i18n file ([f267bdd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f267bdd))
* **i18n:** missing catalan translations added ([#4116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4116)) ([c530c74](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c530c74))
* **tabs:** fix selected index not updated ([#4094](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4094)) ([1e76e37](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e76e37)), closes [#3873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3873)


### Features

* ***:** support global config ([#3613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3613)) ([6eb041a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6eb041a))
* **i18n:** support for Romanian locale ([#4068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4068)) ([207e178](https://github.com/NG-ZORRO/ng-zorro-antd/commit/207e178))
* **modal:** support for custom close icons ([#4072](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4072)) ([06b895e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/06b895e))
* **progress:** support nzTooltipPlacement ([#4007](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4007)) ([d6a2968](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6a2968))
* **steps:** support navigation type and nzDisable nzSubtitle ([#4064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4064)) ([272dc98](https://github.com/NG-ZORRO/ng-zorro-antd/commit/272dc98)), closes [#3931](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3931)


### Performance Improvements

* **resizable:** listen document events when resizing start ([#4021](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4021)) ([66afcf0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/66afcf0))


## 8.2.1
`2019-08-26`

### Bug Fixes

* **cascader:** fix column is not dropped in hover mode ([#3916](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3916)) ([906849b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/906849b))
* **code-editor:** fix destroying error when editor is not initialized ([#4002](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4002)) ([a35fb09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb09))
* **code-editor:** remove overflow styles ([#4016](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4016)) ([ab832d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab832d9))
* **descriptions:** fix colspan calcuation in horizontal bordered ([#4014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4014)) ([345712f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/345712f))
* **table:** fix border-right of small size and bordered table ([#4027](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4027)) ([a3bd531](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a3bd531))
* **tabs:** fix tabs still shows when no route is matched ([#4034](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4034)) ([7ca0a52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ca0a52))


## 8.2.0
`2019-08-13`

### Bug Fixes

* **badge:** fix init animations ([#3925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3925)) ([353c95b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/353c95b)), closes [#3686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3686)
* **date-picker:** keep the time value while clicking date ([#3911](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3911)) ([9499aec](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9499aec))
* **date-picker:** open on enter and focus on inner input ([#3804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3804)) ([3f03ee1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f03ee1)), closes [#3146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3146)
* **date-picker:** sort range picker value when start is after end ([#3956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3956)) ([117b453](https://github.com/NG-ZORRO/ng-zorro-antd/commit/117b453)), closes [#3940](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3940) [#1642](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1642)
* **message:** fix container instance not destroyed in HMR ([#3859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3859)) ([07e86a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07e86a5))
* **table:** fix nzWidthConfig in nzTemplateMode ([#3958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3958)) ([baab74b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baab74b)), closes [#3957](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3957)
* **tooltip:** empty judgement ([#3993](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3993)) ([a853e96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a853e96)), closes [#3909](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3909)


### Features

* **avatar:** support image load error event ([#3893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3893)) ([ab4bcbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab4bcbe)), closes [#3223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3223)
* **badge:** support nzTitle and nzOffset property ([#3977](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3977)) ([ffb7219](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffb7219))
* **code-editor:** add code editor component ([#3706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3706)) ([df78b2e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df78b2e))
* **descriptions:** add nzColon to toggle colon ([#3923](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3923)) ([8e95cb1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e95cb1))
* **drawer:** support `nzKeyboard` property ([#3896](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3896)) ([38062fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/38062fb))
* **i18n:** support Malay and Tamil language ([#3924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3924)) ([b87f1fe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b87f1fe))
* **page-header:** add default behavior for the back button ([#3891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3891)) ([41bc285](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41bc285)), closes [#3421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3421)
* **resizable:** add resizable component ([#3771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3771)) ([5e71739](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e71739)), closes [#3701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3701)
* **statistics:** countdown support finish event ([#3902](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3902)) ([9ea40da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ea40da))
* **steps:** support for clickable steps ([#3934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3934)) ([ac866ce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac866ce))
* **tabs:** add router exact active parameter ([#3862](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3862)) ([6b13faf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b13faf)), closes [#3858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3858)
* **timeline:** add gray as a default color ([#3922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3922)) ([f889f34](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f889f34))
* **schematics:**  use the project's style extension ([#3930](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3930)) ([84b0355](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84b0355))

## 8.1.2
`2019-07-29`

### Bug Fixes

* **slider:** change mark style in horizontal mode ([#3879](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3879)) ([e6a6221](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e6a6221)), closes [#3876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3876)
* **tree-select:** should not close when the selectable is false ([#3843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3843)) ([329ec22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/329ec22)), closes [#3833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3833)
* **schematics:** fix template files suffix ([#3884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3884)) ([5b4714f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b4714f))



## 8.1.1
`2019-07-29`

### Bug Fixes

* **all:** import PlatformModule when use platform in component ([#3823](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3823)) ([6ec85a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ec85a4))
* **dropdown:** hide backdrop when disabled and restore escape ([#3831](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3831)) ([b758572](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b758572)), closes [#3835](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3835)
* **form:** fix form feedback error when init with tips ([#3868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3868)) ([7c0aa51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0aa51)), closes [#3865](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3865)
* **select:** fix select with tokenization bug ([#3869](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3869)) ([fa462c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa462c7)), closes [#3825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3825)
* **table:** fix table small sticky style ([#3849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3849)) ([c4de8ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4de8ff))
* **tabs:** fix the pagnation padding-right when scrolling ([#3539](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3539)) ([#3709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3709)) ([9a4df38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a4df38))
* **tooltip:** fix position change not set back ([#3857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3857)) ([3dbb6dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3dbb6dc))
* **schematics:** fix parse module name error ([#3848](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3848)) ([d4e7210](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4e7210)), closes [#3844](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3844)
* **schematics:** update copy-resources script to support Windows path ([#3856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3856)) ([915b67d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/915b67d))


## 8.1.0
`2019-07-19`

### Bug Fixes

* **date-picker:** missing nzUse12Hours binding ([#3781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3781)) ([feae069](https://github.com/NG-ZORRO/ng-zorro-antd/commit/feae069))
* **descriptions:** fix changes to inputs of children not working ([#3798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3798)) ([3c65697](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c65697)), closes [#3795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3795)
* **descriptions:** fix span calculation ([#3799](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3799)) ([aaa5852](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aaa5852))
* **message:** fix lazy load problem ([#3797](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3797)) ([679fdea](https://github.com/NG-ZORRO/ng-zorro-antd/commit/679fdea)), closes [#3794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3794)
* **modal:** buttons cannot disable when confirm mode ([#3707](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3707)) ([3847250](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3847250)), closes [#3679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3679)
* **page-header:** fix page-header style break change ([#3803](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3803)) ([39d1f45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39d1f45))
* **select:** fix single selection choice content display issues ([#3802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3802)) ([4dd93e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4dd93e6)), closes [#3710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3710)
* **table:** fix table header scroll when fixed change ([#3806](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3806)) ([0677540](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0677540))
* **table:** fix table scrollbar bug ([#3801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3801)) ([7e00e52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e00e52)), closes [#3796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3796)
* **tree:** unexpected disappear of tree-node ([#3748](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3748)) ([1ff176e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ff176e)), closes [#3739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3739)


### Features

* **dropdown:** allow backdrop to be disabled ([#3769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3769)) ([cb51069](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb51069))
* **i18n:** add locale files ([#3818](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3818)) ([7eac09e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7eac09e))
* **modal:** support use directive to define the footer ([#3036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3036)) ([f022a0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f022a0f)), closes [#3035](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3035)
* **result:** add component ([#3731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3731)) ([eb6377e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb6377e)), closes [#2759](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2759)
* **tabs:** support link router ([#3718](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3718)) ([ab8a58c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab8a58c))
* **tree-select:** add `[nzHideUnMatched]` property ([#3729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3729)) ([3a3b33a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a3b33a)), closes [#3527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3527)


## 8.0.3
`2019-07-14`

### Bug Fixes

* **dropdown:** fix dropdown contextmenu ([#3782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3782)) ([cce920d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cce920d)), closes [#3768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3768)
* **input:** fix input disabled OnPush ([#3786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3786)) ([dd81155](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd81155)), closes [#3732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3732)
* **menu:** fix menu nzMatchRouter in nested menu ([#3785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3785)) ([eb5d544](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb5d544)), closes [#3736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3736)
* **switch:** fix switch ViewChild static ([#3784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3784)) ([f59d79f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f59d79f)), closes [#3760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3760)
* **table:** fix table custom filter panel ([#3787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3787)) ([b9a7267](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b9a7267)), closes [#3721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3721)


## 8.0.2
`2019-07-03`

Fix the dependencies version ranges.


## 8.0.1
`2019-07-01`

### Bug Fixes

* **tree:** fix warning bug ([#3692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3692)) ([637c334](https://github.com/NG-ZORRO/ng-zorro-antd/commit/637c334))
* **breadcrumb:** fix warning startWith operators ([fe28a0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe28a0d))
* **schematics:** missing routing module in sidemenu template ([#3695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3695)) ([fdcef82](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdcef82))


## 8.0.0
`2019-06-29`

### Intro

Welcome to `ng-zorro-antd` 8.0.0. After upgrading to the latest version, developers can not only enjoy the latest version of Angular, but also get the latest features and better performance.

You need to update your Angular to `^8.0.0` before update. Some `ng-zorro-antd` APIs are deprecated in version 8.0.0, and all deprecated APIs will still be supported until 9.0.0, which means that version 8.0.0 is fully **compatible** with version 7.0.0. Developers can get detailed tips on deprecated APIs in the development environment (prompts will not appear in production environments) and have plenty of time to fix these usages before 9.0.0 is released.

* New Typography Component, which provides basic formatting and common operations for text.

* Support admin template when run `ng add ng-zorro-antd`, more info can be found in [Schematics](https://ng.ant.design/docs/schematics/en) part.

* The Form Component has been fully enhanced, developers only needs to pass in the error tips.

```html
<nz-form-control nzErrorTip="Please input your username!">
  <nz-input-group [nzPrefix]="prefixUser">
    <input formControlName="userName" nz-input placeholder="Username" />
  </nz-input-group>
</nz-form-control>

```

* There is no need to wrap the dropdown directive with `nz-dropdown` now.

```html
<a nz-dropdown [nzDropdownMenu]="menu">Hover me</a>
<nz-dropdown-menu #menu="nzDropdownMenu">
  <ul nz-menu>
    <li nz-menu-item>1st menu item</li>
    <li nz-menu-item>2nd menu item</li>
    <li nz-menu-item>3rd menu item</li>
  </ul>
</nz-dropdown-menu>
```

* Menu support automatic highlighting based on routing.

```html
<ul nz-menu nzMode="horizontal">
  <li nz-menu-item nzMatchRouter>
    <a [routerLink]="['/', 'welcome']">Welcome</a>
  </li>
</ul>
```

### Angular Update Guide

It is recommended to upgrade according to the [Angular Update Guide](https://update.angular.io/#7.0:8.0) prompt. The following questions may require additional attention:

* The usage of `ViewChild` and `ContentChild` has changed. Ref [Static Query Migration Guide](https://angular.io/guide/static-query-migration).
* The usage of lazy load has changed. Ref [loadChildren string synatx](https://angular.io/guide/deprecations#loadchildren-string-syntax).
* New `Differential Loading` feature. Ref [Differential Loading](https://angular.io/guide/deployment#differential-loading).

### Features

* **avatar:** add nzSrcSet & nzAlt properites ([#3583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3583)) ([d0ad5e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0ad5e8)), closes [#3543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3543)
* **breadcrumb:** support dropdown ([#3636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3636)) ([9dfab45](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9dfab45))
* **carousel:** support dot position ([#3575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3575)) ([0566331](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0566331))
* **core:** add universal logger funcs and deprecation warnings ([#3538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3538)) ([b893520](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b893520))
* **form:** refactor form to support better template driven ([10d0e28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10d0e28))
* **input-number:** support nzId ([a6500c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6500c8))
* **menu:** support auto active menu-item via routerLink ([c9e84c7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9e84c7))
* **menu:** support nzTitle & nzIcon in nz-submenu ([0cde4d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0cde4d7))
* **pagination:** support pagination nzDisabled ([141bef8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/141bef8))
* **select:** support custom template in select component ([#3071](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3071)) ([aad02a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aad02a5)), closes [#2946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2946)
* **table:** support nzVirtualForTrackBy ([cb14096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb14096))
* **transfer:** add nzShowSelectAll & nzRenderList properties ([#3588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3588)) ([1619f30](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1619f30)), closes [#3567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3567) [#2870](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2870)
* **typography:** add typography component ([#3119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3119)) ([4d739ef](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d739ef))
* **schematics:** add template option in `ng-add` ([#3674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3674)) ([69072de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69072de))

### Bug Fixes

* **button:** fix order of DOM nodes in button ([#3578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3578)) ([c3df8b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3df8b5)), closes [#3079](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079)
* **card:** fix card tab ng-template ([#3654](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3654)) ([7585ba4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7585ba4))
* **descriptions:** fix warning without logger ([#3663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3663)) ([5826fc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5826fc1))
* **dropdown:** dropdown should close when set disabled ([0bd1ae3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bd1ae3)), closes [#3420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3420)
* **dropdown:** fix dropdown change after checked bug ([16d5c2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/16d5c2d))
* **dropdown:** fix dropdown SSR bug ([#3628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3628)) ([ade1abd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ade1abd))
* **form:** fix form control validate with formControl ([bc54e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc54e90)), closes [#3551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3551)
* **form:** fix form overlap ([#3633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3633)) ([0fc7d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fc7d05)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
* **form:** fix nzValidateStatus & nzHasFeedback overlap ([fb4965b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb4965b)), closes [#3607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3607)
* **grid:** Make all properties in EmbeddedProperty optional ([#3473](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3473)) ([107e731](https://github.com/NG-ZORRO/ng-zorro-antd/commit/107e731))
* **input:** fix ng-content nzAddOnBeforeIcon transclusion ([#3597](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3597)) ([a37ec0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a37ec0a)), closes [#3596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3596)
* **mention:** fix cannot to switch trigger ([#3632](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3632)) ([c8b5b09](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8b5b09)), closes [#3629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3629)
* **menu:** fix menu title ExpressionChangedAfterItHasBeenCheckedError ([52975ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/52975ff)), closes [#3023](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3023)
* **menu:** fix submenu not active when collapsed ([67f6fa2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67f6fa2)), closes [#3345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3345)
* **pagination:** fix pagination nzTotal 0 bug ([#3651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3651)) ([d28fc49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d28fc49)), closes [#3648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3648)
* **select:** fix nzOpen state when nzOnSearch trigger ([3ca816d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ca816d)), closes [#3626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3626)
* **select:** fix select enter open when disabled ([36db36c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36db36c)), closes [#3408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3408)
* **select:** fix the bug of duplication when keyboard input chinese char ([#3440](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3440)) ([3c82f26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c82f26)), closes [#3439](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3439)
* **table:** compatible with @angular/material/table ([79b02ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79b02ca))
* **table:** fix sortChange with dynamic columns ([#3603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3603)) ([#3605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3605)) ([c85743d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c85743d))
* **typography:** fix the actions button order ([#3677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3677)) ([c2c28a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2c28a4))
* **typography:** not render when the edit text has no changes ([51b9ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51b9ce0))


---

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
