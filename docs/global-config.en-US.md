---
order: 7
title: Global Configuration
---

We add a **global configuration** support to many components. You can define the default behavior of these components through the global configuration, which reduces redundant codes that must be written in the templates (makes your codes concise). Moreover, it supports altering the global configuration at runtime.

## How to Use?

In order to provide default configurations in certain components, please pass an object that implements the interface `NzConfig` through the injection token `NZ_CONFIG` in the root injector. For example:

```typescript
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
  message: { nzTop: 120 },
  notification: { nzTop: 240 }
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

These global configurations would be injected and stored in a service named `NzConfigService`.

### Provide Template Instances

Some components accept `TemplateRef<T>` as a default parameter.

One of the easiest approaches is to invoke relevant functions from `NzConfigService` in the root component.

```typescript
export class AppComponent implements OnInit {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;

  constructor(private readonly nzConfigService: NzConfigService) {}

  ngOnInit(): void {
    this.nzConfigService.set('spin', { nzIndicator: this.nzIndicator });
  }
}
```

However, this violates the separation of concerns principle and causes codes to be bloated in the `AppComponent`.

To solve this, it is recommended to use a `FactoryProvider` instead of a `ValueProvider` (shown above) at the `NgModule` level.

```typescript
// The module-level Component which contains template references.
// Exporting is required for AOT compatibility
@Component({
  template: `
    <ng-template #nzIndicatorTpl>
      <span class="ant-spin-dot">
        <span nz-icon [nzType]="'loading'"></span>
      </span>
    </ng-template>
  `
})
export class GlobalTemplatesComponent {
  @ViewChild('nzIndicatorTpl', { static: true })
  nzIndicator!: TemplateRef<void>;
}

// The Factory function
const nzConfigFactory = (
  injector: Injector,
  resolver: ComponentFactoryResolver
): NzConfig => {
  const factory = resolver.resolveComponentFactory(GlobalTemplatesComponent);
  const { nzIndicator } = factory.create(injector).instance;
  return {
    spin: {
      nzIndicator
    }
  };
};

@NgModule({
  imports: [],
  declarations: [
    AppComponent,
    GlobalTemplatesComponent
  ],
  providers: [
    { // The FactoryProvider
      provide: NZ_CONFIG,
      useFactory: nzConfigFactory,
      deps: [Injector, ComponentFactoryResolver]
    }
  ]
})
export class AppModule {}
```


## Overwrite inside Component

Developers can use Dependency Injection to reset `NZ_CONFIG` within a particular component, which will not affect configurations outside it.

```typescript
@Component({
  providers: [
    // reset local NzConfigService
    NzConfigService,
    {
      provide: NZ_CONFIG,
      useValue: {
        button: {
          nzSize: 'large'
        }
      }
    }
  ]
})
```

You can also use `useFactory` to combine the global configuration with the local configuration to take effect

> Note: Change global configuration after component initialization won't affect local configuration

```typescript
@Component({
  providers: [
    // reset local NzConfigService
    NzConfigService,
    {
      provide: NZ_CONFIG,
      useFactory: (nzConfigService: NzConfigService) => {
        const globalConfig = nzConfigService.getConfig();
        const localConfig = {
          select: {
            nzBorderless: true
          }
        };
        // merge local and global config
        const mergedConfig = {
          ...globalConfig,
          ...localConfig
        };
        return mergedConfig;
      },
      // get global NzConfigService
      deps: [[new SkipSelf(), NzConfigService]]
    }
  ]
})
```

## Dynamically Change Configurations

You can alter the global configuration of a specific component through the `set` method of `NzConfigService`. For example:

```typescript
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-change-zorro-config'
})
export class ChangeZorroConfigComponent {
  constructor(private nzConfigService: NzConfigService) {}

  onChangeConfig() {
    this.nzConfigService.set('button', { nzSize: 'large' })
  }
}
```

All component instances is responsive to this configuration change (as long as they are not configured independently).


## Priority of Global Configurations

For any property that supports global configuration, the sequence of priority is based on following:

**Parameters passed to a component instance (in templates or through methods like `service.create` > global configuration provided by the injection token `NZ_CONFIG` > default value in ng-zorro-antd**

For example, if you want to create a `NzNotification` component:

1. When you call `NzNotificationService.success`, you pass `{ nzDuration: 6000 }` as the third parameter
2. You provide `{ notification: { nzDuration: 5000 } }` through the injection token `NZ_CONFIG`
3. `ng-zorro-antd` has a default value of 4500

Consequently, this particular notification will be visible for 6000 milliseconds.

## Check all Available Globally Configurable Parameters

The interface `NzConfig` provide a complete information about all components and parameters that are globally configurable. You can also check each individual component's API for more details.
