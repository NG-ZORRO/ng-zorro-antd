---
order: 9
title: Change Log
toc: false
timeline: true
---
`ng-zorro-antd` strictly follows [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/).

#### Release Schedule

* Weekly release: patch version at the end of every week for routine bugfix (anytime for urgent bugfix).
* Monthly release: minor version at the end of every month for new features.
* Major version release is not included in this schedule for breadking change and new features.

---
## 1.8.0
`2018-10-26`

### Bug Fixes

* **calendar:** fix calendar year picker ([#2355](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2355)) ([a4a948c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a4a948c)), closes [#2351](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2351)
* **esm5:** fix esm5 package ([#2357](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2357)) ([e06b9a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e06b9a7)), closes [#2339](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2339)
* **layout:** fix layout init breakpoint nzCollapsed value ([#2350](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2350)) ([8f58fae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8f58fae)), closes [#2343](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2343)
* **menu:** fix menu level 4 padding error ([#2356](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2356)) ([7906066](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7906066)), closes [#2327](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2327)
* **spin:** fix spin hang error with submenu ([#2352](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2352)) ([65fc10a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65fc10a)), closes [#2346](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2346)
* **tree:** fix icon to svg & draggable event listener ([#2338](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2338)) ([8bc488e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8bc488e)), closes [#2332](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2332) [#2205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2205) [#2336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2336)
* **tree-select:** can't work default values in OnPush mode ([#2364](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2364)) ([04cf7aa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/04cf7aa)), closes [#2318](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2318) [#2085](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2085)


### Features

* **icon:** add injectiontoken config and default twotone color ([#2353](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2353)) ([bea1d05](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bea1d05))
* **list:** list empty style ([#2365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2365)) ([e2d09a0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e2d09a0)), closes [#2362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2362)


### Performance Improvements

* **upload:** optimize invalid parameter warning ([#2363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2363)) ([ee31a4e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee31a4e)), closes [#2322](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2322)


## 1.7.1
`2018-10-23`

### Bug Fixes

* **drawer:** style error when the unit is percentage ([#2334](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2334)) ([9e07702](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e07702)), closes [#2333](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2333)
* **icon:** fix icon miss in components ([#2321](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2321)) ([af4ddfb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af4ddfb)), closes [#2326](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2326)
* **icon:** fix icons problems ([#2325](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2325)) ([8a0d412](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a0d412))
* **schematics:** fix object comparisons method ([#2328](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2328)) ([a7beda8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a7beda8))


## 1.7.0

`2018-10-18`

### Note for SVG icon

After `1.7.0` version，we synced to Ant Design `3.9.x` and replaced font icons with svg icons which bring benefits below:

- Complete offline usage of icon, no dependency of alipay cdn font icon file and no more empty square during downloading than no need to deploy icon font files locally either.
- Much more display accuracy in lower-level screens.
- Support multiple colors for icon.
- No need to change built-in icons with overriding styles by providing more props in component.

We make the old API compatible to this new component. You don't need to change your code but some configuration is required perhaps. You can find more about Icon API in section ["SVG icon"](/components/icon/en#svg-icons) and ["Static loading and dynamic loading"](/components/icon/en#static-loading-and-dynamic-loading).


### Bug Fixes

* **tabs:** hide next and prev buttons when nzTabPosition is left or right ([#2239](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2239)) ([3bb8be5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bb8be5))
* **breadcrumb:** navigate within angular ([#2283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2283)) ([0c41306](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0c41306)), closes [#2254](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2254)
* **button:** fix button loading bug ([#2251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2251)) ([cb71e9b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb71e9b)), closes [#2191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2191)
* **cascader:** fix error when nzOptions change and in search mode ([#2241](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2241)) ([c3c2d26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c3c2d26)), closes [#2105](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2105)
* **cascader:** fix support to nzLabelProperty ([#2231](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2231)) ([37523c8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37523c8)), closes [#2103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2103)
* **date-picker:** fix the calendar not shown up when click on the icon ([#2235](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2235)) ([8ffcfac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ffcfac)), closes [#2221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2221)
* **date-picker:** use fixed width when "nzShowTime" settled for picker ([#2236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2236)) ([463a14c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/463a14c))
* **icon:** fix broken icons ([#2248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2248)) ([e0d9987](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e0d9987))
* **icon:** fix icon classname writeback ([#2259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2259)) ([c6337c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c6337c2))
* **list:** fix does not trigger change detection correctly when from empty array to data array ([#2199](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2199)) ([92c1a85](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92c1a85))
* **select:** fix space closing select panel ([#2240](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2240)) ([3d7fe39](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d7fe39)), closes [#2201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2201)
* **select,tree-select:** prevent pop the dropdown when click remove ([#2290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2290)) ([4fa9367](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4fa9367)), closes [#2276](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2276)
* **spin:** fix cdk change detection ([#2255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2255)) ([25671b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/25671b6)), closes [#1819](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1819)
* **table:** fix filter table header in ant design 3.10 ([#2260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2260)) ([ebf151a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ebf151a))
* **upload:** fix only allow type is picture or picture-card generate thumbnail ([#2219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2219)) ([8306111](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8306111)), closes [#2216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2216)


### Features

* **icon:** switch to SVG icons ([#2171](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2171)) ([7bdb79b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7bdb79b))
* **modal:** auto focus when open and restore focus when close ([#2188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2188)) ([7c0ced4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c0ced4)), closes [#2124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2124)
* **schematics:** add fix icon schematic ([#2238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2238)) ([8861beb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8861beb))


---

## 1.6.0
`2018-09-22`

### Bug Fixes

* **date-picker:** fix year-picker and month-picker style error within compacted input group ([#2136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2136)) ([049212f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/049212f))
* **calendar:** fix calendar year list ([#2140](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2140)) ([e485d02](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e485d02)), closes [#2091](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2091)
* **cascader:** search correctly when a root node is a leaf node ([#2108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2108)) ([28556e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28556e4)), closes [#2104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2104)
* **drawer:** drawer content cannot scroll ([#2120](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2120)) ([e8dad8f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e8dad8f)), closes [#2119](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2119)
* **steps:** fix dynamic steps error ([#2149](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2149)) ([ee3fa7e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee3fa7e)), closes [#2148](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2148)
* **publish:** add version number validation and rename script ([#2117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2117)) ([bc1f6fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc1f6fa))
* **schematics:** compatibility with Angular CLI 6.2.0 ([#2131](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2131)) ([ac428db](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ac428db))
* **test:** fix test coverage dependency ([#2146](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2146)) ([310771f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/310771f))
* **upload:** fix typo ([#2173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2173)) ([69c5210](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69c5210))


### Features

* **drawer:** support service to create drawer ([#1981](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1981)) ([a232d59](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a232d59)), closes [#1937](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1937)
* **upload:** add directory support ([#2164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2164)) ([3ef8bcf](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3ef8bcf)), closes [#2167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2167) [#2154](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2154)
* **tree:** support more functions & property ([#2121](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2121))
* **skeleton:** add skeleton component ([#1829](https://github.com/NG-ZORRO/ng-zorro-antd/pull/1829))


### Build

* **build:** use ng-packagr to generate library ([#2126](https://github.com/NG-ZORRO/ng-zorro-antd/pull/2126))


### Performance Improvements

* **table:** improve table performance ([#2157](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2157)) ([cde5fb0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cde5fb0))

## 1.5.0
`2018-09-09`

### Bug Fixes

* **drawer:** provide custom scroll strategy ([#2095](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2095)) ([b993068](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b993068)), closes [#2070](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2070)
* **modal:** fix generic type of the "nzComponentParams" for user to gain more type intellisense ([#1812](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1812)) ([6ef1185](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6ef1185))


### Features

* **breadcrumb:** support auto generated breadcrumb ([#2050](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2050)) ([64d191c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64d191c)), closes [#2001](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2001)
* **button:** support block style ([#2051](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2051)) ([2858ba1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2858ba1)), closes [#2047](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2047)
* **drawer:** support top and bottom placement ([#2039](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2039)) ([693b4eb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/693b4eb)), closes [#2015](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2015)
* **modal:** support customized modal config (current "autoBodyPadding") ([#2006](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2006)) ([1d5e06c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1d5e06c)), closes [#1720](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1720)
* **select:** support open and close panel via keyboard ([#2038](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2038)) ([b2ea96a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b2ea96a)), closes [#1909](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1909)
* **steps:** support customized starting index ([#2021](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2021)) ([bc7bf17](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc7bf17)), closes [#1994](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1994)
* **publish:** add publish script ([#1979](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1979)) ([98cb651](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98cb651)), closes [#1925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1925)

## 1.4.1
`2018-09-02`

### Bug Fixes

* **auto-complete:** can't select option when touch ([#2054](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2054)) ([2e8e63d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e8e63d)), closes [#2053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2053)
* **modal:** close modal itself before destructing by the angular's lifecycle ([#1769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1769)) ([075c7a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/075c7a4)), closes [#1663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1663)
* **pagination:** take minimum of page range and total ([#2046](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2046)) ([30bccd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30bccd1)), closes [#2036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2036)
* **table:** fix row spaces ([#2061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2061)) ([cb34983](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb34983)), closes [#2059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2059)
* **tree-select:** unable close when used OnPush ([#2028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2028)) ([fb83354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb83354)), closes [#2012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2012)


## 1.4.0
`2018-08-19`

### Bug Fixes

* **avatar:** tolerate error src ([#2008](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2008)) ([d55cdf2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d55cdf2))
* **carousel:** carousel on desktop can't slide images ([#1970](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1970)) ([02a84a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/02a84a9))
* **cascader:** fix dynamic loading error ([#1931](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1931)) ([d4d24fb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d4d24fb)), closes [#1927](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1927)
* **cascader:** should not change on hover work ([#1991](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1991)) ([577ae47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/577ae47)), closes [#1966](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1966)
* **select:** fix input not blur after user hits enter key ([#1943](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1943)) ([a64d04c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a64d04c)), closes [#1940](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1940)
* **tooltip,popconfirm,popover:** not create element when use directive ([#1968](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1968)) ([fa40145](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fa40145)), closes [#1967](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1967)
* **tree-select:** update selected nodes when after set nodes ([#1946](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1946)) ([cd928e1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd928e1)), closes [#1934](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1934)
* **tree:** fix loading style ([#1942](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1942)) ([19fc2ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/19fc2ee))


### Features

* **modal:** smart to determine whether to add padding-right ([#1877](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1877)) ([a5d631d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a5d631d)), closes [#1422](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1422)
* **timeline:** custom circle color ([#1959](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1959)) ([fb3daa1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb3daa1)), closes [#1956](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1956)


## 1.3.0
`2018-08-03`

### Bug Fixes

* **auto-complete:** reposition when open the first time ([#1863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1863)) ([c80bc8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bc8d)), closes [#1840](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1840)
* **date-picker:** restrict the date when it overflows at the month panel ([#1903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1903)) ([3c654a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c654a5)), closes [#1899](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1899)


### Features

* **cascader:** add cascader search ([#1873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1873)) ([633bc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/633bc87)), closes [#1773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1773)
* **date-picker:** refactoring and add new feature of year-picker ([#1906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1906)) ([f1f5625](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f5625)), closes [#416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/416)
* **drawer:** add drawer component ([#1789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1789)) ([33aff47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33aff47)), closes [#1565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1565)
* **radio:** add solid button style ([#1892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1892)) ([945a924](https://github.com/NG-ZORRO/ng-zorro-antd/commit/945a924)), closes [#1891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1891)
* **table:** support default filter ([#1893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1893)) ([cea0e51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cea0e51)), closes [#1872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1872)


## 1.2.0
`2018-07-22`

### Bug Fixes

* **carousel:** resize content after window resized ([#1815](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1815)) ([1e0a029](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1e0a029)), closes [#1811](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1811)
* **input-number:** NzAutoFocus doesn't work or work as expected ([#1833](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1833)) ([739b353](https://github.com/NG-ZORRO/ng-zorro-antd/commit/739b353)), closes [#1706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1706)
* **tree:** sync checked node status and push to checkedNodeList ([#1809](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1809)) ([5305723](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5305723)), closes [#1802](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1802)
* **input:** mix using addon and affix ([#1857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1857)) ([ca2d7e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca2d7e0)), closes [#1795](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1795)
* **input-number:** fix touched event ([#1858](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1858)) ([7c90a72](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7c90a72)), closes [#1785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1785)
* **tabs:** prevent focus cause scroll offset ([#1845](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1845)) ([bbcb0de](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bbcb0de)), closes [#1821](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1821)
* **upload:** fix parameter value muse be a function or boolean in nzRemove ([#1851](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1851)) ([3532bbe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3532bbe)), closes [#1850](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1850)


### Features

* **carousel:** add swipe gesture support ([#1856](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1856)) ([bb5bdd3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bb5bdd3)), closes [#1816](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1816)
* **carousel:** support dot render template ([#1860](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1860)) ([c1f15b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c1f15b6)), closes [#1743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1743)
* **form:** support touched status update ([#1861](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1861)) ([27ca5bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/27ca5bc)), closes [#1665](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1665)
* **tree-select:** support custom display in the trigger ([#1832](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1832)) ([1cc3646](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1cc3646)), closes [#1823](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1823)


## 1.1.1
`2018-07-02`

### Bug Fixes

* **tree:** fix disabled node status & doc ([#1737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1737)) ([92675e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/92675e4)), closes [#1721](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1721)
* **auto-complete, mention, tree-select:** update cdk overlay positioning strategy ([#1761](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1761)) ([82af2ff](https://github.com/NG-ZORRO/ng-zorro-antd/commit/82af2ff)), closes [#1756](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1756)
* **date-picker:** support changing language at runtime ([#1768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1768)) ([9caabb5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9caabb5)), closes [#1717](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1717)
* **list:** fix loading style misplacement of spin ([#1767](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1767)) ([336cc08](https://github.com/NG-ZORRO/ng-zorro-antd/commit/336cc08)), closes [#1739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1739)
* **radio:** fix radio disabled bug in group ([#1746](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1746)) ([86fc773](https://github.com/NG-ZORRO/ng-zorro-antd/commit/86fc773)), closes [#1734](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1734)
* **radio:** fix radio in reactive form ([#1748](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1748)) ([b7a831d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7a831d)), closes [#1735](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735)
* **select:** trigger keyboard on ios ([#1653](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1653)) ([#1751](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1751)) ([89d05f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/89d05f9)), closes [#1752](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1752) [#1274](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1274)
* **transfer:** fix title dislocation when form-item layout ([#1745](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1745)) ([4005c7c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4005c7c)), closes [#1732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1732)
* **tree-select:** fix unable to set null ([#1760](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1760)) ([689f8b4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/689f8b4)), closes [#1740](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1740)
* **tree-select:** width is 0 when trigger element is invisible ([#1775](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1775)) ([4eb039a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4eb039a)), closes [#1772](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1772)
* **table:** fix selector error ([#1742](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1742)) ([aeb485f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aeb485f)), closes [#1736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1736)

### Features

* **carousel:** support autoplay speed ([#1741](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1741)) ([a516949](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a516949)), closes [#1711](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1711)


## 1.1.0
`2018-06-25`

### Bug Fixes

* ** cascader:** fix custom render with nzClear ([#1676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1676)) ([c683bc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c683bc3)), closes [#1646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1646)
* **autocomplete:** AOT compiler requires public properties ([#1686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1686)) ([a1f326d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1f326d)), closes [#1683](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1683)
* **card:** fix card loading style ([#1696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1696)) ([70cb591](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70cb591)), closes [#1695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1695)
* **date-picker:** fix date display of the end part is not as expected ([#1709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1709)) ([b1a1235](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1a1235)), closes [#1693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1693)
* **nz-alert:** emit close after fade animation is done ([#1667](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1667)) ([6b31ca3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b31ca3)), closes [#1666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1666)
* **select:** move select ovarlay to the last of container ([#1673](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1673)) ([442e3f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/442e3f3)), closes [#1672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1672) [#1643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1643)
* **table:** fix table th filter & style bug ([#1674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1674)) ([1a4332a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a4332a)), closes [#1671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1671) [#1660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1660)
* **tree-select:** position error when in the modal-box ([#1687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1687)) ([43910f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43910f9)), closes [#1681](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1681)
* **ng-add:** remove compiled css from styles when use custom theme ([#1655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1655)) ([fc67ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc67ce5))
* **showcase:** use differenceInCalendarDays to do judgement with days for date-picker's demo ([#1648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1648)) ([7d593e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d593e6))


### Features

* **table:** support nzSimple option ([#1699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1699)) ([4868c41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4868c41)), closes [#1599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1599)



## 1.0.0
`2018-06-11`

We released the first version of ng-zorro-antd 10 months ago. In those 10 months we received PRs from more than 35 contributors. Underwent about 386 commits and 35 [releases](https://github.com/NG-ZORRO/ng-zorro-antd/releases).

**Today, we are happy to announce that ng-zorro-antd 1.0 has finally been released. **

In this release we supported i18n in 35 languages, provided all components same as [react version](https://ant.design/docs/react/introduce), refactored code for multiple underlying components, introduced new features of [schematics](https://blog.angular.io/schematics-an-introduction-dc1dfbc2a2b2). We made this change to clarify cross compatibility.

All releases notes can be found [here](https://github.com/NG-ZORRO/ng-zorro-antd/releases)