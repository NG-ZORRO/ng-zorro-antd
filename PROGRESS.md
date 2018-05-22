# 进度

## 组件
| 组件 | 文档 | 测试 | 功能 | 负责 | 重写 |
| --- | --- | --- | --- | --- | --- |
| button | √ | 100% | 100% | vthinkxie | - |
| icon | √ | - | 100% | vthinkxie | - |
| grid | √ | 100% | 100% | vthinkxie | - |
| layout | √ | 100% | 100% | vthinkxie | - |
| breadcrumb | √ | 100% | 100% | vthinkxie | - |
| dropdown | √ | 100% | 100% | vthinkxie | - |
| menu | √ | 100% | 100% | vthinkxie | √ |
| pagination | √ | 100% | 100% | vthinkxie | - |
| steps | √ | 100% | 100% | vthinkxie | - |
| checkbox | √ | 100% | 100% | vthinkxie | - |
| form | √ | 100% | 100% | vthinkxie | √ |
| input | √ | 100% | 100% | vthinkxie | √ |
| inputnumber | √ | 100% | 100% | vthinkxie | √ |
| radio | √ | 100% | 100% | vthinkxie | - |
| rate | √ | 100% | 100% | vthinkxie | - |
| select | √ | 100% | 100% | vthinkxie | √ |
| switch | √ | 100% | 100% | vthinkxie | - |
| badge | √ | 100% | 100% | vthinkxie | - |
| card | √ | 100% | 100% | vthinkxie | - |
| carousel | √ | 100% | 100% | vthinkxie | - |
| collapse | √ | 100% | 100% | vthinkxie | - |
| table | √ | 100% | 100% | vthinkxie | √ |
| tabs | √ | 100% | 100% | vthinkxie | - |
| timeline | √ | 100% | 100% | vthinkxie | - |
| alert | √ | 100% | 100% | vthinkxie | - |
| progress | √ | 100% | 100% | vthinkxie | √ |
| spin | √ | 100% | 100% | vthinkxie | - |
| tags | √ | 100% | 100% | vthinkxie | √ |
| popover | x | x | x | wilsoncook | - |
| tooltip | x | x | x | wilsoncook | - |
| popconfirm | x | x | x | wilsoncook | - |
| slider | x | x | x | wilsoncook | - |
| modal | 90% | 100% | 100% | wilsoncook | √ |
| message | x | x | x | wilsoncook | - |
| notification | x | x | x | wilsoncook | - |
| datepicker | x | x | x | wilsoncook | - |
| time-picker | √ | 100% | 100% | trotyl  asnowwolf vthinkxie | √ |
| calendar | √ | 100% | 100% | trotyl | √ |
| affix | √ | 100% | 100% | cipchk | √ |
| transfer | √ | 100% | 100% | cipchk | x |
| avatar | √ | 100% | 100% | cipchk | x |
| list | √ | 100% | 100% | cipchk | x |
| upload | √ | 100% | 100% | cipchk | x |
| anchor | √ | 100% | 100% | cipchk | √ |
| backtop | √ | 100% | 100% | cipchk | x |
| divider | √ | 100% | 100% | cipchk | x |
| treeselect | x | x | x | simplejason | - |
| tree |  √ | 100% | 100% | simplejason | - |
| cascader | √ | 100% | 100% | fbchen | - |
| autocomplete | √ | 100% | 100% | HsuanXyz | - |
| mention | √ | 100%  | 100%  | HsuanXyz | - |



# 初始化
目前文档系统处于基本可用状态，依次执行
* git clone -b 0.7.0 https://github.com/NG-ZORRO/ng-zorro-antd.git ng-zorro-antd-0.7.0
* cd ng-zorro-antd-0.7.0
* npm i
* npm run site:init （初始化文档站点）
* ng serve
即可看到目前的doc及相关组件的开发进度

## 调试

运行 `ng serve` 可以直接修改 `./components` 会立即更新。

> 若修改DEMO代码，需要额外运行一次 `node scripts/generate-site button` 表示重新生成 button 所有DEMO代码。

## 测试代码

运行 `ng test`。

**加速度**

默认会执行 `./components` 下所有 `*.spec.ts`，可手动调整 `./components/test.ts` 文件的临时针对某个测试文件，提升测试体验。

# 开发
## 文件夹结构
进入 components 文件夹，每个组件会有一个单独的文件夹，其中包括
* demo 包括每个markdown说明文件.md和demo文件.ts
* doc 包括中英文的介绍markdown
* style 包括组件的样式文件
这三个文件夹，组件的原始代码在根文件夹中
demo、doc 和 style的初始内容可以直接从 antd react 项目中 https://github.com/ant-design/ant-design/tree/master/components/alert 获取，注意需要将index.zh-CN.md 和 index.en-US.md 手动移至 doc目录下
**请注意，需要将antd react同步后的demo文件夹中的md文件中的jsx代码格式手动移除**
## 格式与命名
demo文件夹中的ts文件名称与markdown的名称保持一致，具体可以参照已经完成的组件部分
其中demo的
* selector的命名： nz-demo-${组件名称}-${demo名称}
* component class的命名(驼峰)：NzDemo${组件名称}${demo名称}Component
例如alert组件的banner demo的selector为 `nz-demo-alert-banner`,component class为`NzDemoAlertBannerComponent`
## 同步文档
当按以上格式开发完成一个组件后，在ng serve的状态下
运行 `npm run site` 后，会快速同步src文件夹中的内容更新页面内容
# 测试
测试代码与组件代码保持在同一目录，以spec.ts结尾
spec.ts测试文件从demo文件中引入ts文件作为测试的TestBed Component
