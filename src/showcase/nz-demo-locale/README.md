为组件内建文案提供统一的国际化支持。

## 使用

`ng-zorro`中采用全局配置方式来设置当前所使用的语言（默认将采用中文`zh-CN`），只需要在您应用的根模块（如:`AppModule`）中按如下配置即可 __全局生效__。

```typescript
import { NZ_LOCALE, enUS } from 'ng-zorro-antd';

@NgModule({
  ...
  imports     : [ NgZorroAntdModule.forRoot() ],
  providers   : [ { provide: NZ_LOCALE, useValue: enUS } ], // 这里设置当前全局使用的语言包
})
export class AppModule { }
```

我们目前提供了英语，中文，其他语言将在后续版本中添加，所有语言包可以在 [这里](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/src/components/locale/locales) 找到。

#### 增加语言包

如果你找不到你需要的语言包，欢迎你在 [英文语言包](https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/src/components/locale/locales/en-US.ts) 的基础上创建一个新的语言包，并给我们 Pull Request。

#### 其他国际化需求

本模块仅用于组件的内建文案，若有业务文案的国际化需求，建议使用Angular官方的 [国际化方案](https://angular.io/guide/i18n)（Angular-cli下使用可参考 [这里](https://github.com/angular/angular-cli/wiki/xi18n)）
