globalization
===
`ng-zorro` The current default copy is Chinese, if you need to use English or other languages, you can refer to the following program.

## NZ_LOCALE configuration

ng-zorro provides a config token `NZ_LOCALE` for global configuration of internationalizations.

```ts
import {NZ_LOCALE, enUS} from 'ng-zorro-antd';

@NgModule({
   ...
   imports: [NgZorroAntdModule.forRoot()],
   providers: [{provide: NZ_LOCALE, useValue: enUS}], // Set the current global language package
})
export class AppModule {}
```

Note: The actual language package file name may be in the format `en-US.ts`, which corresponds to the` enUS` (minus sign)

Currently supports the following languages:

| Language | file name |
| --- | --- |
| Simplified Chinese | zh-CN |
|Traditional Chinese | zh-TW |
|American English | en-US |
|Turkish | tr-TR |

Please refer to the [Locale](#/other/locale) documentation for how and how to use the new language package.
