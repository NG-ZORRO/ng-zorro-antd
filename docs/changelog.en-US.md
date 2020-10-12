---
order: 12
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

## 10.0.1

`2020-10-09`

### Bug Fixes

* **breadcrumb:** fix breadcrumbs not returned ([#5863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5863)) ([1e3fea2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e3fea2)), closes [#4751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4751)
* **code-editor:** run value changes in Angular zone ([#5872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5872)) ([3bbed21](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bbed21))
* **date-picker:** years which contain disabled date can be selected now ([#5804](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5804)) ([3ba0366](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ba0366)), closes [#5633](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5633) [#3425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3425) [#5655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5655)
* **date-picker,time-picker:** open the panel wrongly in IE11 ([#5841](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5841)) ([89aaa79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89aaa79)), closes [#5562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5562)
* **modal:** no error stacks when `nzOnOk/nzOnCancel`  is rejected ([#5561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5561)) ([6a4bddd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6a4bddd)), closes [#5321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5321)
* **upload:** fix upload list style of picture card type ([#5851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5851)) ([9fda318](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9fda318)), closes [#5850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5850)


## 10.0.0

`2020-09-28`

### Bug Fixes

* **tree:** fix nzBlockNode not work ([#5507](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5507)) ([5337652](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5337652))
* **breadcrumb:** fix auto-generated with lazy modules ([#5670](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5670)) ([932d92f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/932d92f)), closes [#5613](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5613) [#5615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5615)
* **carousel:** support SSR ([#5671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5671)) ([65b44aa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65b44aa)), closes [#4292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4292)
* **code-editor:** init event never emit when using static loading ([#5677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5677)) ([b946742](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b946742))
* **date-picker:** modify date-fns week-year format ([#5753](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5753)) ([4911e36](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4911e36)), closes [#5327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5327)
* **date-picker:** nzCalendarChange not work when clicking ok ([#5790](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5790)) ([c9426f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9426f0)), closes [#5782](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5782)
* **date-picker:** open the panel wrongly in IE11 ([#5643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5643)) ([0649ceb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0649ceb)), closes [#5562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5562)
* **date-picker:** window is not defined ([#5640](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5640)) ([f5899ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f5899ad)), closes [#5630](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5630)
* **form:** optimize code to increase robustness ([#5550](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5550)) ([fdf085b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdf085b))
* **mention:** not emit nzOnSearchChange when value is empty ([#5729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5729)) ([4cc14ba](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cc14ba)), closes [#5722](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5722)
* **modal:** change back to FocusTrapFactory ([#5596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5596)) ([9805620](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9805620)), closes [#5591](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5591)
* **progress:** fix value not updated when is steps ([#5676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5676)) ([3eecc44](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3eecc44)), closes [#5585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5585)
* **select:** arrow icon can be used when not using single-select ([#5785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5785)) ([bb8677c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb8677c)), closes [#5575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5575)
* **select:** cursor abnormal in nz-select with nzDisabled ([#5716](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5716)) ([0d1f027](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0d1f027)), closes [#5709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5709)
* **select:** display IME input completely ([#5657](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5657)) ([111721a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/111721a))
* **select:** fix click arrow open ([#5784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5784)) ([2d3a49c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d3a49c))
* **slider:** fix reverse slider value with min and max ([#5814](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5814)) ([fa46a79](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa46a79))
* **style:** fix 4.6.1 sync style ([#5727](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5727)) ([b5f96ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b5f96ca))
* **table:** fix scroll bar displays always even unnecessary ([#5794](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5794)) ([71be33a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/71be33a)), closes [#5405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5405)
* **tabs:** fix clickable area of tab-link ([#5708](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5708)) ([57962e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/57962e1)), closes [#5696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5696)
* **tabs:** fix dropdown style ([#5659](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5659)) ([8415a70](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8415a70))
* **tabs:** not emit click event from dropdown menu ([#5639](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5639)) ([201ef52](https://github.com/NG-ZORRO/ng-zorro-antd/commit/201ef52))
* **tabs:** router link content projection error ([#5663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5663)) ([47050b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47050b0))
* **tabs:** tab-link cannot be disabled ([#5759](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5759)) ([1afabd4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1afabd4)), closes [#5549](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5549) [#5543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5543)
* **time-picker:** input value change not work ([#5770](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5770)) ([31ca2da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/31ca2da)), closes [#5678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5678) [#5741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5741) [#4934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4934)
* **tooltip:** enable `cdkConnectedOverlayPush` ([#5542](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5542)) ([55ec1cd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/55ec1cd)), closes [#1825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1825)
* **tree-select:** not clear search value when dropdown close ([#5761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5761)) ([602ea93](https://github.com/NG-ZORRO/ng-zorro-antd/commit/602ea93)), closes [#5664](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5664)
* **tree-select:** should be not clearable when disabled or unselected ([#5769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5769)) ([baede4a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/baede4a)), closes [#5603](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5603)


### Code Refactoring

* **anchor:** remove deprecated APIs for v10 ([#5776](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5776)) ([e50d530](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e50d530))
* **cascader:** remove deprecated APIs for v10 ([#5778](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5778)) ([7e64e4c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e64e4c))
* **code-editor:** remove deprecated APIs for v10 ([#5798](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5798)) ([353e657](https://github.com/NG-ZORRO/ng-zorro-antd/commit/353e657))
* **date-picker:** remove deprecated APIs for v10 ([#5793](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5793)) ([5159900](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5159900))
* **form,grid:** remove deprecated APIs for v10 ([#5788](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5788)) ([b215efa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b215efa))
* **notification:** remove deprecated APIs for v10 ([#5779](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5779)) ([e5ed4d2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5ed4d2))
* **table:** remove deprecated APIs for v10 ([#5792](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5792)) ([132e425](https://github.com/NG-ZORRO/ng-zorro-antd/commit/132e425))
* **tooltip, popover, popconfirm:** change deprecated APIs for v10 ([#5817](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5817)) ([dc3088c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dc3088c))
* **tree:** remove deprecated APIs for v10 ([#5789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5789)) ([b378cb7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b378cb7))
* **upload:** remove deprecated APIs for v10 ([#5774](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5774)) ([9f5baae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9f5baae))


### Features

* **modal:** support params and modelRef when footer is template ([#5551](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5551)) ([07d91a1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07d91a1)), closes [#5506](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5506)
* **breadcrumb:** add `nzRouteLabelFn` property ([#5523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5523)) ([#5545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5545)) ([81ef791](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81ef791))
* **button:** support text type ([3f5d10b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3f5d10b))
* **card:** support nzBorderless ([#5796](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5796)) ([6e4419c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e4419c))
* **collapse:** support nzGhost property ([1a408ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a408ee))
* **date-picker:** add `open` and `close` methods ([#5777](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5777)) ([be6eda4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/be6eda4)), closes [#3352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3352) [#5771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5771)
* **date-picker:** add week month year range ([#5832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5832)) ([0725d88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0725d88)), closes [#5742](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5742)
* **divider:** support nzPlain property ([d5232ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5232ac))
* **drawer:** add `nzFooter` property ([#4618](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4618)) ([#5553](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5553)) ([2cd9e12](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2cd9e12))
* **drawer:** support `[nzCloseIcon]` ([#5546](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5546)) ([aa984f7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa984f7))
* **input:** support borderless ([#5781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5781)) ([6e7877b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e7877b))
* **pipes:** add pipes ([#4812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4812)) ([e03e65b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e03e65b))
* **skeleton:** add nzRound prop and skeleton-element image ([#5710](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5710)) ([aa2ea54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa2ea54))
* **space:** support `nzAlign` ([#5299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5299)) ([2febb92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2febb92))
* **table:** support nzOuterBordered ([#5795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5795)) ([471b0bf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/471b0bf))
* **tabs:** support (nzContextmenu) event ([#5749](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5749)) ([76931ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/76931ac)), closes [#5712](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5712)
* **tag:** support icon in tag ([#5801](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5801)) ([b909354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b909354)), closes [#5628](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5628) [#4581](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4581)
* **tree-select:** support virtual scroll ([#5760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5760)) ([1f2d816](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f2d816)), closes [#5589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5589)
* **typography:** support keyboard and link types ([#5355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5355)) ([2d6fa62](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2d6fa62))


### BREAKING CHANGES

**tooltip, popover, popconfirm:**
- nz-tooltip
  * `[nzOverlayStyle]` has been removed, use `[nzTooltipOverlayStyle]` instead.
  * `[nzOverlayClassName]` has been removed, use `[nzTooltipOverlayClassName]` instead.
  * `[nzMouseLeaveDelay]` has been removed, use `[nzTooltipMouseLeaveDelay]` instead.
  * `[nzMouseEnterDelay]` has been removed, use `[nzTooltipMouseEnterDelay]` instead.
  * `(nzVisibleChange)` has been removed, use `(nzTooltipVisibleChange)` instead.
- nz-popover
  * `[nzOverlayStyle]` has been removed, use `[nzPopoverOverlayStyle]` instead.
  * `[nzOverlayClassName]` has been removed, use `[nzPopoverOverlayClassName]` instead.
  * `[nzMouseLeaveDelay]` has been removed, use `[nzPopoverMouseLeaveDelay]` instead.
  * `[nzMouseEnterDelay]` has been removed, use `[nzPopoverMouseEnterDelay]` instead.
  * `(nzVisibleChange)` has been removed, use `(nzPopoverVisibleChange)` instead.
- nz-popconfirm
  * `[nzOverlayStyle]` has been removed, use `[nzPopconfirmOverlayStyle]` instead.
  * `[nzOverlayClassName]` has been removed, use `[nzPopconfirmOverlayClassName]` instead.
  * `[nzMouseLeaveDelay]` has been removed, use `[nzPopconfirmMouseLeaveDelay]` instead.
  * `[nzMouseEnterDelay]` has been removed, use `[nzPopconfirmMouseEnterDelay]` instead.
  * `(nzVisibleChange)` has been removed, use `(nzPopconfirmVisibleChange)` instead.

**code-editor:**
- `NzCodeEditorService.updateDefaultOption` has been removed, use `NzConfigService.set` instead.
- Inject token `NZ_CODE_EDITOR_CONFIG`  has been removed, use `NZ_CONFIG` instead.

**date-picker:**
- `NZ_DATE_FNS_COMPATIBLE` has been removed. Please migrate to date-fns v2 manually.
- nz-date-picker,nz-week-picker,nz-month-picker,nz-year-picker,nz-range-picker
  * `[nzClassName]` has been removed, use `ngClass` instead.
  * `[nzStyle]` has been removed, use `ngStyle` instead.

**table:**
- `th[nzSort]` has been removed, use `th[nzSortOrder]` instead.
- `th(nzSortChange) has been removed, use `th(nzSortOrderChange)` instead.
- `th(nzSortChangeWithKey)` has been removed. Please manually remove it.
- `thead(nzSortChange)` has been removed, use `thead(nzSortOrderChange)` instead.
- `thead[nzSingleSort]` and `th[nzSortKey]` has been removed. Please manually change to `th[nzSortFn]`.

**form,grid:**
- `nz-form-item[nzFlex]` has been removed. Please manually remove this input.
- `nz-form-item[nzType]` has been removed. Please manually remove this input.
- `nz-row[nzType]` has been removed. Please manually remove this input.

**tree:**
- `NzTreeNode.isAllChecked` has been removed, use `NzTreeNode.isChecked` instead.
- `NzTreeNode.setSelected(boolean)` has been removed, use `NzTreeNode.isSelected = boolean` instead.

**notification:**
- `NzNotificationDataFilled` has been removed, use `NzNotificationRef` instead.
- `NzNotificationDataOptions.nzPosition` has been removed, use `NzNotificationDataOptions.nzPlacement` instead.

**anchor:**
- `nzTarget` has been removed, use `nzContainer` instead.

**cascader:**
- `CascaderOption` has been removed, use `NzCascaderOption` instead.
- `CascaderSearchOption` has been removed, use `NzCascaderSearchOption` instead.

**upload:**
- `UploadType` has been removed, use `NzUploadType` instead.
- `UploadListType` has been removed, use `NzUploadListType` instead.
- `UploadFile` has been removed, use `NzUploadFile` instead.
- `UploadChangeParam` has been removed, use `NzUploadChangeParam` instead.
- `ShowUploadListInterface` has been removed, use `NzShowUploadList` instead.
- `UploadTransformFileType` has been removed, use `NzUploadTransformFileType` instead.
- `UploadXHRArgs` has been removed, use `NzUploadXHRArgs` instead.

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
