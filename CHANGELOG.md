<a name="1.6.0"></a>
# [1.6.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.5.0...1.6.0) (2018-09-22)


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



<a name="1.5.0"></a>
# [1.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.4.1...1.5.0) (2018-09-09)


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



<a name="1.4.1"></a>
## [1.4.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.4.0...1.4.1) (2018-09-02)


### Bug Fixes

* **auto-complete:** can't select option when touch ([#2054](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2054)) ([2e8e63d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e8e63d)), closes [#2053](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2053)
* **modal:** close modal itself before destructing by the angular's lifecycle ([#1769](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1769)) ([075c7a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/075c7a4)), closes [#1663](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1663)
* **pagination:** take minimum of page range and total ([#2046](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2046)) ([30bccd1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/30bccd1)), closes [#2036](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2036)
* **table:** fix row spaces ([#2061](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2061)) ([cb34983](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb34983)), closes [#2059](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2059)
* **tree-select:** unable close when used OnPush ([#2028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2028)) ([fb83354](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fb83354)), closes [#2012](https://github.com/NG-ZORRO/ng-zorro-antd/issues/2012)



<a name="1.4.0"></a>
# [1.4.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.3.0...1.4.0) (2018-08-19)


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



<a name="1.3.0"></a>
# [1.3.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.2.0...1.3.0) (2018-08-03)


### Bug Fixes

* **auto-complete:** reposition when open the first time ([#1863](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1863)) ([c80bc8d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bc8d)), closes [#1840](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1840)
* **date-picker:** restrict the date when it overflows at the month panel ([#1903](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1903)) ([3c654a5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3c654a5)), closes [#1899](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1899)


### Features

* **cascader:** add cascader search ([#1873](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1873)) ([633bc87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/633bc87)), closes [#1773](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1773)
* **date-picker:** refactoring and add new feature of year-picker ([#1906](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1906)) ([f1f5625](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f5625)), closes [#416](https://github.com/NG-ZORRO/ng-zorro-antd/issues/416)
* **drawer:** add drawer component ([#1789](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1789)) ([33aff47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/33aff47)), closes [#1565](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1565)
* **radio:** add solid button style ([#1892](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1892)) ([945a924](https://github.com/NG-ZORRO/ng-zorro-antd/commit/945a924)), closes [#1891](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1891)
* **table:** support default filter ([#1893](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1893)) ([cea0e51](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cea0e51)), closes [#1872](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1872)



<a name="1.2.0"></a>
# [1.2.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.1.1...1.2.0) (2018-07-22)


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

<a name="1.1.1"></a>
## [1.1.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.1.0...1.1.1) (2018-07-02)


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



<a name="1.1.0"></a>
# [1.1.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/1.0.0...1.1.0) (2018-06-25)


### Bug Fixes

* **cascader:** fix custom render with nzClear ([#1676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1676)) ([c683bc3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c683bc3)), closes [#1646](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1646)
* **autocomplete:** AOT compiler requires public properties ([#1686](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1686)) ([a1f326d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a1f326d)), closes [#1683](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1683)
* **card:** fix card loading style ([#1696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1696)) ([70cb591](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70cb591)), closes [#1695](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1695)
* **date-picker:** fix date display of the end part is not as expected ([#1709](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1709)) ([b1a1235](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b1a1235)), closes [#1693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1693)
* **nz-alert:** emit close after fade animation is done ([#1667](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1667)) ([6b31ca3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b31ca3)), closes [#1666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1666)
* **select:** move select ovarlay to the last of container ([#1673](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1673)) ([442e3f3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/442e3f3)), closes [#1672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1672) [#1643](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1643)
* **th:** fix table th filter & style bug ([#1674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1674)) ([1a4332a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a4332a)), closes [#1671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1671) [#1660](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1660)
* **tree-select:** position error when in the modal-box ([#1687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1687)) ([43910f9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/43910f9)), closes [#1681](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1681)
* **ng-add:** remove compiled css from styles when use custom theme ([#1655](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1655)) ([fc67ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fc67ce5))
* **showcase:** use differenceInCalendarDays to do judgement with days for date-picker's demo ([#1648](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1648)) ([7d593e6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7d593e6))


### Features

* **table:** support nzSimple option ([#1699](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1699)) ([4868c41](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4868c41)), closes [#1599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1599)



<a name="1.0.0"></a>
# [1.0.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.1...1.0.0) (2018-06-11)


### Bug Fixes

* **tree:** fix nzOnSearchChange & folder tree demo ([#1602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1602)) ([b8e4432](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b8e4432)), closes [#1601](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1601)
* **tree:** support custom property ([#1584](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1584)) ([1ca696a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ca696a)), closes [#1580](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1580)
* **checkbox:** fix invalid setting width via style ([#1577](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1577)) ([ec4be6b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec4be6b)), closes [#1359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1359)
* **modal:** fix multiple nzOnCancel calls ([#1590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1590)) ([bc07be2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bc07be2)), closes [#958](https://github.com/NG-ZORRO/ng-zorro-antd/issues/958)
* **modal:** miss returned value from nzOnOk or nzOnCancel ([#1456](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1456)) ([9d6e93b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9d6e93b))
* **pagination:** fix still show when total is 0 and  nzHideOnSinglePage is true ([#1583](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1583)) ([c5c33d0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c5c33d0))
* **popover:** fix popover nzTemplate value ([#1608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1608)) ([7cf6ee1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7cf6ee1))
* **radio:** fix nzDisabled in radio-group ([#1574](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1574)) ([024c488](https://github.com/NG-ZORRO/ng-zorro-antd/commit/024c488)), closes [#1543](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543)
* **spin:** fix spin error in antd 3.6.1 ([#1607](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1607)) ([8a1a9ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8a1a9ca))
* **transfer:** fix TransferItem type to work with strictNullChecks ([#1589](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1589)) ([7601af1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7601af1)), closes [#1588](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1588)
* **ng-add:** duplicate add bugs ([#1623](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1623)) ([214a00d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/214a00d))
* **ng-add:** fix import path in theme file ([#1611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1611)) ([aa953dc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aa953dc))


### Features

* **tree:** sync ant style & add dir demo ([#1559](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1559)) ([0fbf135](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0fbf135))
* **table:** add nzHideOnSinglePage property ([#1585](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1585)) ([3bc2e90](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3bc2e90))
* **schematic:** support ng add & ng generate ([#1430](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1430)) ([9ed3590](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9ed3590)), closes [#1405](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1405)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0...0.7.1) (2018-05-24)


### Bug Fixes

* **tab:** fix vertical-bar error in docs ([#1499](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1499)) ([e5d5860](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5d5860))
* **autocomplete:** form related bugs ([#1451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1451)) ([c91a0f8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c91a0f8)), closes [#1437](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1437)
* **date-picker:** improve the horizontal position adaptability ([#1495](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1495)) ([64f5ce5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/64f5ce5)), closes [#1450](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1450)
* **input-number:** fix focused style could not be removed after blur ([#1453](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1453)) ([80a559f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80a559f)), closes [#1449](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1449)
* **menu:** fix menu ngfor bug ([#1519](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1519)) ([4f6c266](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4f6c266))
* **message:** increase the overlay's zindex tobe the same with… ([#1461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1461)) ([5a51344](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a51344)), closes [#1457](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1457)
* **popconfirm:** add nzOkType support ([#1492](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1492)) ([6f394a4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6f394a4)), closes [#1312](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1312)
* **sider:** fix typo - isSiderTrgger to isSiderTrigger ([#1434](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1434)) ([f1f26ad](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f1f26ad))


### Features

* **input-number:** support input-number placeholder ([#1512](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1512)) ([7e3d4e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7e3d4e4))
* **autocomplete:** support bind any types to the nzModule of trigger element ([#1397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1397)) ([b44296e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b44296e)), closes [#1298](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1298)
* **switch:** support fully control by user ([#1514](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1514)) ([70ca8bd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/70ca8bd))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.5...0.7.0) (2018-05-15)


### Bug Fixes

* **tree:** fix wrong checked nodes ([#1425](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1425)) ([5a06694](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5a06694)), closes [#1423](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1423)
* **autocomplete:** fix styles ([#1393](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1393)) ([5ad0452](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5ad0452)), closes [#1384](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1384)
* **steps:** fix steps ngfor ([#1421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1421)) ([35da659](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35da659)), closes [#1418](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1418)



<a name="0.7.0-beta.5"></a>
# [0.7.0-beta.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.4...0.7.0-beta.5) (2018-05-01)


### Bug Fixes

* **input-number:** fix display value after formatter changed ([#1371](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1371)) ([179c1e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/179c1e2))
* **upload:** fix ngModel was changed to nzPercent in nz-progress ([#1320](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1320)) ([9b7336e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9b7336e)), closes [#1209](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1209)


### Features

* **time-picker:** support null value in time-picker-panel ([#1388](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1388)) ([1ca1490](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1ca1490))



<a name="0.7.0-beta.4"></a>
# [0.7.0-beta.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.3...0.7.0-beta.4) (2018-04-12)


### Bug Fixes

* **tree:** add origin param to NzTreeNode ([#1221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1221)) ([c9686ca](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c9686ca))
* **card:** fix avatar and detail alignment ([#1255](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1255)) ([6b13ce0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b13ce0))
* **carousel:** fix carousel autoplay bug ([#1309](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1309)) ([dd3265d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dd3265d)), closes [#1242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1242)
* **i18n:** fix i18n error without locale ([#1220](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1220)) ([880f0e8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/880f0e8))
* **mention:** getMention method should kepp the mention prefix ([#1287](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1287)) ([7925f48](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7925f48))
* **menu:** fix menu ExpressionChangedAfterItHasBeenCheckedError ([#1306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1306)) ([e63668d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e63668d)), closes [#1216](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1216)
* **docs:** change the homepage url of angular.cn ([#1289](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1289)) ([471e064](https://github.com/NG-ZORRO/ng-zorro-antd/commit/471e064))
* **message,notification:** fix message/notification cause multi-detection error while used in dynamic creating component ([#1218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1218)) ([f2624cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f2624cb)), closes [#391](https://github.com/NG-ZORRO/ng-zorro-antd/issues/391)
* **select:** fix select zero value & scroll bug ([#1299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1299)) ([0552141](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0552141)), closes [#1229](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1229) [#1245](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1245)
* **table:** fix scrollbar calc ([#1315](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1315)) ([0416900](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0416900)), closes [#1205](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1205)
* **table:** fix table th filter style ([#1300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1300)) ([29c559a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/29c559a)), closes [#1238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1238)
* **tag:** fix default color when empty color values ([#1256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1256)) ([ba3a323](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ba3a323))
* **transfer:** removed change detection ([#1260](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1260)) ([d507848](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d507848)), closes [#996](https://github.com/NG-ZORRO/ng-zorro-antd/issues/996)


### Features

* **mention:** add mention component ([#1182](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1182)) ([e28c1b5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e28c1b5))
* **mention:** add prefix property to nzOnSearchChange payload ([#1296](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1296)) ([1af5b42](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1af5b42))



<a name="0.7.0-beta.3"></a>
# [0.7.0-beta.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.7.0-beta.1...0.7.0-beta.3) (2018-03-26)


### Bug Fixes

* **i18n:** fix doc ([#1186](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1186)) ([4ba77c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4ba77c2))
* **card:** fix card style ([#1194](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1194)) ([ad80297](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad80297)), closes [#1191](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1191)
* **form:** fix form init style miss & fix doc ([#1174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1174)) ([ab37862](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ab37862)), closes [#1170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1170) [#1173](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1173)
* **input:** fix input disable style in reactive form ([#1167](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1167)) ([5c07161](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5c07161))
* **table & i18n:** fix table style & export i18n interface ([#1163](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1163)) ([fdd03d7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/fdd03d7))


### Features

* **modal:** add afterOpen/afterClose/afterAllClose/closeAll/openModals, adjust the boolean props and changeBodyOverflow and complete testing. ([#1165](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1165)) ([10227b8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10227b8)), closes [#1155](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1155) [#1162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1162)
* **modal:** support triggerOk/triggerCancel to trigger nzOnOk/nzOnCancel manually ([#1201](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1201)) ([8cc016e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8cc016e))



<a name="0.7.0-beta.1"></a>
# [0.7.0-beta.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.10...0.7.0-beta.1) (2018-03-15)


### Bug Fixes

* **back-top:** fix style ([#1125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1125)) ([60fe850](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60fe850))
* **calendar:** use correct classNames ([#1118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1118)) ([5392fde](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5392fde))
* **list:** change contentchild to input ([#1100](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1100)) ([5d9133b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5d9133b))
* **progress:** fix 100% when specify invalid value ([#905](https://github.com/NG-ZORRO/ng-zorro-antd/issues/905)) ([8afedaa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8afedaa))
* **spin:** remove spin container if no content ([7639eac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7639eac))
* **spin:** support dynamic ng-content in spin ([#925](https://github.com/NG-ZORRO/ng-zorro-antd/issues/925)) ([cc7a83b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cc7a83b))
* **transfer:** change contentchild to input ([#1099](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1099)) ([abb7de0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/abb7de0))


### Features

* **affix anchor backtop:** refactor affix anchor backtop ([#1025](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1025)) ([24abd10](https://github.com/NG-ZORRO/ng-zorro-antd/commit/24abd10))
* **autocomplete:** add autocomplete component ([#1093](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1093)) ([1461293](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1461293))
* **avatar:** add avatar component ([#1028](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1028)) ([65535d5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/65535d5))
* **divider:** add divider component ([#1029](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1029)) ([7895e80](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7895e80))
* **divider:** add nzOrientation property ([#1126](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1126)) ([e100681](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e100681))
* **doc:** support sync single demo dir ([#936](https://github.com/NG-ZORRO/ng-zorro-antd/issues/936)) ([73e4a95](https://github.com/NG-ZORRO/ng-zorro-antd/commit/73e4a95))
* **list:** add list component ([#1031](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1031)) ([9e71deb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9e71deb))
* **list:** add nz-list component ([6481a88](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6481a88))
* **menu dropdown:** refactor menu dropdown & add test & add doc ([#990](https://github.com/NG-ZORRO/ng-zorro-antd/issues/990)) ([ca1d4e2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca1d4e2))
* **tree:** add tree component ([#1147](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1147)) ([7ca5de3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7ca5de3))
* **upload:** add upload component ([#1040](https://github.com/NG-ZORRO/ng-zorro-antd/issues/1040)) ([a9efbaa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a9efbaa))



<a name="0.6.10"></a>
## [0.6.10](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.9...0.6.10) (2018-01-06)


### Bug Fixes

* **affix:** fix affix nzOffsetTop bug ([#868](https://github.com/NG-ZORRO/ng-zorro-antd/issues/868)) ([f0bad26](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f0bad26))
* **radio:** fix radio button click bug ([#867](https://github.com/NG-ZORRO/ng-zorro-antd/issues/867)) ([2de24ee](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2de24ee)), closes [#854](https://github.com/NG-ZORRO/ng-zorro-antd/issues/854) [#857](https://github.com/NG-ZORRO/ng-zorro-antd/issues/857) [#855](https://github.com/NG-ZORRO/ng-zorro-antd/issues/855)


### Features

* **datepicker:** add range-picker component ([#656](https://github.com/NG-ZORRO/ng-zorro-antd/issues/656)) ([9df3eb9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9df3eb9))
* **locale:** support russian locale ([#853](https://github.com/NG-ZORRO/ng-zorro-antd/issues/853)) ([8d65a83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8d65a83))



<a name="0.6.9"></a>
## [0.6.9](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.8...0.6.9) (2018-01-02)


### Bug Fixes

* **calendar:** fix month/year view switched ([#768](https://github.com/NG-ZORRO/ng-zorro-antd/issues/768)) ([383a0f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/383a0f4))
* **transfer:** 1.fix the "checkAll" status not updated 2.change "ArrayObservable.of" to "of" ([#834](https://github.com/NG-ZORRO/ng-zorro-antd/issues/834)) ([9c023fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9c023fa))


### Features

* **radio:** use nz-radio components alone ([#825](https://github.com/NG-ZORRO/ng-zorro-antd/issues/825)) ([15c968c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/15c968c))
* **transfer:** add canMove property & make component using OnPush ([#824](https://github.com/NG-ZORRO/ng-zorro-antd/issues/824)) ([d31c596](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d31c596))



<a name="0.6.8"></a>
## [0.6.8](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.7...0.6.8) (2017-12-21)


### Bug Fixes

* **modal:** fix modal type error ([#784](https://github.com/NG-ZORRO/ng-zorro-antd/issues/784)) ([cb0ab64](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cb0ab64))
* **overlay:** update overlay width when the host component's width change ([#780](https://github.com/NG-ZORRO/ng-zorro-antd/issues/780)) ([62fc733](https://github.com/NG-ZORRO/ng-zorro-antd/commit/62fc733)), closes [#779](https://github.com/NG-ZORRO/ng-zorro-antd/issues/779)
* **popconfirm:** fix backdrop of popconfirm ([#786](https://github.com/NG-ZORRO/ng-zorro-antd/issues/786)) ([60cf7a9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60cf7a9)), closes [#785](https://github.com/NG-ZORRO/ng-zorro-antd/issues/785)
* **table:** fix the missing of init table sort class ([#781](https://github.com/NG-ZORRO/ng-zorro-antd/issues/781)) ([b828025](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b828025)), closes [#771](https://github.com/NG-ZORRO/ng-zorro-antd/issues/771)



<a name="0.6.7"></a>
## [0.6.7](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.6...0.6.7) (2017-12-15)


### Bug Fixes

* **datepicker:** disable datepicker when user input ([#738](https://github.com/NG-ZORRO/ng-zorro-antd/issues/738)) ([84c0f23](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84c0f23))
* **select:** reset select component this._value ([#754](https://github.com/NG-ZORRO/ng-zorro-antd/issues/754)) ([4a50d0d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a50d0d))
* **slider:** fix set value in slider ([#743](https://github.com/NG-ZORRO/ng-zorro-antd/issues/743)) ([d0a6793](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d0a6793)), closes [#739](https://github.com/NG-ZORRO/ng-zorro-antd/issues/739)


### Features

* **calendar:** use months short format ([#737](https://github.com/NG-ZORRO/ng-zorro-antd/issues/737)) ([805538c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/805538c)), closes [#736](https://github.com/NG-ZORRO/ng-zorro-antd/issues/736)
* **tooltip,popover,popconfirm:** support "nzMouseEnterDelay" and "nzMouseLeaveDelay" ([#758](https://github.com/NG-ZORRO/ng-zorro-antd/issues/758)) ([3a894f0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3a894f0)), closes [#757](https://github.com/NG-ZORRO/ng-zorro-antd/issues/757)



<a name="0.6.6"></a>
## [0.6.6](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.5...0.6.6) (2017-12-11)


### Bug Fixes

* **datepicker:** enable simplified boolean usage ([#726](https://github.com/NG-ZORRO/ng-zorro-antd/issues/726)) ([6cf80b0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6cf80b0))
* **rate:** ensure value to be number ([#728](https://github.com/NG-ZORRO/ng-zorro-antd/issues/728)) ([35687c3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/35687c3))
* **slider:** fix slider min & max ([#732](https://github.com/NG-ZORRO/ng-zorro-antd/issues/732)) ([6eda3a7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6eda3a7))
* **slider:** rectify return value ([#729](https://github.com/NG-ZORRO/ng-zorro-antd/issues/729)) ([6b095a8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b095a8))


### Features

* **input-number:** use boundary value instead of previous value ([#731](https://github.com/NG-ZORRO/ng-zorro-antd/issues/731)) ([48e40f4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/48e40f4))



<a name="0.6.5"></a>
## [0.6.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.4...0.6.5) (2017-12-10)



<a name="0.6.4"></a>
## [0.6.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.3...0.6.4) (2017-12-10)


### Bug Fixes

* **input-number:** check value when press tab key ([#706](https://github.com/NG-ZORRO/ng-zorro-antd/issues/706)) ([9923a86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9923a86)), closes [#651](https://github.com/NG-ZORRO/ng-zorro-antd/issues/651)


### Features

* **form:** support default nzValidateStatus & support more error status ([#696](https://github.com/NG-ZORRO/ng-zorro-antd/issues/696)) ([3d4213f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3d4213f)), closes [#693](https://github.com/NG-ZORRO/ng-zorro-antd/issues/693) [#692](https://github.com/NG-ZORRO/ng-zorro-antd/issues/692)
* **grid:** support zero input in grid ([#704](https://github.com/NG-ZORRO/ng-zorro-antd/issues/704)) ([e50b72f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e50b72f)), closes [#702](https://github.com/NG-ZORRO/ng-zorro-antd/issues/702)
* **select:** support placeholder for basic select ([#703](https://github.com/NG-ZORRO/ng-zorro-antd/issues/703)) ([a842cdd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a842cdd)), closes [#413](https://github.com/NG-ZORRO/ng-zorro-antd/issues/413)
* **tooltip,popover,popconfirm:** do not show tooltip when it's content is empty ([54ff189](https://github.com/NG-ZORRO/ng-zorro-antd/commit/54ff189)), closes [#631](https://github.com/NG-ZORRO/ng-zorro-antd/issues/631)
* **tooltip,popover,popconfirm:** support hover on the content of it's overlay ([e712d87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e712d87)), closes [#701](https://github.com/NG-ZORRO/ng-zorro-antd/issues/701)



<a name="0.6.3"></a>
## [0.6.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.2...0.6.3) (2017-12-06)


### Bug Fixes

* **affix:** fix position offset when has deferred render componets. ([#672](https://github.com/NG-ZORRO/ng-zorro-antd/issues/672)) ([74b01da](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74b01da)), closes [#671](https://github.com/NG-ZORRO/ng-zorro-antd/issues/671)
* **radio:** value can not be dynamically update ([#677](https://github.com/NG-ZORRO/ng-zorro-antd/issues/677)) ([bedcf96](https://github.com/NG-ZORRO/ng-zorro-antd/commit/bedcf96)), closes [#668](https://github.com/NG-ZORRO/ng-zorro-antd/issues/668)
* **select:** fix choose disabled item via direction key control ([#675](https://github.com/NG-ZORRO/ng-zorro-antd/issues/675)) ([80d637d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/80d637d)), closes [#674](https://github.com/NG-ZORRO/ng-zorro-antd/issues/674)
* **select:** usage public property in accessing other components ([#679](https://github.com/NG-ZORRO/ng-zorro-antd/issues/679)) ([8ba3ea8](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8ba3ea8))


### Features

* **turkish:** create tr-TR.ts ([#634](https://github.com/NG-ZORRO/ng-zorro-antd/issues/634)) ([a731817](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a731817))
* **i18n:** support zh-TW ([#687](https://github.com/NG-ZORRO/ng-zorro-antd/issues/687)) ([05c1f87](https://github.com/NG-ZORRO/ng-zorro-antd/commit/05c1f87))
* **carousel:** add enhancement API and methods ([#688](https://github.com/NG-ZORRO/ng-zorro-antd/issues/688)) ([c22dad3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c22dad3)), closes [#652](https://github.com/NG-ZORRO/ng-zorro-antd/issues/652)
* **select:** support custom option template ([#689](https://github.com/NG-ZORRO/ng-zorro-antd/issues/689)) ([d76763c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d76763c)), closes [#227](https://github.com/NG-ZORRO/ng-zorro-antd/issues/227)
* **select:** support nzScrollToBottom event ([#678](https://github.com/NG-ZORRO/ng-zorro-antd/issues/678)) ([b7cc148](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7cc148)), closes [#676](https://github.com/NG-ZORRO/ng-zorro-antd/issues/676)
* **all:** simplify boolean attributes ([#459](https://github.com/NG-ZORRO/ng-zorro-antd/issues/459)) ([08f10e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/08f10e4))
* **packaging:** generate sourcemaps ([#666](https://github.com/NG-ZORRO/ng-zorro-antd/issues/666)) ([8665639](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8665639)), closes [#662](https://github.com/NG-ZORRO/ng-zorro-antd/issues/662)


### BREAKING CHANGES

* **packaging:** umd file name simplified from 'ng-zorro-antd.js' to 'antd.js'



<a name="0.6.2"></a>
## [0.6.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.1...0.6.2) (2017-11-29)


### Features

* **slider:** support dynamic update nzMarks from outside ([#636](https://github.com/NG-ZORRO/ng-zorro-antd/issues/636)) ([aea80c4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aea80c4)), closes [#624](https://github.com/NG-ZORRO/ng-zorro-antd/issues/624)
* **table and pagination:** support custom the page size changer select values([#608](https://github.com/NG-ZORRO/ng-zorro-antd/issues/608)) ([#626](https://github.com/NG-ZORRO/ng-zorro-antd/issues/626)) ([034bd71](https://github.com/NG-ZORRO/ng-zorro-antd/commit/034bd71))



<a name="0.6.1"></a>
## [0.6.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0...0.6.1) (2017-11-26)


### Bug Fixes

* **datepicker:** fix disabled today button ([#611](https://github.com/NG-ZORRO/ng-zorro-antd/issues/611)) ([5203614](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5203614)), closes [#604](https://github.com/NG-ZORRO/ng-zorro-antd/issues/604)
* **select:** fix duplicated option bug ([#609](https://github.com/NG-ZORRO/ng-zorro-antd/issues/609)) ([9385826](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9385826)), closes [#590](https://github.com/NG-ZORRO/ng-zorro-antd/issues/590)
* **transfer:** fix select all items in search ([#602](https://github.com/NG-ZORRO/ng-zorro-antd/issues/602)) ([072c97a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/072c97a)), closes [#599](https://github.com/NG-ZORRO/ng-zorro-antd/issues/599)


### Features

* **datepicker:** support string and number type as value ([#593](https://github.com/NG-ZORRO/ng-zorro-antd/issues/593)) ([aee7abe](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aee7abe))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.3...0.6.0) (2017-11-18)


### Bug Fixes

* **menu:** do not remove submenu when click title ([#576](https://github.com/NG-ZORRO/ng-zorro-antd/issues/576)) ([37cef47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/37cef47)), closes [#454](https://github.com/NG-ZORRO/ng-zorro-antd/issues/454)
* **popover,steps:** fix popover always show title placeholder & steps nzDescription property support TemplateRef ([#556](https://github.com/NG-ZORRO/ng-zorro-antd/issues/556)) ([4a4e393](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4a4e393)), closes [#555](https://github.com/NG-ZORRO/ng-zorro-antd/issues/555) [#523](https://github.com/NG-ZORRO/ng-zorro-antd/issues/523)
* **select:** fix multiple select width ([#575](https://github.com/NG-ZORRO/ng-zorro-antd/issues/575)) ([7006766](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7006766)), closes [#560](https://github.com/NG-ZORRO/ng-zorro-antd/issues/560)


### Features

* **modal:** support disable the esc key to close ([#567](https://github.com/NG-ZORRO/ng-zorro-antd/issues/567)) ([75bc6b6](https://github.com/NG-ZORRO/ng-zorro-antd/commit/75bc6b6))
* **timepicker:** support dynamic binding [nzDisabledHours] ([#568](https://github.com/NG-ZORRO/ng-zorro-antd/issues/568)) ([22e2931](https://github.com/NG-ZORRO/ng-zorro-antd/commit/22e2931)), closes [#286](https://github.com/NG-ZORRO/ng-zorro-antd/issues/286)
* **tooltip:** support usage like: <a nz-tooltip="This is a prompt text">test</a> ([#545](https://github.com/NG-ZORRO/ng-zorro-antd/issues/545)) ([b4824d9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b4824d9)), closes [#345](https://github.com/NG-ZORRO/ng-zorro-antd/issues/345)
* **transfer:** add transfer component ([#578](https://github.com/NG-ZORRO/ng-zorro-antd/issues/578)) ([84895cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/84895cb)), closes [#132](https://github.com/NG-ZORRO/ng-zorro-antd/issues/132)



<a name="0.6.0-rc.3"></a>
# [0.6.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.2...0.6.0-rc.3) (2017-11-04)


### Bug Fixes

* **affix:** fix FPS drops ([#490](https://github.com/NG-ZORRO/ng-zorro-antd/issues/490)) ([50b2606](https://github.com/NG-ZORRO/ng-zorro-antd/commit/50b2606)), closes [#477](https://github.com/NG-ZORRO/ng-zorro-antd/issues/477)
* **pagination:** wrong event by changing the page size ([#486](https://github.com/NG-ZORRO/ng-zorro-antd/issues/486)) ([ad5bc29](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ad5bc29)), closes [#482](https://github.com/NG-ZORRO/ng-zorro-antd/issues/482)
* **tabs:** repeat rendering the TabBarExtra when used nested tabs ([#489](https://github.com/NG-ZORRO/ng-zorro-antd/issues/489)) ([3289e7f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3289e7f)), closes [#452](https://github.com/NG-ZORRO/ng-zorro-antd/issues/452)


### Features

* **datepicker:** support [nzDisabledDate] property in month mode ([#451](https://github.com/NG-ZORRO/ng-zorro-antd/issues/451)) ([cdc0716](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cdc0716)), closes [#442](https://github.com/NG-ZORRO/ng-zorro-antd/issues/442)


### Performance Improvements

* **classMap:** improve classMap performance ([#528](https://github.com/NG-ZORRO/ng-zorro-antd/issues/528)) ([e5b5cc9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e5b5cc9))
* **polyfill:** polyfill all request animation ([#527](https://github.com/NG-ZORRO/ng-zorro-antd/issues/527)) ([8c5a41a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/8c5a41a))



<a name="0.6.0-rc.2"></a>
# [0.6.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.6.0-rc.1...0.6.0-rc.2) (2017-10-29)



<a name="0.6.0-rc.1"></a>
# [0.6.0-rc.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.5...0.6.0-rc.1) (2017-10-28)


### Bug Fixes

* **table:** fix the wrong semantics about param "nzShowExpand" of nz-row-expand-icon ([e4f8337](https://github.com/NG-ZORRO/ng-zorro-antd/commit/e4f8337))


### build

* **packaging:** update [@angular](https://github.com/angular)/cdk to 2.0.0-beta.11 ([3e007a2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/3e007a2)), closes [#238](https://github.com/NG-ZORRO/ng-zorro-antd/issues/238) [#290](https://github.com/NG-ZORRO/ng-zorro-antd/issues/290)


### Features

* **i18n:** support i18n functionality (zh-CN, en-US currently) ([552fa50](https://github.com/NG-ZORRO/ng-zorro-antd/commit/552fa50)), closes [#427](https://github.com/NG-ZORRO/ng-zorro-antd/issues/427)
* **locale:** support change locale at the runtime (globally) ([af6c926](https://github.com/NG-ZORRO/ng-zorro-antd/commit/af6c926))


### BREAKING CHANGES

* **packaging:** 1. usage related to cdk is changed 2. @angular version dependence update to ^4.4.3 (due to @angular/cdk)
* **table:** the usage of param "nzShowExpand" is changed to the opposite value. The former, "nzShowExpand" represent as "hide the expand icon", now this change correct it to "show the expand icon".

And the default value of "nzShowExpand" has changed to "true".



<a name="0.5.5"></a>
## [0.5.5](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.4...0.5.5) (2017-10-21)


### Bug Fixes

* **dropdown:** fix dropdown trigger events ([#466](https://github.com/NG-ZORRO/ng-zorro-antd/issues/466)) ([6034f54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6034f54)), closes [#390](https://github.com/NG-ZORRO/ng-zorro-antd/issues/390)
* **dropdown:** fix unsubscribe undefined bug ([#464](https://github.com/NG-ZORRO/ng-zorro-antd/issues/464)) ([a0dcad3](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a0dcad3)), closes [#269](https://github.com/NG-ZORRO/ng-zorro-antd/issues/269)


### Features

* **calendar:** add year number to month template ([#465](https://github.com/NG-ZORRO/ng-zorro-antd/issues/465)) ([0eba3ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0eba3ae)), closes [#461](https://github.com/NG-ZORRO/ng-zorro-antd/issues/461)
* **steps:** support [nzProgressDot] property in vertical mode ([#446](https://github.com/NG-ZORRO/ng-zorro-antd/issues/446)) ([98e2579](https://github.com/NG-ZORRO/ng-zorro-antd/commit/98e2579))



<a name="0.5.4"></a>
## [0.5.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.3...0.5.4) (2017-10-14)


### Bug Fixes

* **datepicker:** data binding not work when mode is month ([#421](https://github.com/NG-ZORRO/ng-zorro-antd/issues/421)) ([dca0895](https://github.com/NG-ZORRO/ng-zorro-antd/commit/dca0895))
* **modal:** restore body overflow before destroyed the component ([#415](https://github.com/NG-ZORRO/ng-zorro-antd/issues/415)) ([083dd03](https://github.com/NG-ZORRO/ng-zorro-antd/commit/083dd03)), closes [#412](https://github.com/NG-ZORRO/ng-zorro-antd/issues/412)


### Features

* **input-number:** add nzBlur & nzFocus property ([#406](https://github.com/NG-ZORRO/ng-zorro-antd/issues/406)) ([a49a382](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a49a382)), closes [#396](https://github.com/NG-ZORRO/ng-zorro-antd/issues/396)



<a name="0.5.3"></a>
## [0.5.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.2...0.5.3) (2017-09-30)


### Bug Fixes

* **demo:** fix demo site performance ([#403](https://github.com/NG-ZORRO/ng-zorro-antd/issues/403)) ([2e88b56](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2e88b56)), closes [#187](https://github.com/NG-ZORRO/ng-zorro-antd/issues/187)
* **table:** fix nzIsPageIndexReset for wrong display ([#372](https://github.com/NG-ZORRO/ng-zorro-antd/issues/372)) ([#373](https://github.com/NG-ZORRO/ng-zorro-antd/issues/373)) ([90f0333](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90f0333))


### Features

* **all:** export all components when build ([#404](https://github.com/NG-ZORRO/ng-zorro-antd/issues/404)) ([802a98c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/802a98c)), closes [#275](https://github.com/NG-ZORRO/ng-zorro-antd/issues/275)
* **collapse:** support custom header ([#383](https://github.com/NG-ZORRO/ng-zorro-antd/issues/383)) ([ca42f00](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ca42f00))
* **datepicker:** support month picker ([#397](https://github.com/NG-ZORRO/ng-zorro-antd/issues/397)) ([4cb03fa](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4cb03fa)), closes [#351](https://github.com/NG-ZORRO/ng-zorro-antd/issues/351)
* **menu:** animate expand/collapse menu ([#330](https://github.com/NG-ZORRO/ng-zorro-antd/issues/330)) ([7edba94](https://github.com/NG-ZORRO/ng-zorro-antd/commit/7edba94)), closes [#25](https://github.com/NG-ZORRO/ng-zorro-antd/issues/25)



<a name="0.5.2"></a>
## [0.5.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.1...0.5.2) (2017-09-23)


### Bug Fixes

* **cascader:** select and render leaf label & reset in reactive form ([#335](https://github.com/NG-ZORRO/ng-zorro-antd/issues/335)) ([#336](https://github.com/NG-ZORRO/ng-zorro-antd/issues/336)) ([#356](https://github.com/NG-ZORRO/ng-zorro-antd/issues/356)) ([c80bb8e](https://github.com/NG-ZORRO/ng-zorro-antd/commit/c80bb8e))
* **menu:** fix submenu ExpressionChangedAfterItHasBeenCheckedError ([#368](https://github.com/NG-ZORRO/ng-zorro-antd/issues/368)) ([10989ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/10989ae)), closes [#367](https://github.com/NG-ZORRO/ng-zorro-antd/issues/367)
* **select:** fix select style in inline form ([#362](https://github.com/NG-ZORRO/ng-zorro-antd/issues/362)) ([ae06649](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ae06649)), closes [#306](https://github.com/NG-ZORRO/ng-zorro-antd/issues/306)
* **table:** fix nzWidth with ngIf ([#349](https://github.com/NG-ZORRO/ng-zorro-antd/issues/349)) ([d5d379b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d5d379b)), closes [#302](https://github.com/NG-ZORRO/ng-zorro-antd/issues/302)
* **moment:** rollup compile with incorrect sourcemap ([#331](https://github.com/NG-ZORRO/ng-zorro-antd/issues/331)) ([aec9f83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/aec9f83))


### Features

* **modal:** show confirm loading status of modal opened by nzModalService ([#340](https://github.com/NG-ZORRO/ng-zorro-antd/issues/340)) ([90b7e12](https://github.com/NG-ZORRO/ng-zorro-antd/commit/90b7e12)), closes [#365](https://github.com/NG-ZORRO/ng-zorro-antd/issues/365)
* **select:** support undefined reset select ([#363](https://github.com/NG-ZORRO/ng-zorro-antd/issues/363)) ([1a997c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/1a997c2)), closes [#284](https://github.com/NG-ZORRO/ng-zorro-antd/issues/284)
* **table:** add nzIsPageIndexReset option ([#348](https://github.com/NG-ZORRO/ng-zorro-antd/issues/348)) ([#359](https://github.com/NG-ZORRO/ng-zorro-antd/issues/359)) ([60e3da9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/60e3da9))



<a name="0.5.1"></a>
## [0.5.1](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0...0.5.1) (2017-09-16)


### Bug Fixes

* **datepicker:** end decade cell text ([#301](https://github.com/NG-ZORRO/ng-zorro-antd/issues/301)) ([d16061f](https://github.com/NG-ZORRO/ng-zorro-antd/commit/d16061f)), closes [#300](https://github.com/NG-ZORRO/ng-zorro-antd/issues/300)
* **input:** fix type error ([#283](https://github.com/NG-ZORRO/ng-zorro-antd/issues/283)) ([cd84e47](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd84e47)), closes [#282](https://github.com/NG-ZORRO/ng-zorro-antd/issues/282)
* **layout:** fix slider breakpoint in mobile device ([#299](https://github.com/NG-ZORRO/ng-zorro-antd/issues/299)) ([47c4d86](https://github.com/NG-ZORRO/ng-zorro-antd/commit/47c4d86)), closes [#292](https://github.com/NG-ZORRO/ng-zorro-antd/issues/292)
* **pagination:** prevent repeated emit events ([#281](https://github.com/NG-ZORRO/ng-zorro-antd/issues/281)) ([ec66e13](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ec66e13)), closes [#280](https://github.com/NG-ZORRO/ng-zorro-antd/issues/280)
* **pagination:** prevent selection after double click ([#268](https://github.com/NG-ZORRO/ng-zorro-antd/issues/268)) ([46ae81a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/46ae81a)), closes [#267](https://github.com/NG-ZORRO/ng-zorro-antd/issues/267)


### Features

* **menu:** selected child item, its parent highlight ([#264](https://github.com/NG-ZORRO/ng-zorro-antd/issues/264)) ([970e968](https://github.com/NG-ZORRO/ng-zorro-antd/commit/970e968)), closes [#262](https://github.com/NG-ZORRO/ng-zorro-antd/issues/262)



<a name="0.5.0"></a>
# [0.5.0](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.4...0.5.0) (2017-09-09)


### Bug Fixes

* **all:** patch all components with setDisabledState ([#188](https://github.com/NG-ZORRO/ng-zorro-antd/issues/188)) ([69b8979](https://github.com/NG-ZORRO/ng-zorro-antd/commit/69b8979)), closes [#134](https://github.com/NG-ZORRO/ng-zorro-antd/issues/134)
* **carousel:** carousel slide height depend on inner content ([#242](https://github.com/NG-ZORRO/ng-zorro-antd/issues/242)) ([94bac1b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/94bac1b)), closes [#162](https://github.com/NG-ZORRO/ng-zorro-antd/issues/162) [#170](https://github.com/NG-ZORRO/ng-zorro-antd/issues/170)
* **cascader:** fix nz-cascader don't refresh when nzOptions binding data changed ([#219](https://github.com/NG-ZORRO/ng-zorro-antd/issues/219)) ([#221](https://github.com/NG-ZORRO/ng-zorro-antd/issues/221)) ([74b2506](https://github.com/NG-ZORRO/ng-zorro-antd/commit/74b2506))
* **checkbox:** fix trigger twitce in safari ([#256](https://github.com/NG-ZORRO/ng-zorro-antd/issues/256)) ([cd5b511](https://github.com/NG-ZORRO/ng-zorro-antd/commit/cd5b511))
* **core,root:** ensure compatibility to v4 ([#233](https://github.com/NG-ZORRO/ng-zorro-antd/issues/233)) ([2b5c083](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2b5c083))
* **datepicker:** year and month display in opposite way ([#243](https://github.com/NG-ZORRO/ng-zorro-antd/issues/243)) ([4b5ea54](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4b5ea54)), closes [#232](https://github.com/NG-ZORRO/ng-zorro-antd/issues/232)
* **dropdown:** should always debouce before subscribe visibleChange$ ([#237](https://github.com/NG-ZORRO/ng-zorro-antd/issues/237)) ([0180e1c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0180e1c)), closes [#234](https://github.com/NG-ZORRO/ng-zorro-antd/issues/234)
* **input,datepicker,input-number,select,slider:** still dirty when "form.reset()" called ([#257](https://github.com/NG-ZORRO/ng-zorro-antd/issues/257)) ([4233db1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/4233db1)), closes [#114](https://github.com/NG-ZORRO/ng-zorro-antd/issues/114)
* **inputnumber:** validate inputnumber value & rewrite strategy ([#230](https://github.com/NG-ZORRO/ng-zorro-antd/issues/230)) ([28669ae](https://github.com/NG-ZORRO/ng-zorro-antd/commit/28669ae)), closes [#42](https://github.com/NG-ZORRO/ng-zorro-antd/issues/42) [#203](https://github.com/NG-ZORRO/ng-zorro-antd/issues/203)
* **select, datepicker, timepicker:** close dropdown when change to disable status ([#222](https://github.com/NG-ZORRO/ng-zorro-antd/issues/222)) ([6e1b144](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6e1b144)), closes [#190](https://github.com/NG-ZORRO/ng-zorro-antd/issues/190) [#195](https://github.com/NG-ZORRO/ng-zorro-antd/issues/195)
* **select, datepicker, timepicker, radio, checkbox, input-number:** fix touched state ([#248](https://github.com/NG-ZORRO/ng-zorro-antd/issues/248)) ([07f48bc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/07f48bc)), closes [#228](https://github.com/NG-ZORRO/ng-zorro-antd/issues/228)


### Features

* **grid:** support embedded col option ([#247](https://github.com/NG-ZORRO/ng-zorro-antd/issues/247)) ([248c7e5](https://github.com/NG-ZORRO/ng-zorro-antd/commit/248c7e5)), closes [#101](https://github.com/NG-ZORRO/ng-zorro-antd/issues/101)
* **input:** support nzAutosize property ([#251](https://github.com/NG-ZORRO/ng-zorro-antd/issues/251)) ([5e950ab](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5e950ab)), closes [#252](https://github.com/NG-ZORRO/ng-zorro-antd/issues/252)
* **input:** support nzReadonly property ([#236](https://github.com/NG-ZORRO/ng-zorro-antd/issues/236)) ([6b69cf9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/6b69cf9))
* **menu:** support unfolds/folds & add demo and api docs ([#225](https://github.com/NG-ZORRO/ng-zorro-antd/issues/225)) ([23b73bb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/23b73bb)), closes [#206](https://github.com/NG-ZORRO/ng-zorro-antd/issues/206)
* **table:** support filter & fixed header add more table demo ([#210](https://github.com/NG-ZORRO/ng-zorro-antd/issues/210)) ([5f11664](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5f11664)), closes [#86](https://github.com/NG-ZORRO/ng-zorro-antd/issues/86) [#174](https://github.com/NG-ZORRO/ng-zorro-antd/issues/174) [#218](https://github.com/NG-ZORRO/ng-zorro-antd/issues/218)
* **table:** support table expand feature ([#259](https://github.com/NG-ZORRO/ng-zorro-antd/issues/259)) ([578819d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/578819d)), closes [#185](https://github.com/NG-ZORRO/ng-zorro-antd/issues/185)



<a name="0.5.0-rc.4"></a>
# [0.5.0-rc.4](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.3...0.5.0-rc.4) (2017-08-31)


### Bug Fixes

* **pagination:** fix nzPageIndexChange event does not emit ([#189](https://github.com/NG-ZORRO/ng-zorro-antd/issues/189)) ([371b98a](https://github.com/NG-ZORRO/ng-zorro-antd/commit/371b98a))


### Features

* **modal:** provide open & close & setConfirmLoading function ([#125](https://github.com/NG-ZORRO/ng-zorro-antd/issues/125)) ([0f87f6c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/0f87f6c)), closes [#118](https://github.com/NG-ZORRO/ng-zorro-antd/issues/118)
* **tooltip,popconfirm,popover:** support OnPush ([#143](https://github.com/NG-ZORRO/ng-zorro-antd/issues/143)) ([2f2c9ac](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2f2c9ac)), closes [#136](https://github.com/NG-ZORRO/ng-zorro-antd/issues/136)



<a name="0.5.0-rc.3"></a>
# [0.5.0-rc.3](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.2...0.5.0-rc.3) (2017-08-26)


### Bug Fixes

* **affix,anchor,back-top:** fix and improve rxjs usage ([#159](https://github.com/NG-ZORRO/ng-zorro-antd/issues/159)) ([152b654](https://github.com/NG-ZORRO/ng-zorro-antd/commit/152b654))
* **carousel:** fix carousel auto play bug ([#164](https://github.com/NG-ZORRO/ng-zorro-antd/issues/164)) ([01012e4](https://github.com/NG-ZORRO/ng-zorro-antd/commit/01012e4)), closes [#161](https://github.com/NG-ZORRO/ng-zorro-antd/issues/161)
* **checkbox:** fix checkbox host class lost bug ([#116](https://github.com/NG-ZORRO/ng-zorro-antd/issues/116)) ([81cbae9](https://github.com/NG-ZORRO/ng-zorro-antd/commit/81cbae9)), closes [#104](https://github.com/NG-ZORRO/ng-zorro-antd/issues/104)
* **input:** fix input disabled style bug ([#108](https://github.com/NG-ZORRO/ng-zorro-antd/issues/108)) ([5d666fc](https://github.com/NG-ZORRO/ng-zorro-antd/commit/5d666fc)), closes [#103](https://github.com/NG-ZORRO/ng-zorro-antd/issues/103)
* **input:** fix input disabled style bug ([#160](https://github.com/NG-ZORRO/ng-zorro-antd/issues/160)) ([b7a073c](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b7a073c))
* **input:** fix input touched property ([#129](https://github.com/NG-ZORRO/ng-zorro-antd/issues/129)) ([143c080](https://github.com/NG-ZORRO/ng-zorro-antd/commit/143c080)), closes [#65](https://github.com/NG-ZORRO/ng-zorro-antd/issues/65) [#117](https://github.com/NG-ZORRO/ng-zorro-antd/issues/117)
* **select:** fix option incorrect active status ([#141](https://github.com/NG-ZORRO/ng-zorro-antd/issues/141)) ([49e3741](https://github.com/NG-ZORRO/ng-zorro-antd/commit/49e3741))
* **select:** fix select reset bug in form ([#153](https://github.com/NG-ZORRO/ng-zorro-antd/issues/153)) ([2bf24e0](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2bf24e0)), closes [#128](https://github.com/NG-ZORRO/ng-zorro-antd/issues/128)


### Features

* **affix&anchor&back-top&avatar:** add components to library ([#88](https://github.com/NG-ZORRO/ng-zorro-antd/issues/88)) ([468e80b](https://github.com/NG-ZORRO/ng-zorro-antd/commit/468e80b))
* **root:** make nz-root optional ([#36](https://github.com/NG-ZORRO/ng-zorro-antd/issues/36)) ([9de3de1](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9de3de1))
* **showcase:** auto scroll to top when router change & sync code icon with antd ([#124](https://github.com/NG-ZORRO/ng-zorro-antd/issues/124)) ([9a1de83](https://github.com/NG-ZORRO/ng-zorro-antd/commit/9a1de83)), closes [#26](https://github.com/NG-ZORRO/ng-zorro-antd/issues/26)



<a name="0.5.0-rc.2"></a>
# [0.5.0-rc.2](https://github.com/NG-ZORRO/ng-zorro-antd/compare/0.5.0-rc.0...0.5.0-rc.2) (2017-08-19)


### Bug Fixes

* **pagination:** Pagination QuickJumper bug [#37](https://github.com/NG-ZORRO/ng-zorro-antd/issues/37) ([a122238](https://github.com/NG-ZORRO/ng-zorro-antd/commit/a122238))
* **carousel:** support dynamic change of nz-carousel-content ([#60](https://github.com/NG-ZORRO/ng-zorro-antd/issues/60)) ([44865c2](https://github.com/NG-ZORRO/ng-zorro-antd/commit/44865c2)), closes [#56](https://github.com/NG-ZORRO/ng-zorro-antd/issues/56)
* **menu:** fix submenu level bug & fix menu routerLinkActive bug in lazyload module ([#77](https://github.com/NG-ZORRO/ng-zorro-antd/issues/77)) ([b914afd](https://github.com/NG-ZORRO/ng-zorro-antd/commit/b914afd)), closes [#35](https://github.com/NG-ZORRO/ng-zorro-antd/issues/35) [#52](https://github.com/NG-ZORRO/ng-zorro-antd/issues/52) [#74](https://github.com/NG-ZORRO/ng-zorro-antd/issues/74)
* **pagination:** remove active class when reach first and last page index ([#93](https://github.com/NG-ZORRO/ng-zorro-antd/issues/93)) ([2bcddc7](https://github.com/NG-ZORRO/ng-zorro-antd/commit/2bcddc7)), closes [#17](https://github.com/NG-ZORRO/ng-zorro-antd/issues/17)
* **steps:** fix steps width bug in tab component ([#94](https://github.com/NG-ZORRO/ng-zorro-antd/issues/94)) ([ee4428d](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ee4428d)), closes [#83](https://github.com/NG-ZORRO/ng-zorro-antd/issues/83)
* **timeline:** eliminate ExpressionChangedAfterItHasBeenCheckedError when use ngFor to render ([67df061](https://github.com/NG-ZORRO/ng-zorro-antd/commit/67df061))


### Features

* **input:** provide nzFocus event ([#80](https://github.com/NG-ZORRO/ng-zorro-antd/issues/80)) ([ffc1d49](https://github.com/NG-ZORRO/ng-zorro-antd/commit/ffc1d49)), closes [#73](https://github.com/NG-ZORRO/ng-zorro-antd/issues/73)


### Performance Improvements

* **all:** improve rxjs imports ([#29](https://github.com/NG-ZORRO/ng-zorro-antd/issues/29)) ([f3aa2cb](https://github.com/NG-ZORRO/ng-zorro-antd/commit/f3aa2cb))



<a name="0.5.0-rc.0"></a>
# 0.5.0-rc.0 (2017-08-15)


