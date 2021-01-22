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
