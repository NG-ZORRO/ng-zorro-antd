Provide unified international support for built-in documentation of components.

## use

`ng-zorro` in the global configuration mode to set the language currently used (the default will be Chinese` zh-CN`), as long as the root module in your application (such as: `AppModule`) as follows __ globally effective __.

```typescript
import {NZ_LOCALE, enUS} from 'ng-zorro-antd';

@NgModule ({
  ...
  imports: [NgZorroAntdModule.forRoot ()],
  providers: [{provide: NZ_LOCALE, useValue: enUS}], // Set the current global language package
})
export class AppModule {}
```

We currently provide English, Chinese, other languages ​​will be added in subsequent versions, all language packs can be [here] (https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/src/ components / locale / locales).

#### Add language pack

If you can not find the language pack you need, you are welcome to join us at [English Language Pack] (https://github.com/NG-ZORRO/ng-zorro-antd/tree/master/src/components/locale/locales/ en-US.ts) based on the creation of a new language package, and give us Pull Request.

#### Other international needs

This module is only for built-in copy of components. If there is international demand for business copy, it is recommended to use Angular's official [Internationalization Program] (https://angular.io/guide/i18n) (Use under Angular-cli Reference [here] (https://github.com/angular/angular-cli/wiki/xi18n))


