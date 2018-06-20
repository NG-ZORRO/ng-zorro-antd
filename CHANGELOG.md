<a name="1.0.0"></a>
# [1.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.1...1.0.0) (2018-06-11)


### Bug Fixes

* **module:tree:** fix nzOnSearchChange & folder tree demo ([#1602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1602)) ([b8e4432](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b8e4432)), closes [#1601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1601)
* **module:tree:** support custom property ([#1584](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1584)) ([1ca696a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ca696a)), closes [#1580](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1580)
* **module:checkbox:** fix invalid setting width via style ([#1577](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1577)) ([ec4be6b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec4be6b)), closes [#1359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1359)
* **module:modal:** fix multiple nzOnCancel calls ([#1590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1590)) ([bc07be2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc07be2)), closes [#958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/958)
* **module:modal:** miss returned value from nzOnOk or nzOnCancel ([#1456](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1456)) ([9d6e93b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d6e93b))
* **module:pagination:** fix still show when total is 0 and  nzHideOnSinglePage is true ([#1583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1583)) ([c5c33d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5c33d0))
* **module:popover:** fix popover nzTemplate value ([#1608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1608)) ([7cf6ee1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7cf6ee1))
* **module:radio:** fix nzDisabled in radio-group ([#1574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1574)) ([024c488](https://github.com/NG-ZORRO/ng-zorro-antd/commit/024c488)), closes [#1543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543)
* **module:spin:** fix spin error in antd 3.6.1 ([#1607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1607)) ([8a1a9ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a1a9ca))
* **module:transfer:** fix TransferItem type to work with strictNullChecks ([#1589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1589)) ([7601af1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7601af1)), closes [#1588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1588)
* **schematic:ng-add:** duplicate add bugs ([#1623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1623)) ([214a00d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/214a00d))
* **schematic:ng-add:** fix import path in theme file ([#1611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1611)) ([aa953dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa953dc))


### Features

* **module:tree:** sync ant style & add dir demo ([#1559](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1559)) ([0fbf135](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fbf135))
* **module:table:** add nzHideOnSinglePage property ([#1585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1585)) ([3bc2e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bc2e90))
* **ng:schematic:** support ng add & ng generate ([#1430](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1430)) ([9ed3590](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ed3590)), closes [#1405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1405)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0...0.7.1) (2018-05-24)


### Bug Fixes

* **module:tab:** fix vertical-bar error in docs ([#1499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1499)) ([e5d5860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5d5860))
* **module:autocomplete:** form related bugs ([#1451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1451)) ([c91a0f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c91a0f8)), closes [#1437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1437)
* **module:date-picker:** improve the horizontal position adaptability ([#1495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1495)) ([64f5ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64f5ce5)), closes [#1450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1450)
* **module:input-number:** fix focused style could not be removed after blur ([#1453](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1453)) ([80a559f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a559f)), closes [#1449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1449)
* **module:menu:** fix menu ngfor bug ([#1519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1519)) ([4f6c266](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f6c266))
* **module:message:** increase the overlay's zindex tobe the same with… ([#1461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1461)) ([5a51344](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a51344)), closes [#1457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1457)
* **module:popconfirm:** add nzOkType support ([#1492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1492)) ([6f394a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f394a4)), closes [#1312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1312)
* **module:sider:** fix typo - isSiderTrgger to isSiderTrigger ([#1434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1434)) ([f1f26ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f26ad))


### Features

* **input-number:** support input-number placeholder ([#1512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1512)) ([7e3d4e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e3d4e4))
* **module:autocomplete:** support bind any types to the nzModule of trigger element ([#1397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1397)) ([b44296e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b44296e)), closes [#1298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1298)
* **module:switch:** support fully control by user ([#1514](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1514)) ([70ca8bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70ca8bd))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.5...0.7.0) (2018-05-15)


### Bug Fixes

* **module:tree:** fix wrong checked nodes ([#1425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1425)) ([5a06694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a06694)), closes [#1423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1423)
* **module:autocomplete:** fix styles ([#1393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1393)) ([5ad0452](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ad0452)), closes [#1384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1384)
* **module:steps:** fix steps ngfor ([#1421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1421)) ([35da659](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35da659)), closes [#1418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1418)



<a name="0.7.0-beta.5"></a>
# [0.7.0-beta.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.4...0.7.0-beta.5) (2018-05-01)


### Bug Fixes

* **module:input-number:** fix display value after formatter changed ([#1371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1371)) ([179c1e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/179c1e2))
* **module:upload:** fix ngModel was changed to nzPercent in nz-progress ([#1320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1320)) ([9b7336e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b7336e)), closes [#1209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1209)


### Features

* **module:time-picker:** support null value in time-picker-panel ([#1388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1388)) ([1ca1490](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ca1490))



<a name="0.7.0-beta.4"></a>
# [0.7.0-beta.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.3...0.7.0-beta.4) (2018-04-12)


### Bug Fixes

* **module:tree:** add origin param to NzTreeNode ([#1221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1221)) ([c9686ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9686ca))
* **module:card:** fix avatar and detail alignment ([#1255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1255)) ([6b13ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b13ce0))
* **module:carousel:** fix carousel autoplay bug ([#1309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1309)) ([dd3265d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd3265d)), closes [#1242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1242)
* **module:i18n:** fix i18n error without locale ([#1220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1220)) ([880f0e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/880f0e8))
* **module:mention:** getMention method should kepp the mention prefix ([#1287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1287)) ([7925f48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7925f48))
* **module:menu:** fix menu ExpressionChangedAfterItHasBeenCheckedError ([#1306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1306)) ([e63668d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e63668d)), closes [#1216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1216)
* change the homepage url of angular.cn ([#1289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1289)) ([471e064](https://github.com/NG-ZORRO/ng-zorro-antd/commit/471e064))
* **module:message,notification:** fix message/notification cause multi-detection error while used in dynamic creating component ([#1218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1218)) ([f2624cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f2624cb)), closes [#391](https://github.com/NG-ZORRO/ng-zorro-antd/issues/391)
* **module:select:** fix select zero value & scroll bug ([#1299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1299)) ([0552141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0552141)), closes [#1229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1229) [#1245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1245)
* **module:table:** fix scrollbar calc ([#1315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1315)) ([0416900](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0416900)), closes [#1205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1205)
* **module:table:** fix table th filter style ([#1300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1300)) ([29c559a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29c559a)), closes [#1238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1238)
* **module:tag:** fix default color when empty color values ([#1256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1256)) ([ba3a323](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba3a323))
* **module:transfer:** removed change detection ([#1260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1260)) ([d507848](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d507848)), closes [#996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/996)


### Features

* **module:mention:** add mention component ([#1182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1182)) ([e28c1b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e28c1b5))
* **module:mention:** add prefix property to nzOnSearchChange payload ([#1296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1296)) ([1af5b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1af5b42))



<a name="0.7.0-beta.3"></a>
# [0.7.0-beta.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.1...0.7.0-beta.3) (2018-03-26)


### Bug Fixes

* **doc:i18n:** fix doc ([#1186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1186)) ([4ba77c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4ba77c2))
* **module:card:** fix card style ([#1194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1194)) ([ad80297](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad80297)), closes [#1191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1191)
* **module:form:** fix form init style miss & fix doc ([#1174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1174)) ([ab37862](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab37862)), closes [#1170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1170) [#1173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1173)
* **module:input:** fix input disable style in reactive form ([#1167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1167)) ([5c07161](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c07161))
* **module:table & i18n:** fix table style & export i18n interface ([#1163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1163)) ([fdd03d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdd03d7))


### Features

* **module:modal:** add afterOpen/afterClose/afterAllClose/closeAll/openModals, adjust the boolean props and changeBodyOverflow and complete testing. ([#1165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1165)) ([10227b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10227b8)), closes [#1155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1155) [#1162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1162)
* **module:modal:** support triggerOk/triggerCancel to trigger nzOnOk/nzOnCancel manually ([#1201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1201)) ([8cc016e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8cc016e))



<a name="0.7.0-beta.1"></a>
# [0.7.0-beta.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.10...0.7.0-beta.1) (2018-03-15)


### Bug Fixes

* **module:back-top:** fix style ([#1125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1125)) ([60fe850](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60fe850))
* **module:calendar:** use correct classNames ([#1118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1118)) ([5392fde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5392fde))
* **module:list:** change contentchild to input ([#1100](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1100)) ([5d9133b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5d9133b))
* **module:progress:** fix 100% when specify invalid value ([#905](https://github.com/NG-ZORRO/ng-zorro-antd/issues/905)) ([8afedaa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8afedaa))
* **module:spin:** remove spin container if no content ([7639eac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7639eac))
* **module:spin:** support dynamic ng-content in spin ([#925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/925)) ([cc7a83b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc7a83b))
* **module:transfer:** change contentchild to input ([#1099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1099)) ([abb7de0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abb7de0))


### Features

* **module:affix anchor backtop:** refactor affix anchor backtop ([#1025](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1025)) ([24abd10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24abd10))
* **module:autocomplete:** add autocomplete component ([#1093](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1093)) ([1461293](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1461293))
* **module:avatar:** add avatar component ([#1028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1028)) ([65535d5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65535d5))
* **module:divider:** add divider component ([#1029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1029)) ([7895e80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7895e80))
* **module:divider:** add nzOrientation property ([#1126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1126)) ([e100681](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e100681))
* **module:doc:** support sync single demo dir ([#936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/936)) ([73e4a95](https://github.com/NG-ZORRO/ng-zorro-antd/commit/73e4a95))
* **module:list:** add list component ([#1031](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1031)) ([9e71deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e71deb))
* **module:list:** add nz-list component ([6481a88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6481a88))
* **module:menu dropdown:** refactor menu dropdown & add test & add doc ([#990](https://github.com/NG-ZORRO/ng-zorro-antd/issues/990)) ([ca1d4e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca1d4e2))
* **module:tree:** add tree component ([#1147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1147)) ([7ca5de3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ca5de3))
* **module:upload:** add upload component ([#1040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1040)) ([a9efbaa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9efbaa))



<a name="0.6.10"></a>
## [0.6.10](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.9...0.6.10) (2018-01-06)


### Bug Fixes

* **module:affix:** fix affix nzOffsetTop bug ([#868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/868)) ([f0bad26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0bad26))
* **module:radio:** fix radio button click bug ([#867](https://github.com/NG-ZORRO/ng-zorro-antd/issues/867)) ([2de24ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2de24ee)), closes [#854](https://github.com/NG-ZORRO/ng-zorro-antd/issues/854) [#857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/857) [#855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/855)


### Features

* **module:datepicker:** add range-picker component ([#656](https://github.com/NG-ZORRO/ng-zorro-antd/issues/656)) ([9df3eb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9df3eb9))
* **module:locale:** support russian locale ([#853](https://github.com/NG-ZORRO/ng-zorro-antd/issues/853)) ([8d65a83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d65a83))



<a name="0.6.9"></a>
## [0.6.9](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.8...0.6.9) (2018-01-02)


### Bug Fixes

* **module:calendar:** fix month/year view switched ([#768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/768)) ([383a0f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/383a0f4))
* **module:transfer:** 1.fix the "checkAll" status not updated 2.change "ArrayObservable.of" to "of" ([#834](https://github.com/NG-ZORRO/ng-zorro-antd/issues/834)) ([9c023fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c023fa))


### Features

* **module:radio:** use nz-radio components alone ([#825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/825)) ([15c968c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15c968c))
* **module:transfer:** add canMove property & make component using OnPush ([#824](https://github.com/NG-ZORRO/ng-zorro-antd/issues/824)) ([d31c596](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d31c596))



<a name="0.6.8"></a>
## [0.6.8](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.7...0.6.8) (2017-12-21)


### Bug Fixes

* **module:modal:** fix modal type error ([#784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/784)) ([cb0ab64](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb0ab64))
* **module:overlay:** update overlay width when the host component's width change ([#780](https://github.com/NG-ZORRO/ng-zorro-antd/issues/780)) ([62fc733](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62fc733)), closes [#779](https://github.com/NG-ZORRO/ng-zorro-antd/issues/779)
* **module:popconfirm:** fix backdrop of popconfirm ([#786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/786)) ([60cf7a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60cf7a9)), closes [#785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/785)
* **module:table:** fix the missing of init table sort class ([#781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/781)) ([b828025](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b828025)), closes [#771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/771)



<a name="0.6.7"></a>
## [0.6.7](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.6...0.6.7) (2017-12-15)


### Bug Fixes

* **module:datepicker:** disable datepicker when user input ([#738](https://github.com/NG-ZORRO/ng-zorro-antd/issues/738)) ([84c0f23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84c0f23))
* **module:select:** reset select component this._value ([#754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/754)) ([4a50d0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a50d0d))
* **module:slider:** fix set value in slider ([#743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/743)) ([d0a6793](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0a6793)), closes [#739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/739)


### Features

* **module:calendar:** use months short format ([#737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/737)) ([805538c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/805538c)), closes [#736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/736)
* **module:tooltip,popover,popconfirm:** support "nzMouseEnterDelay" and "nzMouseLeaveDelay" ([#758](https://github.com/NG-ZORRO/ng-zorro-antd/issues/758)) ([3a894f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a894f0)), closes [#757](https://github.com/NG-ZORRO/ng-zorro-antd/issues/757)



<a name="0.6.6"></a>
## [0.6.6](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.5...0.6.6) (2017-12-11)


### Bug Fixes

* **module:datepicker:** enable simplified boolean usage ([#726](https://github.com/NG-ZORRO/ng-zorro-antd/issues/726)) ([6cf80b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6cf80b0))
* **module:rate:** ensure value to be number ([#728](https://github.com/NG-ZORRO/ng-zorro-antd/issues/728)) ([35687c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35687c3))
* **module:slider:** fix slider min & max ([#732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/732)) ([6eda3a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6eda3a7))
* **module:slider:** rectify return value ([#729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/729)) ([6b095a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b095a8))


### Features

* **module:input-number:** use boundary value instead of previous value ([#731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/731)) ([48e40f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48e40f4))



<a name="0.6.5"></a>
## [0.6.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.4...0.6.5) (2017-12-10)



<a name="0.6.4"></a>
## [0.6.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.3...0.6.4) (2017-12-10)


### Bug Fixes

* **module:input-number:** check value when press tab key ([#706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/706)) ([9923a86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9923a86)), closes [#651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/651)


### Features

* **module:form:** support default nzValidateStatus & support more error status ([#696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/696)) ([3d4213f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d4213f)), closes [#693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/693) [#692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/692)
* **module:grid:** support zero input in grid ([#704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/704)) ([e50b72f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e50b72f)), closes [#702](https://github.com/NG-ZORRO/ng-zorro-antd/issues/702)
* **module:select:** support placeholder for basic select ([#703](https://github.com/NG-ZORRO/ng-zorro-antd/issues/703)) ([a842cdd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a842cdd)), closes [#413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/413)
* **module:tooltip,popover,popconfirm:** do not show tooltip when it's content is empty ([54ff189](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54ff189)), closes [#631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/631)
* **module:tooltip,popover,popconfirm:** support hover on the content of it's overlay ([e712d87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e712d87)), closes [#701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/701)



<a name="0.6.3"></a>
## [0.6.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.2...0.6.3) (2017-12-06)


### Bug Fixes

* **module:affix:** fix position offset when has deferred render componets. ([#672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/672)) ([74b01da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74b01da)), closes [#671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/671)
* **module:radio:** value can not be dynamically update ([#677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/677)) ([bedcf96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bedcf96)), closes [#668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/668)
* **module:select:** fix choose disabled item via direction key control ([#675](https://github.com/NG-ZORRO/ng-zorro-antd/issues/675)) ([80d637d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80d637d)), closes [#674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/674)
* **module:select:** usage public property in accessing other components ([#679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/679)) ([8ba3ea8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ba3ea8))


### Features

* **i18n:turkish:** create tr-TR.ts ([#634](https://github.com/NG-ZORRO/ng-zorro-antd/issues/634)) ([a731817](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a731817))
* **i18n:zh-tw:** support zh-TW ([#687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/687)) ([05c1f87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05c1f87))
* **module:carousel:** add enhancement API and methods ([#688](https://github.com/NG-ZORRO/ng-zorro-antd/issues/688)) ([c22dad3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c22dad3)), closes [#652](https://github.com/NG-ZORRO/ng-zorro-antd/issues/652)
* **module:select:** support custom option template ([#689](https://github.com/NG-ZORRO/ng-zorro-antd/issues/689)) ([d76763c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d76763c)), closes [#227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/227)
* **module:select:** support nzScrollToBottom event ([#678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/678)) ([b7cc148](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7cc148)), closes [#676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/676)
* **module:TODO:** simplify boolean attributes ([#459](https://github.com/NG-ZORRO/ng-zorro-antd/issues/459)) ([08f10e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/08f10e4))
* **packaging:** generate sourcemaps ([#666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/666)) ([8665639](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8665639)), closes [#662](https://github.com/NG-ZORRO/ng-zorro-antd/issues/662)


### BREAKING CHANGES

* **packaging:** umd file name simplified from 'ng-zorro-antd.js' to 'antd.js'



<a name="0.6.2"></a>
## [0.6.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.1...0.6.2) (2017-11-29)


### Features

* **module:slider:** support dynamic update nzMarks from outside ([#636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/636)) ([aea80c4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aea80c4)), closes [#624](https://github.com/NG-ZORRO/ng-zorro-antd/issues/624)
* **module:table and pagination:** support custom the page size changer select values([#608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/608)) ([#626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/626)) ([034bd71](https://github.com/NG-ZORRO/ng-zorro-antd/commit/034bd71))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0...0.6.1) (2017-11-26)


### Bug Fixes

* **module:datepicker:** fix disabled today button ([#611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/611)) ([5203614](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5203614)), closes [#604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/604)
* **module:select:** fix duplicated option bug ([#609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/609)) ([9385826](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9385826)), closes [#590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/590)
* **module:transfer:** fix select all items in search ([#602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/602)) ([072c97a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/072c97a)), closes [#599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/599)


### Features

* **module:datepicker:** support string and number type as value ([#593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/593)) ([aee7abe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aee7abe))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.3...0.6.0) (2017-11-18)


### Bug Fixes

* **module:menu:** do not remove submenu when click title ([#576](https://github.com/NG-ZORRO/ng-zorro-antd/issues/576)) ([37cef47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37cef47)), closes [#454](https://github.com/NG-ZORRO/ng-zorro-antd/issues/454)
* **module:popover,steps:** fix popover always show title placeholder & steps nzDescription property support TemplateRef ([#556](https://github.com/NG-ZORRO/ng-zorro-antd/issues/556)) ([4a4e393](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a4e393)), closes [#555](https://github.com/NG-ZORRO/ng-zorro-antd/issues/555) [#523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/523)
* **module:select:** fix multiple select width ([#575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/575)) ([7006766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7006766)), closes [#560](https://github.com/NG-ZORRO/ng-zorro-antd/issues/560)


### Features

* **module:modal:** support disable the esc key to close ([#567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/567)) ([75bc6b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/75bc6b6))
* **module:timepicker:** support dynamic binding [nzDisabledHours] ([#568](https://github.com/NG-ZORRO/ng-zorro-antd/issues/568)) ([22e2931](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22e2931)), closes [#286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/286)
* **module:tooltip:** support usage like: <a nz-tooltip="This is a prompt text">test</a> ([#545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/545)) ([b4824d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b4824d9)), closes [#345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/345)
* **module:transfer:** add transfer component ([#578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/578)) ([84895cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84895cb)), closes [#132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/132)



<a name="0.6.0-rc.3"></a>
# [0.6.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.2...0.6.0-rc.3) (2017-11-04)


### Bug Fixes

* **module:affix:** fix FPS drops ([#490](https://github.com/NG-ZORRO/ng-zorro-antd/issues/490)) ([50b2606](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50b2606)), closes [#477](https://github.com/NG-ZORRO/ng-zorro-antd/issues/477)
* **module:pagination:** wrong event by changing the page size ([#486](https://github.com/NG-ZORRO/ng-zorro-antd/issues/486)) ([ad5bc29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad5bc29)), closes [#482](https://github.com/NG-ZORRO/ng-zorro-antd/issues/482)
* **module:tabs:** repeat rendering the TabBarExtra when used nested tabs ([#489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/489)) ([3289e7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3289e7f)), closes [#452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/452)


### Features

* **module:datepicker:** support [nzDisabledDate] property in month mode ([#451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/451)) ([cdc0716](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdc0716)), closes [#442](https://github.com/NG-ZORRO/ng-zorro-antd/issues/442)


### Performance Improvements

* **classMap:** improve classMap performance ([#528](https://github.com/NG-ZORRO/ng-zorro-antd/issues/528)) ([e5b5cc9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5b5cc9))
* **polyfill:** polyfill all request animation ([#527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/527)) ([8c5a41a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c5a41a))



<a name="0.6.0-rc.2"></a>
# [0.6.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.1...0.6.0-rc.2) (2017-10-29)



<a name="0.6.0-rc.1"></a>
# [0.6.0-rc.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.5...0.6.0-rc.1) (2017-10-28)


### Bug Fixes

* **module:table:** fix the wrong semantics about param "nzShowExpand" of nz-row-expand-icon ([e4f8337](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4f8337))


### build

* **packaging:** update [@angular](https://github.com/angular)/cdk to 2.0.0-beta.11 ([3e007a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e007a2)), closes [#238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/238) [#290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/290)


### Features

* **i18n:** support i18n functionality (zh-CN, en-US currently) ([552fa50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/552fa50)), closes [#427](https://github.com/NG-ZORRO/ng-zorro-antd/issues/427)
* **module:locale:** support change locale at the runtime (globally) ([af6c926](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af6c926))


### BREAKING CHANGES

* **packaging:** 1. usage related to cdk is changed 2. @angular version dependence update to ^4.4.3 (due to @angular/cdk)
* **module:table:** the usage of param "nzShowExpand" is changed to the opposite value. The former, "nzShowExpand" represent as "hide the expand icon", now this change correct it to "show the expand icon".

And the default value of "nzShowExpand" has changed to "true".



<a name="0.5.5"></a>
## [0.5.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.4...0.5.5) (2017-10-21)


### Bug Fixes

* **module:dropdown:** fix dropdown trigger events ([#466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/466)) ([6034f54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6034f54)), closes [#390](https://github.com/NG-ZORRO/ng-zorro-antd/issues/390)
* **module:dropdown:** fix unsubscribe undefined bug ([#464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/464)) ([a0dcad3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0dcad3)), closes [#269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/269)


### Features

* **module:calendar:** add year number to month template ([#465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/465)) ([0eba3ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0eba3ae)), closes [#461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/461)
* **module:steps:** support [nzProgressDot] property in vertical mode ([#446](https://github.com/NG-ZORRO/ng-zorro-antd/issues/446)) ([98e2579](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98e2579))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.3...0.5.4) (2017-10-14)


### Bug Fixes

* **module:datepicker:** data binding not work when mode is month ([#421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/421)) ([dca0895](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dca0895))
* **module:modal:** restore body overflow before destroyed the component ([#415](https://github.com/NG-ZORRO/ng-zorro-antd/issues/415)) ([083dd03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/083dd03)), closes [#412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/412)


### Features

* **module:input-number:** add nzBlur & nzFocus property ([#406](https://github.com/NG-ZORRO/ng-zorro-antd/issues/406)) ([a49a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a49a382)), closes [#396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/396)



<a name="0.5.3"></a>
## [0.5.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.2...0.5.3) (2017-09-30)


### Bug Fixes

* **module:demo:** fix demo site performance ([#403](https://github.com/NG-ZORRO/ng-zorro-antd/issues/403)) ([2e88b56](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e88b56)), closes [#187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/187)
* **module:table:** fix nzIsPageIndexReset for wrong display ([#372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/372)) ([#373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/373)) ([90f0333](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90f0333))


### Features

* **module:all:** export all components when build ([#404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/404)) ([802a98c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/802a98c)), closes [#275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/275)
* **module:collapse:** support custom header ([#383](https://github.com/NG-ZORRO/ng-zorro-antd/issues/383)) ([ca42f00](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca42f00))
* **module:datepicker:** support month picker ([#397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/397)) ([4cb03fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cb03fa)), closes [#351](https://github.com/NG-ZORRO/ng-zorro-antd/issues/351)
* **module:menu:** animate expand/collapse menu ([#330](https://github.com/NG-ZORRO/ng-zorro-antd/issues/330)) ([7edba94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7edba94)), closes [#25](https://github.com/NG-ZORRO/ng-zorro-antd/issues/25)



<a name="0.5.2"></a>
## [0.5.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.1...0.5.2) (2017-09-23)


### Bug Fixes

* **module:cascader:** select and render leaf label & reset in reactive form ([#335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/335)) ([#336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/336)) ([#356](https://github.com/NG-ZORRO/ng-zorro-antd/issues/356)) ([c80bb8e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bb8e))
* **module:menu:** fix submenu ExpressionChangedAfterItHasBeenCheckedError ([#368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/368)) ([10989ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10989ae)), closes [#367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/367)
* **module:select:** fix select style in inline form ([#362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/362)) ([ae06649](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae06649)), closes [#306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/306)
* **module:table:** fix nzWidth with ngIf ([#349](https://github.com/NG-ZORRO/ng-zorro-antd/issues/349)) ([d5d379b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5d379b)), closes [#302](https://github.com/NG-ZORRO/ng-zorro-antd/issues/302)
* **moment:** rollup compile with incorrect sourcemap ([#331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/331)) ([aec9f83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aec9f83))


### Features

* **module:modal:** show confirm loading status of modal opened by nzModalService ([#340](https://github.com/NG-ZORRO/ng-zorro-antd/issues/340)) ([90b7e12](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90b7e12)), closes [#365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/365)
* **module:select:** support undefined reset select ([#363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/363)) ([1a997c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a997c2)), closes [#284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/284)
* **module:table:** add nzIsPageIndexReset option ([#348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/348)) ([#359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/359)) ([60e3da9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60e3da9))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0...0.5.1) (2017-09-16)


### Bug Fixes

* **module:datepicker:** end decade cell text ([#301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/301)) ([d16061f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d16061f)), closes [#300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/300)
* **module:input:** fix type error ([#283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/283)) ([cd84e47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd84e47)), closes [#282](https://github.com/NG-ZORRO/ng-zorro-antd/issues/282)
* **module:layout:** fix slider breakpoint in mobile device ([#299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/299)) ([47c4d86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47c4d86)), closes [#292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/292)
* **module:pagination:** prevent repeated emit events ([#281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/281)) ([ec66e13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec66e13)), closes [#280](https://github.com/NG-ZORRO/ng-zorro-antd/issues/280)
* **module:pagination:** prevent selection after double click ([#268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/268)) ([46ae81a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/46ae81a)), closes [#267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/267)


### Features

* **module:menu:** selected child item, its parent highlight ([#264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/264)) ([970e968](https://github.com/NG-ZORRO/ng-zorro-antd/commit/970e968)), closes [#262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/262)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.4...0.5.0) (2017-09-09)


### Bug Fixes

* **module:*:** patch all components with setDisabledState ([#188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/188)) ([69b8979](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69b8979)), closes [#134](https://github.com/NG-ZORRO/ng-zorro-antd/issues/134)
* **module:carousel:** carousel slide height depend on inner content ([#242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/242)) ([94bac1b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/94bac1b)), closes [#162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/162) [#170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/170)
* **module:cascader:** fix nz-cascader don't refresh when nzOptions binding data changed ([#219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/219)) ([#221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/221)) ([74b2506](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74b2506))
* **module:checkbox:** fix trigger twitce in safari ([#256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/256)) ([cd5b511](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd5b511))
* **module:core,root:** ensure compatibility to v4 ([#233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/233)) ([2b5c083](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b5c083))
* **module:datepicker:** year and month display in opposite way ([#243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/243)) ([4b5ea54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4b5ea54)), closes [#232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/232)
* **module:dropdown:** should always debouce before subscribe visibleChange$ ([#237](https://github.com/NG-ZORRO/ng-zorro-antd/issues/237)) ([0180e1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0180e1c)), closes [#234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/234)
* **module:input,datepicker,input-number,select,slider:** still dirty when "form.reset()" called ([#257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/257)) ([4233db1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4233db1)), closes [#114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/114)
* **module:inputnumber:** validate inputnumber value & rewrite strategy ([#230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/230)) ([28669ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28669ae)), closes [#42](https://github.com/NG-ZORRO/ng-zorro-antd/issues/42) [#203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/203)
* **module:select, datepicker, timepicker:** close dropdown when change to disable status ([#222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/222)) ([6e1b144](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e1b144)), closes [#190](https://github.com/NG-ZORRO/ng-zorro-antd/issues/190) [#195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/195)
* **module:select, datepicker, timepicker, radio, checkbox, input-number:** fix touched state ([#248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/248)) ([07f48bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07f48bc)), closes [#228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/228)


### Features

* **module:grid:** support embedded col option ([#247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/247)) ([248c7e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/248c7e5)), closes [#101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/101)
* **module:input:** support nzAutosize property ([#251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/251)) ([5e950ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e950ab)), closes [#252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/252)
* **module:input:** support nzReadonly property ([#236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/236)) ([6b69cf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b69cf9))
* **module:menu:** support unfolds/folds & add demo and api docs ([#225](https://github.com/NG-ZORRO/ng-zorro-antd/issues/225)) ([23b73bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/23b73bb)), closes [#206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/206)
* **module:table:** support filter & fixed header add more table demo ([#210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/210)) ([5f11664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5f11664)), closes [#86](https://github.com/NG-ZORRO/ng-zorro-antd/issues/86) [#174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/174) [#218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/218)
* **module:table:** support table expand feature ([#259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/259)) ([578819d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/578819d)), closes [#185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/185)



<a name="0.5.0-rc.4"></a>
# [0.5.0-rc.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.3...0.5.0-rc.4) (2017-08-31)


### Bug Fixes

* **module:pagination:** fix nzPageIndexChange event does not emit ([#189](https://github.com/NG-ZORRO/ng-zorro-antd/issues/189)) ([371b98a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/371b98a))


### Features

* **module:modal:** provide open & close & setConfirmLoading function ([#125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/125)) ([0f87f6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f87f6c)), closes [#118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/118)
* **module:tooltip,popconfirm,popover:** support OnPush ([#143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/143)) ([2f2c9ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f2c9ac)), closes [#136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/136)



<a name="0.5.0-rc.3"></a>
# [0.5.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.2...0.5.0-rc.3) (2017-08-26)


### Bug Fixes

* **module:affix,anchor,back-top:** fix and improve rxjs usage ([#159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/159)) ([152b654](https://github.com/NG-ZORRO/ng-zorro-antd/commit/152b654))
* **module:carousel:** fix carousel auto play bug ([#164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/164)) ([01012e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/01012e4)), closes [#161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/161)
* **module:checkbox:** fix checkbox host class lost bug ([#116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/116)) ([81cbae9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81cbae9)), closes [#104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/104)
* **module:input:** fix input disabled style bug ([#108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/108)) ([5d666fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5d666fc)), closes [#103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/103)
* **module:input:** fix input disabled style bug ([#160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/160)) ([b7a073c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7a073c))
* **module:input:** fix input touched property ([#129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/129)) ([143c080](https://github.com/NG-ZORRO/ng-zorro-antd/commit/143c080)), closes [#65](https://github.com/NG-ZORRO/ng-zorro-antd/issues/65) [#117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/117)
* **module:select:** fix option incorrect active status ([#141](https://github.com/NG-ZORRO/ng-zorro-antd/issues/141)) ([49e3741](https://github.com/NG-ZORRO/ng-zorro-antd/commit/49e3741))
* **module:select:** fix select reset bug in form ([#153](https://github.com/NG-ZORRO/ng-zorro-antd/issues/153)) ([2bf24e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2bf24e0)), closes [#128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/128)


### Features

* **module:affix&anchor&back-top&avatar:** add components to library ([#88](https://github.com/NG-ZORRO/ng-zorro-antd/issues/88)) ([468e80b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/468e80b))
* **module:root:** make nz-root optional ([#36](https://github.com/NG-ZORRO/ng-zorro-antd/issues/36)) ([9de3de1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9de3de1))
* **showcase:** auto scroll to top when router change & sync code icon with antd ([#124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/124)) ([9a1de83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a1de83)), closes [#26](https://github.com/NG-ZORRO/ng-zorro-antd/issues/26)



<a name="0.5.0-rc.2"></a>
# [0.5.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.0...0.5.0-rc.2) (2017-08-19)


### Bug Fixes

* Pagination QuickJumper bug [#37](https://github.com/NG-ZORRO/ng-zorro-antd/issues/37) ([a122238](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a122238))
* **module:carousel:** support dynamic change of nz-carousel-content ([#60](https://github.com/NG-ZORRO/ng-zorro-antd/issues/60)) ([44865c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44865c2)), closes [#56](https://github.com/NG-ZORRO/ng-zorro-antd/issues/56)
* **module:menu:** fix submenu level bug & fix menu routerLinkActive bug in lazyload module ([#77](https://github.com/NG-ZORRO/ng-zorro-antd/issues/77)) ([b914afd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b914afd)), closes [#35](https://github.com/NG-ZORRO/ng-zorro-antd/issues/35) [#52](https://github.com/NG-ZORRO/ng-zorro-antd/issues/52) [#74](https://github.com/NG-ZORRO/ng-zorro-antd/issues/74)
* **module:pagination:** remove active class when reach first and last page index ([#93](https://github.com/NG-ZORRO/ng-zorro-antd/issues/93)) ([2bcddc7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2bcddc7)), closes [#17](https://github.com/NG-ZORRO/ng-zorro-antd/issues/17)
* **module:steps:** fix steps width bug in tab component ([#94](https://github.com/NG-ZORRO/ng-zorro-antd/issues/94)) ([ee4428d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee4428d)), closes [#83](https://github.com/NG-ZORRO/ng-zorro-antd/issues/83)
* **timeline:** eliminate ExpressionChangedAfterItHasBeenCheckedError when use ngFor to render ([67df061](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67df061))


### Features

* **module:input:** provide nzFocus event ([#80](https://github.com/NG-ZORRO/ng-zorro-antd/issues/80)) ([ffc1d49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffc1d49)), closes [#73](https://github.com/NG-ZORRO/ng-zorro-antd/issues/73)


### Performance Improvements

* **all:** improve rxjs imports ([#29](https://github.com/NG-ZORRO/ng-zorro-antd/issues/29)) ([f3aa2cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f3aa2cb))



<a name="0.5.0-rc.0"></a>
# 0.5.0-rc.0 (2017-08-15)



