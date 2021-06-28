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

## 11.4.2

`2021-06-08`


### Bug Fixes

* **autocomplete:** no reset status when no matching inputs ([#6685](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6685)) ([7199ad5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7199ad507fffa9af138be75a7ba61bb47b5fd13f)), closes [#6286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6286)
* **badge:** fix nzNoAnimation not working ([#6717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6717)) ([36c03e3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/36c03e3453d80f36029d21b7ec611217411194b3))
* **modal:** `nzVisible` not updated when implicitly closed ([#6649](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6649)) ([5faac2c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5faac2c8146d14096f2181c912baa6050d10e21b)), closes [#6647](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6647) [#6320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6320)
* **slider:** processing value zero correctly ([#6729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6729)) ([62a86c0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62a86c05dec6e58435ed5375a0da00891519284c))
* **tabs:** fix `nzCentered` not working ([#6706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6706)) ([439ff0a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/439ff0aae4147a1cb067a1c6b60013baa8142434))
* **tag:** missing styles on view engine ([#6738](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6738)) ([29c316b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29c316b6b2154b94b9faaf61036da5b07f2aef98)), closes [#6732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6732)
* **tree-view:** node indent line without mark change check ([#6736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6736)) ([215a278](https://github.com/NG-ZORRO/ng-zorro-antd/commit/215a2788bc2a0402a19f33c7052d87ceb81cb6c7)), closes [#6714](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6714)
* focus monitor cleanup ([#6562](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6562)) ([32b3254](https://github.com/NG-ZORRO/ng-zorro-antd/commit/32b3254c298787685c5152fa26cb27d59cc91407))


## 11.4.1

`2021-04-22`

### Bug Fixes

* ***:** create image using `document` method to avoid ReferenceError in SSR ([#6569](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6569)) ([d7b9291](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d7b9291dfd5f99cd3775245fd0e7cbef4f7141d0))
* **date-picker:** click outside not change value ([#6596](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6596)) ([62e4bb6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62e4bb6a349def081492a7d59dccc75db4622de0)), closes [#6595](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6595)
* **date-picker:** not switch month panel when range is same month ([#6616](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6616)) ([bf4ae4d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bf4ae4dab34edcb616a1f085f1504e7333580a47))
* **date-picker:** time picker panel not scroll at first time ([#6604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6604)) ([b97dfbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b97dfbedaf6b0bc422ff895394e5d5a9343e51d8))
* **graph:** fix edge default style and wrong toggling group nodes ([#6615](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6615)) ([c434ea9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c434ea9ce9a9299bf12a823c5bda1f5fe32ee82d))
* **i18n:** added property missing in ka_GE ([#6589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6589)) ([825925c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/825925ce8189b8b343b9a4f441956f47e376ae49))
* **slider:** fix range slider not working for arrow keys ([#6612](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6612)) ([51f33e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/51f33e6b4e4e71e3ac09cf5a77a255cb082924d8)), closes [#6586](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6586)
* **typography:** add type="button" attribute to button element in nz-text-copy component ([#6606](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6606)) ([48a9714](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48a97147ed78d87a69b745b060b176a9e57e314f)), closes [#6605](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6605)

## 11.4.0

`2021-04-08`

### Bug Fixes

* **table:** fix sort and filter when nzFrontPagination is false ([#6547](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6547)) ([097cb6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/097cb6c56b33358e9ef843dfe6a7ce4bd06daab5)), closes [#5457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5457)
* **date-picker:** close date-picker after tabbing out ([#6571](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6571)) ([21ded3f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/21ded3fa94689d52e01a008ee2eb7c0c541b886b)), closes [#5844](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5844)
* **drawer:** content is attached before the drawer is opened ([#6581](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6581)) ([ac50a7b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac50a7bc2c4866dddefe4f79459fd2d677b8528c)), closes [#6381](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6381) [#6534](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6534)
* **space:** fix deprecated warning for nz-space-item ([#6549](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6549)) ([#6561](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6561)) ([f80a5bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f80a5bbd5755477c63c5d73929bcdfd0d07f2dfd))
* **tabs:** make remove icon of nz-tab-link clickable ([#6563](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6563)) ([3a68c10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a68c106971270982280dd0d43a387cd1b016eb5))
* **tabs:** not scrolling to the selected tab after init ([#6580](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6580)) ([4ddd8fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4ddd8fb878641e603f9d79a79a9a7fde21b36e1a)), closes [#6579](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6579)


### Features

* **select:** support number as label ([#6538](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6538)) ([1f6ce76](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f6ce7635fa1b20370620615e77fe5165f55fae6)), closes [#6535](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6535)


## 11.3.0

`2021-03-23`

### Bug Fixes

* **mention:** preserve white spaces when insert suggestions ([#6505](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6505)) ([d5ed97e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5ed97e4aeeeb0635487652b7f1ecceed7caa4f0)), closes [#6175](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6175)
* **tooltip:** detect trigger change ([#6470](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6470)) ([e8e7dc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8e7dc35b75b67b2621ea690a93b20b5da755d8a)), closes [#6469](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6469)
* **dropdown:** dropdown animations ([#6143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6143)) ([70da5a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70da5a2f078fc864d309089421349b32b4d46649)), closes [#6018](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6018)
* **pagination:** fix class name in NzPaginationItemComponent ([#6485](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6485)) ([0e326e7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0e326e7c214b49d838ae071641d1b0f8c4e67840))
* **date-picker,core,i18n:** import date-fns by esm ([#6524](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6524)) ([fb4eeae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb4eeae9e6c3919d8c14c94f6225ace3510a0f64))
* **descriptions:** fix dom structure under vertical layout ([#6513](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6513)) ([ef0f3a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ef0f3a567f3feb135f21cf9c4e9e56468dcfc2d2))
* **modal:** fix incorrect assignment of 'nzFooter' ([#6468](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6468)) ([85ea273](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85ea2732e48d1de1e452be2176995a07c3ae8260)), closes [#6467](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6467)
* **rate:** fix invalid type of `nzCount` in `strictTemplates` ([#6457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6457)) ([4d28a60](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d28a60740740df79341d0c05c79debd9cce835e))
* **space:** add missing exports ([#6521](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6521)) ([e0073e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e0073e488969c97abd04f233b5cf8ab454c79604))
* **table:** virtual scroll bordered style ([#6493](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6493)) ([c2f44be](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c2f44bef7d07069dcb32f6b7f7cff8432ee621b5))
* **tooltip:** keep tooltip visibility when trigger is null ([#6489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6489)) ([0de0e6f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0de0e6f2424adde62e6869c9587602999cd534aa))


### Features

* **all:** global config for `nzBackdrop` ([#6380](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6380)) ([ba80ec3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba80ec3695f92b658fb4b40dbc26fd56bea2f7fb)), closes [#6029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6029) [#6177](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6177)
* **modal:** add nzModalTitle directive ([#6396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6396)) ([25f6c27](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25f6c273179195c4db4e1a066bad610286a6620c)), closes [#4343](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4343) [#6337](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6337)
* **space:** add `nzSplit` support ([#6487](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6487)) ([c535f06](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c535f06369b2aba7cf55fc2b5300c0cccc6eae1d))

_Deprecated_
- space: `nz-space-item` in `nz-space` will be removed in 12.0.0, please use `*nzSpaceItem` instead.

## 11.2.0

`2021-02-26`

### Bug Fixes

* **18n:** adding new translations de_DE ([#6434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6434)) ([1c09fe1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1c09fe15522c4d22691a7f30a66970c5cbbe67b6))
* **18n:** adding new translations es_ES ([#6421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6421)) ([6b878b9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b878b9ac3519ea669b8e010ebef960b392721ef))
* **docs:** fix dependabot alert ([#6428](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6428)) ([2fbbe94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2fbbe94cfa5923565ce61ad8f29326209ba84ab1))
* **dropdown:** close menu when click again ([#6353](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6353)) ([#6354](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6354)) ([cd90349](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd90349ff60db343b35dd1e2f47b134aeb16948d))
* **grid,menu,radio,table:** fix memory leak problem ([#6408](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6408)) ([94607a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/94607a0afacafdeccd942a525b3c5fce6491df7a))
* **input:** fix [nzAutosize]="true" ([#6409](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6409)) ([8ca1e5a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ca1e5aa6c5f02bdc308e60a9b5d2c9b602406ea))
* **message:** avoid flicker when window close ([#6296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6296)) ([#6370](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6370)) ([772e76c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/772e76cc23506cb368e7c717f409e3c6ef5351c6))
* **table:** fix table filter ([#6384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6384)) ([#6385](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6385)) ([ad01c8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad01c8f9deb263330389bc8b9b9f4c84b6ecbf2b))
* **tree-view:** correct API typo ([#6386](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6386)) ([27a1c4e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/27a1c4e620e8342594f152fba65c5105e991c369))
* **schematics:** fix `add-icon-assets`  schema path ([#6404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6404)) ([340670d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/340670d8f1d2277c6da64866dfe16f94d3fdac80))


### Features

* **date-picker:** add `nzInline` property ([#6436](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6436)) ([4d80873](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4d808734343178abfc8e1baac90a1539b05b4c60))
* **grid:** `nzGutter` support string type ([#6450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6450)) ([ec03c7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec03c7fb09845d5d8320801b26df549046ca447c))

* **time-picker:** support updating OK and Now button text ([#6410](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6410)) ([ef3af58](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ef3af58e23d1e12a1b3cccf547e990550a54fcde))
* **time-picker,select,tree-select:** support `nzId` ([#6379](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6379)) ([85d423d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/85d423d77468e493c71220374bfac676dfc9505c))


### Performance Improvements

* **select:** avoid reflow when select init ([#6452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6452)) ([342d2d1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/342d2d15bb1fb58b0fbd36c7a2bb8af183ef84c9))


## 11.1.0

`2021-01-22`


### Bug Fixes

* **table:** fix table `nzBordered` ([#6367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6367)) ([d6ca800](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d6ca8002ff1bc1482312f9a6340a453466627c01)), closes [#6135](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6135) [#6254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6254)
* **typography:** edit area cannot get the content ([#6369](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6369)) ([814ef92](https://github.com/NG-ZORRO/ng-zorro-antd/commit/814ef925f3b2c046309c388bc1b98506779a3eaf))


### Features

* **date-picker:** support nzId ([#6242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6242)) ([#6246](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6246)) ([1e9f8bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e9f8bd9d661ad00cfde7642118127e93247000b))
* **modal:** add nzCentered for modal ([#6333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6333)) ([8fd4df6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8fd4df66d858066dfafd3854dba339124fca866c)), closes [#6327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6327)
* **table:** add support for ReadonlyArray ([#6156](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6156)) ([9d67d0b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d67d0beac80032d07a56cd57829f3bd41da9b05))
* **table:** support nzPaginationType property ([#5986](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5986)) ([61ca6e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/61ca6e232a8a9625cd658abfe184ac45f2729ddf))
* **upload:** support `NzUploadFile` parameter of `nzIconRender` ([#6283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6283)) ([a949470](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a949470af22b9c212f96bef43ad1ef47b42b75e0)), closes [#6279](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6279)


## 11.0.2

`2021-01-18`

### Bug Fixes

* **carousel:** fix carousel under rtl ([#6336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6336)) ([f6a844b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f6a844b468d24ffcccb2c93e39367276778416a3))([#6318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6318))); ([bef7e29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bef7e29a3f994074abbea10512b8ec1ce213110e)), closes [#6301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6301)
* **date-picker:** remove wrong warning message ([#6335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6335)) ([cf10a03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cf10a03a7eb161b96ca01f47abfe926b1033854f)), closes [#6310](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6310)
* **date-picker:** start and end month displays unreasonable ([#6339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6339)) ([7f47698](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f476984a59fe4b5097d13a4ef6768dd63b6881e)), closes [#6308](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6308) [#6142](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6142) [#5992](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5992)
* **descriptions:** fix `nzBordered` in the global config ([#6348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6348)) ([eb20970](https://github.com/NG-ZORRO/ng-zorro-antd/commit/eb2097036f16c66ae351d2a099eb12e869ede5b6)), closes [#6331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6331)
* **image:** add missing entry components ([#6300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6300)) ([caad718](https://github.com/NG-ZORRO/ng-zorro-antd/commit/caad718e23f7617fc99aa4aa29928a9db55a1e76)), closes [#6299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6299)
* **table:**  memory leak ([#6325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6325)) ([7f267b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7f267b6ebc9c3259e6824702cad36382cc7df63e))

## 11.0.1

`2020-12-31`

### Bug Fixes

* **carousel:** remove unused patch style ([#6269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6269)) ([3a70a2d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a70a2dcf98ec13946e388649d4901a13dd5a1ba))
* **collapse:** animation cannot be disabled ([#6280](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6280)) ([16fa890](https://github.com/NG-ZORRO/ng-zorro-antd/commit/16fa890bf18d8a7f7d3bb9f63ae8e0cace057226))
* **image:** add missing imported modules ([#6273](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6273)) ([20db5d4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/20db5d4ab1bae943539386559d8188e94cc49127)), closes [#6271](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6271)
* **image:** image fit content when drag released ([#6262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6262)) ([07ae66a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07ae66a60285f9debf7176684ff66335f97c5a31))
* **modal:** mask is not set with the `nzZindex` property ([#6294](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6294)) ([54d294a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54d294a6bec56494992fefe6b2898f7af957df3b)), closes [#6288](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6288)
* **select:** change order for clear and arrow ([#6245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6245)) ([c822073](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c8220737c25bf4670a697729eaadc8e762e2404f)), closes [#5989](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5989)
* **slider:** fix slider style + reverse marks if reversed slider ([#6006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6006)) ([fa06415](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa064156ef59673556a62d741ae640494eefae32))
* **table:** data is not updated when pagination exists ([#6298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6298)) ([1f2ab41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1f2ab41fae89d0e674102c12b3960bfc7bddebab)), closes [#6272](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6272)
* **tabs:** fix clickable area of the anchor element ([#6278](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6278)) ([0694079](https://github.com/NG-ZORRO/ng-zorro-antd/commit/069407959850995f1a5ecbef0d71fa00c69b99a5))
* **tabs:** index only changed by router event when nzLinkRouter ([#6293](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6293)) ([ca1b861](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca1b861b410f92a60f214f34b39c2c5d3ae9ea63))


## 11.0.0

`2020-12-21`


## Highlights

### RTL Support

Set the dir attribute on the document body or html tag.
```html
<html dir="rtl"></html>
```

Or use Angular CDK bidi module for bi-directional.

```typescript
import {BidiModule} from '@angular/cdk/bidi';
```

Super thanks to [@saeedrahimi](https://github.com/saeedrahimi), [@hdm91](https://github.com/hdm91), [@HDaghash](https://github.com/HDaghash), [@hmdnikoo](https://github.com/hmdnikoo) for contributing this!

### New Image component

Used to handle progressive loading of images; failure fallback, and preview of image(s).

Super thanks to [@stygian-desolator](https://github.com/stygian-desolator) for contributing this!

### New Graph experimental component

Support customized multi-level graph rendering.

### New Tree View component

The previous Tree already contains many common features, and to handle more customizable scenarios we developed a more basic Tree View component with higher ability of customization and better control over performance.

### New built-in Aliyun theme

```less
@import "~ng-zorro-antd/ng-zorro-antd.aliyun.less";
```

### Bug Fixes

* **tree:** fix tree styles ([#6198](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6198)) ([a481a15](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a481a156278047472e1324b87df896b37246a0ed))
* **button:** only warn about deprecated value when used ([#6193](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6193)) ([40c644a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/40c644aa8fe92ccfaf26220a872b0995874b2569)), closes [#6191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6191) [#6187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6187)
* **i18n:** fix Ukrainian i18n file ([#6236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6236)) ([551c7a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/551c7a24c1ae0cec9f15f61bcaa12b9057de4bd0))
* **image:** fix RTL direction and props ([#6227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6227)) ([3978e0f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3978e0f48c3924fdbfda54e69438ea794b29a8ec))
* **list:** fix template rendering order ([#6232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6232)) ([4324011](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43240113c66c583e806f87b84b669a6ddb1faffe)), closes [#6229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6229)
* **modal:** fix `nzOkDanger` in confirm mode ([#6214](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6214)) ([ebe2869](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ebe2869d1b9459a8e02e3993d8a93483fa531f62))
* **select:** fix XSS vulnerabilities ([#6222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6222)) ([a393b89](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a393b89bf82eece5b0586592d709629865b27b3a)), closes [#6209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6209)
* **table:** false nzFrontPagination hides pagination ([#6201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6201)) ([8029ef4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8029ef47d6eeaf43aa5875f8a8034205dc9c69bb)), closes [#6196](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6196)
* **time-picker:** placeholder not update with i18n changes ([#6069](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6069)) ([f34840b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f34840bf2a4c5eb2d2facba0fa00068f6fa2bd5e))


### Features

* **all:** add RTL support to all ng-zorro-antd ([#4703](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4703)) ([860dfed](https://github.com/NG-ZORRO/ng-zorro-antd/commit/860dfeddcf02fc7e775615244827cb224d1aa8be)), closes [#4704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4704) [#1762](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1762) [#5261](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5261)
* **date-picker:** add `nzShowNow` ([#6160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6160)) ([99e3117](https://github.com/NG-ZORRO/ng-zorro-antd/commit/99e3117b70853c0aa4f6b4f475b031734840f10f)), closes [#6146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6146)
* **graph:** add graph component ([#6053](https://github.com/NG-ZORRO/ng-zorro-antd/pull/6053)) ([e69303f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e69303f828132cb62263867abe8afefc600f15f6))
* **image:** add image component ([#6154](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6154)) ([83dfdf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/83dfdf97b5a716e1cc9424d645dfc6713fe4ba64))
* **tree-view:** add tree-view component ([#6161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6161)) ([05d58de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05d58de21f8a3e4d3e2bf4d4333de95a2c71e1ed)), closes [#5976](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5976) [#5809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5809) [#5739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5739) [#5736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5736) [#5519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5519) [#5446](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5446) [#5152](https://github.com/NG-ZORRO/ng-zorro-antd/issues/5152) [#4694](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4694) [#4472](https://github.com/NG-ZORRO/ng-zorro-antd/issues/4472) [#3832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/3832) [#2785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2785) [#2744](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2744) [#6199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6199)
* **schematics:** make ng-add schematics chainable ([#6203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/6203)) ([d1e76f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d1e76f3d8d41b0e3b9f01887e4805ff43f48d0fa))

### BREAKING CHANGES

**date-picker**
- `[nzMode]` does not support `NzDateMode[]` type any more, please adjust it manually.

**modal**
- `[nzGetContainer]` has been removed, please remove it manually.
- `open` method in `NzModalRef` has been removed, please remove it manually.

**tabs**
- `[nzShowPagination]` input has been removed, please remove it manually.
- `(nzOnPrevClick)` output has been removed, please remove it manually.
- `(nzOnNextClick)` output has been removed, please remove it manually.
- `a[nz-tab-link]` selector has been removed, please use `ng-template[nzTabLink] > a[nz-tab-link]` instead.

## Old Versions

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)
