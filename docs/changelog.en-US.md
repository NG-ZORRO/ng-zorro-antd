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

## 9.2.1

`2020-06-17`

### Bug Fixes

* **i18n:** some locales compiles error ([#5445](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5445)) ([e9ef9f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e9ef9f3))


## 9.2.0

`2020-06-16`

### Bug Fixes

* **affix,anchor:** wrong value is set when the initial value is non-number ([#5277](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5277)) ([1c72939](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c72939))
* **tree:** fix `nzCheckStrictly` and selected keys bug ([#5431](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5431)) ([67d9dd0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67d9dd0)), closes [#5385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5385) [#5195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5195) [#5068](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5068)
* **badge:** fix parent component use onpush nzCount not show ([#5275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5275)) ([d1f0321](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d1f0321))
* **button:** fix button init loading status ([#5404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5404)) ([c764c67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c764c67)), closes [#5392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5392)
* **date-picker:** get input width before panel open ([#5357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5357)) ([39a6c28](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39a6c28))
* **drawer:** don't prevent events when nzMask is false ([#5438](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5438)) ([abe9e53](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abe9e53)), closes [#5350](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5350)
* **dropdown:** fix dropdown disabled button ([#5429](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5429)) ([797c65d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/797c65d)), closes [#5258](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5258)
* **grid:** fix gutter zero ([#5436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5436)) ([80a4709](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a4709)), closes [#5435](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5435)
* **input:** fix input missing attr disabled ([#5315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5315)) ([2b17df2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b17df2))
* **input:** fix reactive form disabled input-group style ([#5428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5428)) ([6d403e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6d403e3)), closes [#5137](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5137)
* **input:** support reactive form disabled ([#5316](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5316)) ([8270009](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8270009))
* **menu:** fix menu group ng-template error ([#5409](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5409)) ([d0c36d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0c36d6)), closes [#5363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5363)
* **message:** fix style not changed when property changes ([#5323](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5323)) ([896f283](https://github.com/NG-ZORRO/ng-zorro-antd/commit/896f283)), closes [#5301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5301)
* **modal:** modal will close when clicking the scrollbar ([#5377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5377)) ([e95d404](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e95d404)), closes [#5376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5376)
* **modal:** `nzAutofocus` doesn't work correctly ([#5313](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5313)) ([7ad64b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ad64b8))
* **modal:** some cases there is no changes detected ([#5332](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5332)) ([ade6198](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ade6198)), closes [#5328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5328) [#5287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5287) [#5259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5259) [#3743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3743)
* **notification:** fix notification template not updated ([#5382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5382)) ([7217097](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7217097)), closes [#4787](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4787)
* **page-header:** add compact style ([#5241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5241)) ([74fa3d6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74fa3d6))
* **radio:** fix radio focus ([#5424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5424)) ([6e0f47b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e0f47b)), closes [#5285](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5285)
* **select:** fix group label search ([#5407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5407)) ([7e1b5a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e1b5a7)), closes [#5276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5276)
* **select:** fix select autofocus behavior ([#5420](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5420)) ([8617e58](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8617e58)), closes [#5381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5381)
* **select:** fix select `nzCustomContent` render ([#5425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5425)) ([f99d7ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f99d7ff)), closes [#5178](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5178)
* **select:** fix tag mode wrong value with keydown ([#5432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5432)) ([fe5419b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe5419b)), closes [#5220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5220)
* **table:** fix `ExpressionChangedAfterError` of nzRight and nzLeft ([#5240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5240)) ([dc8c7e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc8c7e7)), closes [#5238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5238)
* **table:** fix table colspan & empty data style ([#5417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5417)) ([2eda6d3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2eda6d3)), closes [#5410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5410)
* **table:** fix table nzWidth not work with scroll ([#5437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5437)) ([c1e7e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1e7e9f)), closes [#5370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5370) [#5324](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5324) [#5318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5318) [#5309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5309) [#5167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5167) [#5160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5160)
* **table:** fix table sort default value change ([#5433](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5433)) ([26469c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/26469c8)), closes [#5262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5262)
* **table:** fix th `nzChecked` supersedes `nzShowCheckbox` ([#5419](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5419)) ([6f5b935](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f5b935)), closes [#5388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5388)


### Features

* **calendar:** support `nzDisabledDate` of calendar ([#5295](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5295)) ([aabd17e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aabd17e))
* **input-number:** support inputmode ([#5423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5423)) ([cdca7bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdca7bc)), closes [#5341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5341)
* **select:** support `nzBorderless` in global config ([#5434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5434)) ([459bdb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/459bdb0)), closes [#5224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5224)
* **slider:** add `nzReverse` property ([#5268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5268)) ([67275d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67275d2)), closes [#4937](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4937)
* **table:** support the generic type of data ([#5369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5369)) ([182e790](https://github.com/NG-ZORRO/ng-zorro-antd/commit/182e790))
* **typography:** support `nzOnEllipsis` output ([#5297](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5297)) ([2200063](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2200063))
* **upload:** add `nzFileListRender` property ([#5204](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5204)) ([ce5574a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ce5574a)), closes [#4875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4875)



<a name="9.1.2"></a>
## 9.1.2

`2020-05-13`

### Bug Fixes

* **all:** type errors with strictTemplates ([#5265](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5265)) ([2982766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2982766)), closes [#5171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5171)
* **list:** empty content is always rendered ([#5266](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5266)) ([ca7314c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca7314c)), closes [#5260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5260)
* **select:** option item not selected with falsy value ([#5264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5264)) ([1c4d7d8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c4d7d8))


## 9.1.1

`2020-05-11`

### Bug Fixes

* **auto-complete, drawer:** cannot reopen when reuse route snapshots([#5165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5165)) ([7101782](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7101782)), closes [#5142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5142)
* ***:** fix dependeny components' file import ([#5192](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5192)) ([619743d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/619743d)), closes [#5185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5185)
* ***:** fix template types check ([#4994](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4994)) ([c2b68dd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2b68dd))
* **alert:** `nzNoAnimation` not work with the alert component ([#5211](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5211)) ([de9ef6b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/de9ef6b))
* **breadcrumb:** fix breadcrumb when Routes path='' ([#4966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4966)) ([5ffa45c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ffa45c))
* **button:** disabled not work with anchor ([#5233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5233)) ([36ab993](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36ab993)), closes [#5226](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5226)
* **dropdown:** fix dropdown break SSR ([#5244](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5244)) ([016cca1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/016cca1)), closes [#5186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5186)
* **modal:** global config cannot work with service mode ([#5228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5228)) ([95aab9a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/95aab9a)), closes [#5223](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5223)
* **modal:** modal cannot close after the host view destroyed ([#5161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5161)) ([5cb618e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cb618e)), closes [#5128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5128)
* **modal:** rollback to component types can be the content of confirm-mode ([#5177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5177)) ([5fa4c1e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5fa4c1e)), closes [#5172](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5172)
* **schematics:** invalid version will be added when the package already exists ([#5210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5210)) ([f406803](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f406803)), closes [#5209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5209)
* **table:** fix table expand in multiple thead tr ([#5246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5246)) ([cbaeb38](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbaeb38)), closes [#5207](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5207)
* **timeline:** fix timeline check error ([#5245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5245)) ([ee2859f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee2859f)), closes [#5230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5230)
* **typography:** ellipsis line measurement error ([#5175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5175)) ([93676c9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/93676c9))
* **upload:** fix invalid preview image in picture card ([#5205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5205)) ([cbe8225](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cbe8225)), closes [#5201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5201)

## 9.1.0

`2020-04-26`

### Features

* **date-picker, time-picker:** support custom suffix icon ([#5072](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5072)) ([8b660bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8b660bd))
* **autocomplete:** support values whit object type ([#4996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4996)) ([4bfbbf7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4bfbbf7)), closes [#4981](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4981)
* **select:** support global config nzSuffixIcon ([#5092](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5092)) ([ad847e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad847e7))
* **select:** support input nzOptions in select ([#5109](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5109)) ([251a064](https://github.com/NG-ZORRO/ng-zorro-antd/commit/251a064)), closes [#5106](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5106)
* **select:** support option height and opiton overflow size ([#5133](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5133)) ([7b3937e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7b3937e)), closes [#5112](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5112)


### Bug Fixes

* **auto-complete:** dropdown position error with group-input ([#5157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5157)) ([5b26479](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5b26479))
* **cascader:** fix cascader position ([#5148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5148)) ([7870e67](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7870e67)), closes [#5102](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5102)
* **date-picker:** set formControl disabled not work ([#5126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5126)) ([b83e7b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b83e7b5)), closes [#5118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5118)
* **date-picker,time-picker:** clicking host to open panel ([#5105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5105)) ([7c938b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c938b4)), closes [#5073](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5073)
* **description:** fix description not accept TemplateRef ([#5139](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5139)) ([90d2ec5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90d2ec5)), closes [#5127](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5127)
* **form:** the setStatus needs to call again on tips changes ([#5144](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5144)) ([a08d4da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a08d4da)), closes [#5129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5129)
* **menu:** fix menu matchRouter not work ([#5095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5095)) ([2724b9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2724b9b))
* **menu:** fix submenu scrollable ([#5155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5155)) ([fb52f21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb52f21)), closes [#4837](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4837)
* **message:** fix message remove error when no container ([#5123](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5123)) ([1eca795](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1eca795)), closes [#5121](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5121)
* **modal:** `NoopAnimations` do not work with modal mask ([#5103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5103)) ([d7625db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7625db)), closes [#5093](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5093)
* **notification:** fix global config nzPlacement not working ([#5140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5140)) ([1ce1634](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ce1634)), closes [#5135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5135)
* **progress:** fix nzFormat not shown status is exception ([#5136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5136)) ([654411e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/654411e)), closes [#5130](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5130)
* **select:** fix ie11 select search input ([#5117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5117)) ([83cdc84](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83cdc84)), closes [#5110](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5110)
* **select:** fix virtual scroll hover bug ([#5131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5131)) ([d69415a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d69415a)), closes [#5120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5120) [#5116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5116)
* **space:** fix config name ([#5147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5147)) ([64f772d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64f772d))
* **table:** remove table nzQueryParams debounceTime ([#5132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5132)) ([07a9d34](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07a9d34)), closes [#5113](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5113)
* **time-picker:** allow undefined or null input ([#5104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5104)) ([d0b40ce](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0b40ce)), closes [#5100](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5100)
* **tooltip:** fix title not updated to component ([#5097](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5097)) ([1123281](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1123281)), closes [#5087](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5087)
* backward-compatible with the previous rendering engine ([#5090](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5090)) ([b61a914](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b61a914)), closes [#5088](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5088)




## 9.0.2

`2020-04-20`

### Bug Fixes

* **all:** fix enableIvy:false with ng-zorro-antd ([#5081](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5081)) ([83b554e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83b554e)), closes [#5070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5070)
* **button:** fix button type definition ([#5085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5085)) ([62584de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62584de)), closes [#5026](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5026)
* **form:** modify to subscribe to the parent component input ([#4524](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4524)) ([565b530](https://github.com/NG-ZORRO/ng-zorro-antd/commit/565b530)), closes [#4554](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4554)
* **input:** fix input group missing focus and disabled ([#5082](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5082)) ([5ff38be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ff38be)), closes [#5064](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5064)
* **popover:** fix programmatically changing not trigger ngModelChange ([#5053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5053)) ([dbc2cd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dbc2cd3))
* **select:** fix nzDropdownMatchSelectWidth not work ([#5066](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5066)) ([d210f4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d210f4d)), closes [#5058](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5058)
* **select:** options overflow content cannot be hidden ([#5057](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5057)) ([867dc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/867dc87)), closes [#5047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5047)
* **select:** wrong sort in group option ([#5063](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5063)) ([af39d5f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af39d5f))
* **build:** ngcc errors caused by overlapping entry-points ([#5055](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5055)) ([7bc8279](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7bc8279)), closes [#5045](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5045)


## 9.0.0

`2020-04-15`

### Intro

Welcome to the `9.0.0` version of `ng-zorro-antd`,some APIs were deprecated in version 8.x, and warning message was given under dev mode. All deprecated APIs is removed in 9.0.0, if you have fixed all warnings in the 8.x version, you can follow these steps to upgrade your version.

#### Before upgrade

1. Make sure `Node.js` >= `10.13`
2. Create a new branch, or use other methods to back up the current project
3. delete the package-lock.json file

#### Upgrade dependencies

- Upgrade Angular to 9.x version, ref https://update.angular.io/
- Run `ng update @angular/cdk`, if you have used `@angular/cdk`.
- if you have used `date-fns` in your project, upgrade it to `2.x` version, ref https://github.com/date-fns/date-fns-upgrade.
- if you have used `monaco-editor` please upgrade it to `0.2.x`, don't forget to upgrade `monaco-editor-webpack-plugin` to `1.9.x` if you have used it.

#### Upgrade NG-ZORRO

- Run `ng update ng-zorro-antd`
- If a warning message appears in the console, follow the prompts to modify the corresponding code

#### date-fns update

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

**Note: `NZ_DATE_FNS_COMPATIBLE` won't be kept for too long, we will remove the support for `date-fns` v1 format until ` ng-zorro-antd` v10**, we hope you can update the `date-fns` date format in time. For `date-fns` upgrade guide, see [here](https://github.com/date-fns/date-fns-upgrade).


#### Angular Ivy Supported

We have upgraded the `@angular/*` and `@angular/cdk` versions to v9, and now you can use the Ivy rendering engine to run your project, and enable the `strictTemplates` option to use more strict template type checking.

More help go to [Angular Ivy](https://angular.io/guide/ivy) and [Template type](https://angular.io/guide/template-typecheck) checking.

#### Ant Design 4 Spec

We have synced the Ant Design 4 design specification and support the Dark and Compact themes.


#### Enhanced Performance and Usability

- In previous versions, the Table component has integrated virtual scrolling, also now supported for Select and Tree components.
- Form and Table simplify usage and now allow for writing fewer templates and configurations.
- Allow adding icons in sub-modules to reduce the first screen load time.
- Now, the pop-up menu is automatically closed when the route is changed, and corresponding options have been added for components such as Modal.

### Features

* **breadcrumb:** support indenpendent separator ([#4713](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4713)) ([1f490e9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f490e9))
* **collapse:** support nzExpandIconPosition ([#4781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4781)) ([760512a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/760512a))
* **grid:** support nzFlex and nzGutter array, deprecated nzType ([c4d2694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c4d2694))
* **icon:** support add icon in feat modules ([#4711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4711)) ([0bcd2a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0bcd2a9))
* **input:** support textarea with clear icon ([0af9242](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0af9242)), closes [#4623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4623)
* **page-header:** add `nzGhost` property ([#4306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4306)) ([4c78cca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c78cca)), closes [#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)
* **select:** refactor the select to support virutal scroll ([40daee9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40daee9)), closes [#4585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4585) [#3497](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3497)
* **skeleton:** add nz-skeleton-element ([#4859](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4859)) ([8dc2ff3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8dc2ff3))
* **tabs:** add  nzCanDeactivate hook ([#4476](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4476)) ([a533980](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a533980)), closes [#4432](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4432)
* **tag:** support status colors ([#4628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4628)) ([aa22c0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa22c0f)), closes [#4622](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4622) [#4413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4413)
* **tree-select:** support `nzDropdownClassName` property ([#4552](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4552)) ([df8c125](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df8c125)), closes [#4508](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4508)
* **typography:** support `nzSuffix` property ([#4629](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4629)) ([ca02a07](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca02a07)), closes [#4620](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4620)
* **space:** add new component ([#4928](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4928)) ([df01bd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/df01bd1)), closes [#4913](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4913)
* **table:** support new nzQueryParams ([#4970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4970)) ([79ea999](https://github.com/NG-ZORRO/ng-zorro-antd/commit/79ea999))
* **tree:** support virtual scroll ([#4979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4979)) ([6803a92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6803a92)), closes [#4426](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4426) [#3808](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3808) [#3436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3436) [#2680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2680) [#1771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1771)
* **form:**
    - support auto error tips ([#4888](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4888)) ([0b85483](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0b85483)), closes [#4523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4523)
    - reactive form support warning status ([#4891](https://github.com/NG-ZORRO/ng-zorro-antd/pull/4891))([b1873da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1873da)) , close [#4525](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4525)
* **date-picker:**
    - add some inputs ([#4843](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4843)) ([af4051e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4051e))
    - support parse input value ([#4833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4833)) ([6a523ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a523ba)), closes [#4028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4028) [#3976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3976) [#2492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2492) [#4101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4101)
* **i18n:**
    - support for Armenian ([#4611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4611)) ([038691f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/038691f))
    - support for Georgian locale ([#4491](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4491)) ([d96ebe0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d96ebe0))
* **input-number:**
    - support nzPrecisionMode mode ([#4185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4185)) ([bfe089f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bfe089f)), closes [#4173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4173)
    - trigger ngModelChange at once ([#4769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4769)) ([299ba6d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/299ba6d)), closes [#3039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3039) [#3773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3773)
* **menu:**
    - auto nzInlineCollapsed when sider collapsed ([51fbf5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51fbf5e)), closes [#4680](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4680)
    - menu with nzMatchRouter work with CanDeactivate ([7560563](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7560563)), closes [#4407](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4407)
* **code-editor:**
    - support static loading ([#4341](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4341)) ([29f732b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29f732b))
    - upgrade monaco to 0.20.0 and update interfaces ([#4984](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4984)) ([3963ad1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3963ad1))
* **notification:**
    - add close icon prop ([#4495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4495)) ([80a0b26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a0b26)), closes [#4494](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4494)
    - add onClick observable ([#4989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4989)) ([9224240](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9224240)), closes [#4986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4986)
* **pagination:**
    - nzItemRender support prev_5 and next_5 ([#4754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4754)) ([41c4860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/41c4860))
    - add auto resize ([#4863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4863)) ([1bb01b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1bb01b5))
* **progress:**
    - support steps ([#4637](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4637)) ([fe8b469](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fe8b469)), closes [#4635](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4635)
    - support TemplateRef for nzFormat ([#4598](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4598)) ([edf0e9c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/edf0e9c)), closes [#4596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4596)
* **tooltip,etc:**
    - support custom origin ([#4849](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4849)) ([863fd4b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/863fd4b))
    - support changing trigger ([#4397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4397)) ([48d7122](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48d7122)), closes [#4365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4365)


### Bug Fixes

* **slider:** fix handle transform in vertical mode ([#4939](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4939)) ([6fba78d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6fba78d))
* **badge:** allow `nzTitle` set to null ([#4965](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4965)) ([a35fb5e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a35fb5e)), closes [#4776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4776)
* **list:** fix the avatar part old API ([#4952](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4952)) ([d8a2594](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d8a2594)), closes [#4912](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4912)
* **grid:** fix grid responsive bug ([#4906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4906)) ([d6828ed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6828ed))
* **breadcrumb:** fix breadcrumb link style ([#4880](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4880)) ([2553328](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2553328))
* **button:** fix button animation bug caused by angular ([9e0df2a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e0df2a)), closes [#2697](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2697)
* **cascader:** fix not showing empty when there's no options ([#4565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4565)) ([9d8d7e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d8d7e6)), closes [#4562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4562)
* **mention:** unable to select on mobile device ([#4309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4309)) ([1be6d51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1be6d51)), closes [#4281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4281)
* **menu:** fix menu overflow detection & replace ul with div ([4c8032b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c8032b)), closes [#3412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3412) [#4227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4227) [#3687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3687)
* **pagination:** replace full-width character with half-width ([#4371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4371)) ([cc3868e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc3868e))
* **timeline:** fix reverse bug ([#4690](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4690)) ([09bf8f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09bf8f4)), closes [#4509](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4509)
* **transfer:** fix transfer nzTargetKeys property ([#4670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4670)) ([31089a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31089a1)), closes [#4641](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4641) [#4360](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4360) [#4210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4210)
* **carousel:** remove vertical api ([#4376](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4376)) ([37aa921](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37aa921))
* **icon:** remove old api ([#4375](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4375)) ([91e52ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/91e52ab))
* **date-picker:**
    - click date cell not work when changing month or year ([#4876](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4876)) ([3aebe7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3aebe7c)), closes [#3499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3499)
    - `nzDefaultOpenValue` not work in time panel ([#4357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4357)) ([dfa3d39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dfa3d39)), closes [#4331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4331)
    - animation start after overlay open ([#4315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4315)) ([931fd48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/931fd48))
    - select date but nzDefaultOpenValue not work ([#4490](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4490)) ([2397819](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2397819))
* **modal:**
    - `nzModalFooter` not work when the modal open on init ([#4954](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4954)) ([2f400e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f400e8)), closes [#4948](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4948)
    - `nzMaskClosable` not working in the confirm mode ([#4347](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4347)) ([475bbc4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/475bbc4)), closes [#4344](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4344)
    - fix close button style ([#5014](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5014)) ([174099e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/174099e))
* **page-header:**
    - location inject error ([#5013](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5013)) ([9073fa5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9073fa5)), closes [#4945](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4945)
    - fix break change on the style ([#4303](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4303)) ([4c10e5b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4c10e5b))
    - has footer or breadcrumb style bug ([#4363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4363)) ([dcc7deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dcc7deb))
* **table:**
    - fix 4.1.0 style error ([#4953](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4953)) ([44f606c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44f606c))
    - fix table no data ([#4947](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4947)) ([7f7989e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f7989e))
    - `nzFilters` can is not null ([#4595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4595)) ([2c26e9f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2c26e9f))
    - fix table data type ([#4608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4608)) ([70b1440](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b1440)), closes [#4593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4593)
    - fix table nzWidth bug without the first column ([#4329](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4329)) ([c6bdf15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6bdf15)), closes [#4312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4312)
    - support nzWidthConfig null undefined value ([#4342](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4342)) ([761e8e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/761e8e0))
    - fix nzTotal in frontend pagination false ([#4922](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4922)) ([9ddc060](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ddc060)), closes [#4919](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4919)
* **time-picker:**
    - allow inputting string type ([#4949](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4949)) ([3b45a22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3b45a22)), closes [#4775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4775) [#4777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4777) [#4871](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4871) [#1679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1679)
    - ngModelChange not work ([#4944](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4944)) ([a6ecdb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6ecdb9))
    - scroll to wrong position in datepicker ([#4961](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4961)) ([cdf387f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdf387f))
* **tree:**
    - fix search case sensitivity ([#4766](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4766)) ([828b13e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/828b13e)), closes [#1996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1996) [#4765](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4765)
    - fix tree animation ([#4973](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4973)) ([70b2fc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70b2fc3))
* **empty:**
    - fix empty image style in dark mode ([#4924](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4924)) ([bae59d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bae59d7)), closes [#4921](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4921)
    - remove injection token ([#4465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4465)) ([cc8018a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc8018a))
* **select:**
    - fix select empty status ([#4907](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4907)) ([f295c10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f295c10))
    - prevent hidden options from being selected ([#4382](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4382)) ([cf22133](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf22133)), closes [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377) [#4377](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4377)
* **auto-complete:**
    - close the panel when tapping scrollb… ([#4551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4551)) ([387ebc1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/387ebc1)), closes [#4333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4333)
    - default value not selected ([#4366](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4366)) ([09f1ec6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/09f1ec6)), closes [#4362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4362)
* **calendar:**
    - correct expected class name in test ([#4369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4369)) ([12111e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/12111e5))
    - delete deprecated input nzCard ([#4464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4464)) ([aed2e7d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aed2e7d))
* **code-editor:**
    - fix config ([#4436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4436)) ([5283a32](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5283a32))
    - fix wrong initialization with diff mode ([#4485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4485)) ([#4532](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4532)) ([021cf22](https://github.com/NG-ZORRO/ng-zorro-antd/commit/021cf22))
* **drawer:**
    - content overflow when placement is top or bottom ([#4423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4423)) ([9451de5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9451de5)), closes [#4354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4354)
    - disable transition animation when placement change ([#4609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4609)) ([e539096](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e539096)), closes [#4224](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4224)
    - fix the HTML structure of the drawer header ([#4311](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4311)) ([5cdd5db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5cdd5db)), closes [#4304](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4304)
* **dropdown:**
    - fix ghost menu with contextmenu ([39487f1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/39487f1)), closes [#3971](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3971) [#4684](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4684)
    - fix menu group style in dropdown ([d928a8c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d928a8c)), closes [#4505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4505)
* **layout:**
    - fix layout demo height style ([bed60ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bed60ff)), closes [#4676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4676)
    - fix responsive sider not work ([9f951f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f951f8))
* **message,notification:**
    - remove old injection tokens ([#4404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4404)) ([f9b0e75](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f9b0e75))
    - fix message and notification error in prod ([#4884](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4884)) ([3e2f85d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e2f85d))
* **tooltip,popover,popconfirm:**
    - fix hiding when hover popover ([#4418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4418)) ([a6b5901](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6b5901)), closes [#4417](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4417)
    - fix not undefined value not updated ([#4392](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4392)) ([2a71c43](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2a71c43))
    - fix tooltip accessing destroyed view ([#4387](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4387)) ([8e9e6a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8e9e6a9)), closes [#3875](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3875) [#4317](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4317) [#4386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4386)
* **tree-select:**
    - click label behavior is incorrect in strict mode ([#4424](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4424)) ([7a11124](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7a11124)), closes [#4422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4422)
    - default tags incorrect in strictly mode ([#4368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4368)) ([a6547a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a6547a0)), closes [#4364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4364)


### Performance Improvements

* **checkbox:** use css empty selector instead of observeContent ([#4761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4761)) ([da8821a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/da8821a))
* **input:** improve input-group perf ([7af643b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7af643b)), closes [#3950](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3950)
* **radio:** refactor radio group data flow ([#4770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4770)) ([423a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/423a382))


## BREAKING CHANGES

Note: All break changes are warned in the latest version of 8.x, if you have fixed all warnings in 8.x, there will no break changes for you.

* **form:**
  - `nz-form-extra` is removed. Please use `nzExtra` is `nz-form-control` instead.
  - `nz-form-explain` is removed. Please use `nzSuccessTip | nzWarningTip | nzErrorTip | nzValidatingTip` is `nz-form-control` instead.
* **input-number:**
  - ngModelChange trigger at once when user typing
* **pagination:**
  - prev_5 and next_5 is needed when use nzItemRender
  - 'pre' typo was corrected to 'prev'
* **tree, tree-select:**
  - Removed `[nzDefaultExpandAll]` use `[nzExpandAll]` instead.
  - Removed `[nzDefaultExpandedKeys]` use `[nzExpandedKeys]` instead.
  - Removed `[nzDefaultSelectedKeys]` use `[nzSelectedKeys]` instead.
  - Removed `[nzDefaultCheckedKeys]` use `[nzCheckedKeys]` instead.
  - Removed `(nzOnSearchNode)` use `(nzSearchValueChange)` instead.
  - Removed `[nzDefaultExpandedKeys]` use `[nzExpandedKeys]` instead.
* **message,notification:**
  - `NZ_MESSAGE_CONFIG` is removed. Please use `NzConfigService` instead.
  - `NZ_NOTIFICATION_CONFIG` is removed. Please use `NzConfigService` instead.
  - `config` method of `NzMessageService` and `NzNotificationService` is removed. Please use `set` method of `NzConfigService` instead.
* **empty:**
  - `NZ_DEFAULT_EMPTY_CONTENT` is removed. Please use `NzConfigService` instead.
* **carousel:**
  - `nzVertical` is removed. Please use 'nzDotPosition' instead.
* **icon:**
  - `NZ_ICON_DEFAULT_TWOTONE_COLOR` is removed. Use `NzConfigService` instead.
  - `i[nz-icon]`:  `twoToneColor` `theme` `spin` `iconfont` `type` inputs has been removed, use `nzTwoToneColor` `nzTheme` `nzSpin` `nzIconfont` `nzType` instead.
  - `i.anticon` selector has been removed, use `i[nz-icon]` instead.
* **calendar:**
  - `<nz-calendar>` `nzCard` input has been removed, use `nzFullscreen` instead.
* **tooltip,popover,popconfirm:**
  - `<nz-tooltip>` `<nz-popover>` `<nz-popconfirm>` components has been removed, use its directives instead.
* **Removed deprecated API** `NgZorroAntdModule.forRoot()`
---

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
