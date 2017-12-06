国际化
===
`ng-zorro`目前的默认文案是中文，如果需要使用英文或其他语言，可以参考下面的方案。

## NZ_LOCALE 配置

`ng-zorro`提供了一个配置型token `NZ_LOCALE` 用于全局配置国际化文案。

```ts
import { NZ_LOCALE, enUS } from 'ng-zorro-antd';

@NgModule({
  ...
  imports     : [ NgZorroAntdModule.forRoot() ],
  providers   : [ { provide: NZ_LOCALE, useValue: enUS } ], // 这里设置当前全局使用的语言包
})
export class AppModule { }
```

注意：实际语言包文件名可能是 `en-US.ts` 格式，使用时对应导出为 `enUS`（去掉减号）

目前支持以下语言：

| 语言 | 文件名 |
| --- | --- |
| 简体中文 | zh-CN |
| 繁体中文 | zh-TW |
| 美式英语 | en-US |
| 土耳其语 | tr-TR |

具体的使用方法和新语言包贡献方式请参考 [Locale](#/other/locale) 文档。
