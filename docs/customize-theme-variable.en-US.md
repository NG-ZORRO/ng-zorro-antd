---
order: 6.1
title: Dynamic Theme (Experimental)
---

Except [less customize theme](/docs/customize-theme/en), We also provide CSS Variable version to enable dynamic theme.

## Caveats

- This function depends on CSS Variables. Please check the [browser compatibility](https://caniuse.com/css-variables).
- This function requires at least `ng-zorro-antd@13.2.x`.

## How to use

### Import antd.variable.min.css

Replace your import style file with CSS Variable version:

```diff
- @import "~ng-zorro-antd/ng-zorro-antd.min.css";
+ @import "~ng-zorro-antd/ng-zorro-antd.variable.min.css";
```

Note: You need remove `babel-plugin-import` for the dynamic theme.

### Static config

In order to provide default configurations in certain components, please pass an object that implements the interface `NzConfig` through the injection token `NZ_CONFIG` in the root injector. For example:

```typescript
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
  theme: {
    primaryColor: '#1890ff'
  }
};

export const appConfig: ApplicationConfig = {
  providers: [provideNzConfig(ngZorroConfig)]
};
```

These global configurations would be injected and stored in a service named `NzConfigService`.

### Dynamically Change Configurations

You can alter the global configuration of CSS Variable through the `set` method of `NzConfigService`. For example:

```typescript
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-change-zorro-config'
})
export class ChangeZorroConfigComponent {
  private nzConfigService = inject(NzConfigService);

  onChangeConfig() {
    this.nzConfigService.set('theme', { primaryColor: '#1890ff' });
  }
}
```

All component instances is responsive to this configuration change (as long as they are not configured independently).

## Conflict resolve

CSS Variable use `--ant` prefix by default. When exist multiple antd style file in your project, you can modify prefix to fix it.

### Compile less

Since prefix modified. Origin `antd.variable.css` should also be replaced:

```bash
lessc --js --modify-var="ant-prefix=custom" antd/dist/antd.variable.less modified.css
```

### Related changes

In order to implement CSS Variable and maintain original usage compatibility, we added `@root-entry-name: xxx;` entry injection to the `ng-zorro-antd.xxx.less` file to support less dynamic loading of the corresponding less file. Under normal circumstances, you do not need to pay attention to this change.
